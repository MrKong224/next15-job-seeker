import { DailyJobListingEmail } from '@/components/emailTemplate/daily-job-listing';
import { Resend } from 'resend';
import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

// Sample job data for testing
const sampleJobs = [
	{
		id: '1',
		jobTitle: 'Senior Frontend Developer',
		location: 'Remote',
		salaryFrom: 90000,
		salaryTo: 120000,
		employmentType: 'FULLTIME',
		company: {
			name: 'TechCorp Inc.',
			logo: 'https://via.placeholder.com/40',
		},
		matchPercentage: 95,
	},
	{
		id: '2',
		jobTitle: 'React Developer',
		location: 'San Francisco, CA',
		salaryFrom: 85000,
		salaryTo: 110000,
		employmentType: 'FULLTIME',
		company: {
			name: 'InnovateSoft',
			logo: 'https://via.placeholder.com/40',
		},
		matchPercentage: 88,
	},
	{
		id: '3',
		jobTitle: 'Next.js Engineer',
		location: 'New York, NY',
		salaryFrom: 95000,
		salaryTo: 130000,
		employmentType: 'FULLTIME',
		company: {
			name: 'WebFuture',
			logo: 'https://via.placeholder.com/40',
		},
		matchPercentage: 82,
	},
	{
		id: '4',
		jobTitle: 'TypeScript Developer (Contract)',
		location: 'Austin, TX',
		salaryFrom: 70,
		salaryTo: 90,
		employmentType: 'CONTRACT',
		company: {
			name: 'CodeBridge',
			logo: 'https://via.placeholder.com/40',
		},
		matchPercentage: 76,
	},
	{
		id: '5',
		jobTitle: 'Full Stack Developer',
		location: 'Chicago, IL',
		salaryFrom: 80000,
		salaryTo: 115000,
		employmentType: 'FULLTIME',
		company: {
			name: 'SoftSolutions',
			logo: 'https://via.placeholder.com/40',
		},
		matchPercentage: 70,
	},
];

// Sample user skills
const sampleUserSkills = ['React', 'TypeScript', 'Next.js', 'JavaScript', 'HTML', 'CSS', 'Redux', 'REST API'];

export async function GET(request: Request) {
	try {
		// Get email parameter from URL if any
		const url = new URL(request.url);
		const email = 'nuttakornpe@gmail.com'; // url.searchParams.get('email') || 'test@example.com';
		const previewOnly = url.searchParams.get('preview') === 'true';

		if (previewOnly) {
			// Using the send method with preview mode
			const { data, error } = await resend.emails.send({
				from: 'JobSeeker <onboarding@resend.dev>',
				to: [email],
				subject: '5 New Job Matches For You!',
				react: React.createElement(DailyJobListingEmail, {
					firstName: 'John',
					jobs: sampleJobs,
					userSkills: sampleUserSkills,
				}),
			});

			if (error) {
				return Response.json({ error }, { status: 500 });
			}

			// Return success response
			return Response.json({
				success: true,
				message: 'Email preview generated',
				data,
			});
		} else {
			// Send an actual test email
			const { data, error } = await resend.emails.send({
				from: 'JobSeeker <onboarding@resend.dev>',
				to: [email],
				subject: '5 New Job Matches For You!',
				react: React.createElement(DailyJobListingEmail, {
					firstName: 'John',
					jobs: sampleJobs,
					userSkills: sampleUserSkills,
				}),
			});

			if (error) {
				return Response.json({ error }, { status: 500 });
			}

			return Response.json({
				success: true,
				message: `Test email sent to ${email}`,
				data,
			});
		}
	} catch (error) {
		console.error('Error sending test email:', error);
		return Response.json({ error: 'Failed to send test email' }, { status: 500 });
	}
}
