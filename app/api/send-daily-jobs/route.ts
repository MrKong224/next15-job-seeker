import { DailyJobListingEmail } from '@/components/emailTemplate/daily-job-listing';
import { prisma } from '@/features/utils/db';
import { Resend } from 'resend';
import * as React from 'react';
import { EmploymentType } from '@prisma/client';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple matching algorithm - can be enhanced further
const calculateMatchPercentage = (userSkills: string[], jobRequirements: string[]): number => {
	if (!userSkills.length || !jobRequirements.length) return 0;

	const matches = jobRequirements.filter((req) =>
		userSkills.some(
			(skill) => skill.toLowerCase().includes(req.toLowerCase()) || req.toLowerCase().includes(skill.toLowerCase()),
		),
	).length;

	return Math.round((matches / jobRequirements.length) * 100);
};

export async function POST(request: Request) {
	try {
		const { userId } = await request.json();

		if (!userId) {
			return Response.json({ error: 'User ID is required' }, { status: 400 });
		}

		// Fetch user data with skills
		const user = await prisma.user.findUnique({
			where: { id: userId },
			include: {
				JobSeeker: true,
			},
		});

		if (!user || !user.JobSeeker) {
			return Response.json({ error: 'Job seeker not found' }, { status: 404 });
		}

		// Mock user skills - in a real app, you would store user skills in the database
		// This would be replaced with actual user skills from the database
		const userSkills = ['JavaScript', 'React', 'TypeScript', 'Next.js'];

		// Get recent job postings (published in the last 24 hours)
		const recentJobs = await prisma.jobPost.findMany({
			where: {
				status: 'PUBLISHED',
				createdAt: {
					gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
				},
			},
			include: {
				company: {
					select: {
						name: true,
						logo: true,
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
			take: 10,
		});

		// Mock job requirements - in a real app, you would extract these from the job description
		// or have a separate field for required skills
		const mockJobRequirements: Record<string, string[]> = {
			// Mock data - would be replaced with real skill extraction
			job1: ['JavaScript', 'React', 'CSS'],
			job2: ['TypeScript', 'Next.js', 'Node.js'],
			job3: ['Python', 'Django', 'PostgreSQL'],
		};

		// Process jobs and calculate match percentage
		const jobsWithMatch = recentJobs.map((job) => {
			// In a real app, you would extract skills from job.jobDescription
			// or have a separate field for required skills
			const mockRequirements = mockJobRequirements[`job${Math.floor(Math.random() * 3) + 1}`];
			const matchPercentage = calculateMatchPercentage(userSkills, mockRequirements);

			return {
				id: job.id,
				jobTitle: job.jobTitle,
				location: job.location,
				salaryFrom: job.salaryFrom,
				salaryTo: job.salaryTo,
				employmentType: EmploymentType[job.employmentType],
				company: job.company,
				matchPercentage: matchPercentage,
			};
		});

		// Sort by match percentage (highest first)
		const sortedJobs = jobsWithMatch.sort((a, b) => b.matchPercentage - a.matchPercentage);

		// Only send jobs with some level of matching
		const matchedJobs = sortedJobs.filter((job) => job.matchPercentage > 30);

		if (matchedJobs.length === 0) {
			return Response.json({ message: 'No matching jobs found' }, { status: 200 });
		}

		// Send email with matched jobs
		const { data, error } = await resend.emails.send({
			from: 'JobSeeker <onboarding@resend.dev>',
			to: [user.email],
			subject: `${matchedJobs.length} New Job Matches for You!`,
			react: React.createElement(DailyJobListingEmail, {
				firstName: user.JobSeeker.name.split(' ')[0],
				jobs: matchedJobs,
				userSkills: userSkills,
			}),
		});

		if (error) {
			return Response.json({ error }, { status: 500 });
		}

		return Response.json({
			success: true,
			message: `Email sent with ${matchedJobs.length} job matches`,
			data,
		});
	} catch (error) {
		console.error('Error sending daily job matches:', error);
		return Response.json({ error: 'Failed to send job matches' }, { status: 500 });
	}
}
