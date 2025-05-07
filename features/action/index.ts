'use server';

import { requireUser } from '@/features/utils/requireUser';
import { companySchema, jobSeekerSchema, jobPostSchema } from '@/features/utils/zodSchemas';
import { z } from 'zod';
import { prisma } from '@/features/utils/db';
import arcjet, { detectBot, shield } from '@/features/utils/arcjet';
import { request } from '@arcjet/next';
import { stripe } from '@/features/utils/stripe';
import { jobDurationPricing } from '@/features/utils/jobDurationPricing';

const aj = arcjet
	.withRule(
		// Shield detects suspicious behavior, such as SQL injection and cross-site
		// scripting attacks.
		shield({
			mode: 'LIVE',
		}),
	)
	.withRule(
		detectBot({
			mode: 'LIVE', // will block requests. Use "DRY_RUN" to log only
			allow: [],
		}),
	);

export const getCompany = async (userId: string) => {
	const data = await prisma.company.findUnique({
		where: { userId: userId },
		select: {
			id: true,
			name: true,
			location: true,
			about: true,
			logo: true,
			website: true,
			xAccount: true,
		},
	});
	return data;
};

export async function createCompany(data: z.infer<typeof companySchema>) {
	const user = await requireUser();

	// Access the request object so Arcjet can analyze it
	const req = await request();

	// Call Arcjet protect
	const decision = await aj.protect(req);

	if (decision.isDenied()) {
		return { error: 'Forbidden', reason: decision.reason };
	}

	// Server-side validation
	const validatedData = companySchema.parse(data);

	await prisma.user.update({
		where: {
			id: user.id,
		},
		data: {
			onboardingCompleted: true,
			userType: 'COMPANY',
			Company: {
				create: {
					...validatedData,
				},
			},
		},
	});
	return { success: true };
}

export async function createJobSeeker(data: z.infer<typeof jobSeekerSchema>) {
	const user = await requireUser();

	// Access the request object so Arcjet can analyze it
	const req = await request();

	// Call Arcjet protect
	const decision = await aj.protect(req);

	if (decision.isDenied()) {
		return { error: 'Forbidden', reason: decision.reason };
	}

	// Server-side validation
	const validatedData = jobSeekerSchema.parse(data);

	await prisma.user.update({
		where: {
			id: user.id,
		},
		data: {
			onboardingCompleted: true,
			userType: 'JOB_SEEKER',
			JobSeeker: {
				create: { ...validatedData },
			},
		},
	});
	return { success: true };
}

export async function createJobPost(data: z.infer<typeof jobPostSchema>) {
	const user = await requireUser();

	// Access the request object so Arcjet can analyze it
	const req = await request();

	// Call Arcjet protect
	const decision = await aj.protect(req);
	if (decision.isDenied()) {
		return { error: 'Forbidden', reason: decision.reason };
	}

	// Server-side validation
	const validatedData = jobPostSchema.parse(data);

	// Get company id from user
	const company = await prisma.company.findUnique({
		where: { userId: user.id },
		select: { id: true, user: { select: { stripeCustomerId: true } } },
	});
	if (!company?.id) {
		throw new Error('Please create a company before posting a job');
	}

	// Create stripe customer
	let stripeCustomerId = company.user.stripeCustomerId;
	if (!stripeCustomerId) {
		const stripeCustomer = await stripe.customers.create({
			email: user.email!,
			name: user.name || undefined,
		});

		stripeCustomerId = stripeCustomer.id;

		await prisma.user.update({
			where: { id: user.id },
			data: { stripeCustomerId: stripeCustomer.id },
		});
	}

	// Create job post
	const jobPost = await prisma.jobPost.create({
		data: {
			companyId: company.id,
			jobTitle: validatedData.jobTitle,
			employmentType: validatedData.employmentType,
			location: validatedData.location,
			salaryFrom: validatedData.salaryFrom,
			salaryTo: validatedData.salaryTo,
			jobDescription: validatedData.jobDescription,
			benefits: validatedData.benefits,
			listingDuration: validatedData.listingDuration,
			status: validatedData.status,
		},
		select: {
			id: true,
		},
	});

	// Get price tier
	const pricingTier = jobDurationPricing.find((tier) => tier.days === validatedData.listingDuration);
	if (!pricingTier) {
		throw new Error('Price tier not found');
	}

	// Create stripe session
	const session = await stripe.checkout.sessions.create({
		customer: stripeCustomerId,
		line_items: [
			{
				price_data: {
					product_data: {
						name: `Job Posting - ${pricingTier.days} Days`,
						description: pricingTier.description,
						images: ['https://1pl18wcy2o.ufs.sh/f/tJndqOWdtIY2mqgwQ1YdZCx75kOSsfBNpDTm9XEtL6UWnR2w'],
					},
					currency: 'USD',
					unit_amount: pricingTier.price * 100, // Convert to cents for Stripe
				},
				// price: 'price_1RL1yiQ1qkU0EkPUWzSrBW44',
				quantity: 1,
			},
		],
		mode: 'payment',
		metadata: {
			jobId: jobPost.id,
		},
		success_url: `${process.env.NEXT_PUBLIC_URL}/payment/success`,
		cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/cancel`,
	});

	return {
		success: true,
		jobId: jobPost.id,
		sessionUrl: session.url as string,
	};
}
