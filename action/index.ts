'use server';

import { requireUser } from '@/utils/requireUser';
import { companySchema, jobSeekerSchema } from '@/utils/zodSchemas';
import { z } from 'zod';
import { prisma } from '@/utils/db';
import arcjet, { detectBot, shield, slidingWindow } from '@/utils/arcjet';
import { request } from '@arcjet/next';

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
	console.log('🚀 ~ createJobSeeker ~ data:', data);
	const validatedData = jobSeekerSchema.parse(data);
	console.log('🚀 ~ createJobSeeker ~ validatedData:', validatedData);

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
