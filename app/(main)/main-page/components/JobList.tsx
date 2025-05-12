import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import { prisma } from '@/features/utils/db';
import { EEmploymentType, EJobPostStatus } from '@/features/types';
import JobCard from './JobCard';
import EmptyState from '../../post-job/components/EmptyState';

const getJobs = async (param: { page: number; pageSize: number; filter: { jobTypes: string[]; location: string } }) => {
	const { page, pageSize, filter } = param;
	const skip = (page - 1) * pageSize;

	const where = {
		status: EJobPostStatus.PUBLISHED,
		...(filter.location && { location: filter.location }),
		...(filter.jobTypes.length && { employmentType: { in: filter.jobTypes as EEmploymentType[] } }),
	};

	const [jobs, totalCount] = await Promise.all([
		prisma.jobPost.findMany({
			skip,
			take: pageSize,
			where,
			select: {
				id: true,
				jobTitle: true,
				location: true,
				salaryFrom: true,
				salaryTo: true,
				employmentType: true,
				jobDescription: true,
				benefits: true,
				company: {
					select: {
						name: true,
						logo: true,
					},
				},
				createdAt: true,
				updatedAt: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		}),
		prisma.jobPost.count({
			where,
		}),
	]);

	return { jobs, totalCount, currentPage: page, totalPages: Math.ceil(totalCount / pageSize) };
};

interface iProp {
	page: number;
	pageSize: number;
	filter: {
		jobTypes: string[];
		location: string;
	};
}

export default async function JobList({ page, pageSize, filter }: iProp) {
	const { jobs, totalCount, currentPage, totalPages } = await getJobs({
		page: page || 1,
		pageSize: pageSize || 20,
		filter,
	});

	return (
		<div className="space-y-4">
			{jobs.length > 0 ? (
				<>
					{jobs.map((job) => (
						<JobCard
							key={job.id}
							job={job}
						/>
					))}
				</>
			) : (
				<EmptyState
					title="No jobs found"
					description="No jobs found matching your criteria."
					href="/post-job"
					buttonText="Create a job"
				/>
			)}

			{/* Debug information - can be removed in production */}
			{process.env.NODE_ENV === 'development' && (
				<Card className="w-full mt-8">
					<CardHeader>
						<CardTitle>Debug Information</CardTitle>
					</CardHeader>
					<CardContent>
						<p>Total jobs: {totalCount}</p>
						<p>Current page: {currentPage}</p>
						<p>Total pages: {totalPages}</p>
						<pre>{JSON.stringify({ filter }, null, 2)}</pre>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
