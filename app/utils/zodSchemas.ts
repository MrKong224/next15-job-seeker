import { z } from 'zod';

export const jobSeekerSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	about: z.string().min(10, 'Please provide more information about yourself'),
	resume: z.string().min(1, 'Please upload a resume'),
});
