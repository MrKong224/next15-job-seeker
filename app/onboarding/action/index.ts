'use server';

import { requireUser } from '@/app/utils/requireUser';
import { companySchema, jobSeekerSchema } from '@/app/utils/zodSchemas';
import arcjet, { detectBot, shield, request } from '@arcjet/next';
import { z } from 'zod';
import { prisma } from '@/app/utils/db';

const aj = arcjet({
	key: process.env.ARCJET_KEY!,
	rules: [
		shield({
			mode: 'LIVE',
		}),
		detectBot({
			mode: 'LIVE',
			allow: [],
		}),
	],
});

export async function createCompany(data: z.infer<typeof companySchema>) {
	const user = await requireUser();

	const { name, location, about, logo, website, xAccount } = data;

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
