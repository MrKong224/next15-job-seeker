import { prisma } from '@/features/utils/db';
import { requireUser } from '@/features/utils/requireUser';
import { jobDurationPricing } from '@/features/utils/jobDurationPricing';
import { stripe } from '@/features/utils/stripe';
import { NextResponse } from 'next/server';

export async function GET() {
	const user = await requireUser();

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

	const pricingTier = jobDurationPricing.find((tier) => tier.days === 60);

	if (!pricingTier) {
		throw new Error('Price tier not found');
	}

	// return NextResponse.json({ stripeCustomerId, pricingTier });

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
			jobId: '4c65d927-d358-4421-898c-c7e15f731a51',
		},
		success_url: `${process.env.NEXT_PUBLIC_URL}/payment/success`,
		cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/cancel`,
	});

	return NextResponse.redirect(session.url as string, { status: 303 });
}
