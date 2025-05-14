import * as React from 'react';
import { Body } from '@react-email/body';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Html } from '@react-email/html';
import { Img } from '@react-email/img';
import { Link } from '@react-email/link';
import { Preview } from '@react-email/preview';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';
import { Row } from '@react-email/row';
import { Column } from '@react-email/column';
import { Button } from '@react-email/button';
import { Hr } from '@react-email/hr';
import { Tailwind } from '@react-email/tailwind';

interface JobListing {
	id: string;
	jobTitle: string;
	location: string;
	salaryFrom: number;
	salaryTo: number;
	employmentType: string;
	company: {
		name: string;
		logo: string;
	};
	matchPercentage?: number; // Optional match percentage based on skills
}

interface DailyJobListingEmailProps {
	firstName: string;
	jobs: JobListing[];
	userSkills?: string[]; // Optional user skills for context
}

export const DailyJobListingEmail: React.FC<Readonly<DailyJobListingEmailProps>> = ({
	firstName,
	jobs,
	userSkills = [],
}) => {
	// Format salary range
	const formatSalary = (from: number, to: number) => {
		if (from === 0 && to === 0) return 'Negotiable';
		if (from === 0) return `Up to $${to.toLocaleString()}`;
		if (to === 0) return `From $${from.toLocaleString()}`;
		return `$${from.toLocaleString()} - $${to.toLocaleString()}`;
	};

	return (
		<Html>
			<Head />
			<Preview>Your daily job matches are here, {firstName}!</Preview>
			<Tailwind>
				<Body className="bg-gray-100 font-sans">
					<Container className="mx-auto my-8 max-w-[600px] rounded bg-white p-4">
						{/* Header */}
						<Section className="mt-4 text-center">
							<Heading className="text-2xl font-bold text-gray-800">Daily Job Matches for {firstName}</Heading>
							<Text className="text-gray-600">
								We found {jobs.length} job{jobs.length !== 1 ? 's' : ''} that match your skills
							</Text>
							{userSkills.length > 0 && (
								<Text className="text-sm text-gray-500">Based on your skills: {userSkills.join(', ')}</Text>
							)}
						</Section>

						<Hr className="my-4 border border-gray-200" />

						{/* Job Listings */}
						<Section>
							{jobs.map((job) => (
								<Row
									key={job.id}
									className="my-4 rounded border border-gray-200 p-4 hover:bg-gray-50">
									<Column>
										<Row>
											<Column className="w-12">
												{job.company.logo ? (
													<Img
														src={job.company.logo}
														alt={job.company.name}
														width="40"
														height="40"
														className="rounded-md"
													/>
												) : (
													<div className="h-10 w-10 rounded-md bg-gray-200"></div>
												)}
											</Column>
											<Column>
												<Link
													href={`${process.env.NEXT_PUBLIC_APP_URL}/job/${job.id}`}
													className="text-blue-600 no-underline">
													<Text className="m-0 text-lg font-bold text-blue-600">{job.jobTitle}</Text>
												</Link>
												<Text className="m-0 text-sm text-gray-600">
													{job.company.name} • {job.location}
												</Text>
												<Text className="m-0 text-sm text-gray-600">
													{job.employmentType} • {formatSalary(job.salaryFrom, job.salaryTo)}
												</Text>
												{job.matchPercentage && (
													<Text className="m-0 text-sm font-semibold text-green-600">
														{job.matchPercentage}% match with your skills
													</Text>
												)}
											</Column>
										</Row>
									</Column>
								</Row>
							))}
						</Section>

						{/* View All Jobs Button */}
						<Section className="text-center mt-6">
							<Button
								className="rounded bg-blue-600 px-6 py-3 text-white font-medium"
								href="http://localhost:3000">
								View All Jobs
							</Button>
						</Section>

						{/* Footer */}
						<Section className="mt-8 text-center">
							<Text className="text-sm text-gray-500">
								To update your job preferences or unsubscribe, visit your{' '}
								<Link
									href="https://yourjobsite.com/settings"
									className="text-blue-600 underline">
									account settings
								</Link>
							</Text>
							<Text className="text-xs text-gray-400">
								© {new Date().getFullYear()} JobSeeker. All rights reserved.
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default DailyJobListingEmail;
