'use server';

import { requireUser } from '@/features/utils/requireUser';
import { companySchema, jobSeekerSchema, jobPostSchema } from '@/features/utils/zodSchemas';
import { z } from 'zod';
import { prisma } from '@/features/utils/db';
import arcjet, { detectBot, shield, slidingWindow } from '@/features/utils/arcjet';
import { request } from '@arcjet/next';
import { EEmploymentType, EJobPostStatus } from '@/types';
import { redirect } from 'next/navigation';

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
		select: { id: true },
	});

	if (!company?.id) {
		throw new Error('Please create a company before posting a job');
	}

	// Create job post
	await prisma.jobPost.create({
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
	});

	console.log('🚀 ~ createJobPost ~ validatedData:', validatedData);
	console.log('🚀 ~ createJobPost ~ company:', company);

	return { success: true };
}
