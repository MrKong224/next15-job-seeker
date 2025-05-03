import { EEmploymentType, EJobPostStatus } from '@/types';
import { z } from 'zod';

export const companySchema = z.object({
	name: z.string().min(2, 'Company name must be at least 2 characters'),
	location: z.string().min(1, 'Location must be definded'),
	about: z.string().min(10, 'Please provide some information about your company'),
	logo: z.string().min(1, 'Please upload a logo'),
	website: z.string().url('Please enter a website'),
	xAccount: z.string().optional(),
});

export const jobSeekerSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	about: z.string().min(10, 'Please provide more information about yourself'),
	resume: z.string().min(1, 'Please upload a resume'),
	resumeFileName: z.string().optional(),
});

export const jobPostSchema = z.object({
	jobTitle: z.string().min(1, 'Job title is required'),
	employmentType: z.nativeEnum(EEmploymentType, {
		message: 'Employment type is required',
	}),
	location: z.string().min(1, 'Location is required'),
	salaryFrom: z.number().min(0, 'Salary from is required'),
	salaryTo: z.number().min(0, 'Salary to is required'),
	jobDescription: z.string().min(1, 'Job description is required'),
	benefits: z.array(z.string()).min(1, 'Benefits are required'),
	listingDuration: z.number().min(1, 'Listing duration is required'),
	status: z.nativeEnum(EJobPostStatus, {
		message: 'Status is required',
	}),
});
