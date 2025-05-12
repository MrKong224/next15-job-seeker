import { headers } from 'next/headers';
import { stripe } from '@/features/utils/stripe';
import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { prisma } from '@/features/utils/db';
import { EJobPostStatus } from '@/features/types';

export async function POST(req: Request) {
	const body = await req.text();

	const headersList = await headers();

	const signature = headersList.get('Stripe-Signature') as string;

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
	} catch (err: any) {
		console.error(err);
		return new Response(`Webhook Error`, { status: 400 });
	}

	const session = event.data.object as Stripe.Checkout.Session;

	if (event.type === 'checkout.session.completed') {
		const customerId = session.customer as string;
		const jobId = session.metadata?.jobId as string;

		if (!jobId) {
			return new Response(`Not found job id`, { status: 400 });
		}

		const userCompany = await prisma.user.findUnique({
			where: {
				stripeCustomerId: customerId as string,
			},
			select: {
				Company: {
					select: {
						id: true,
					},
				},
			},
		});

		if (!userCompany) {
			return new Response(`Not found user company`, { status: 400 });
		}

		await prisma.jobPost.update({
			where: {
				id: jobId,
				companyId: userCompany?.Company?.id,
			},
			data: {
				status: EJobPostStatus.PUBLISHED,
			},
		});
	}

	return new Response(null, { status: 200 });
}
