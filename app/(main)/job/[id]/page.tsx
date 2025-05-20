import { Badge } from '@/components/ui/badge';
import { EJobPostStatus } from '@/features/types';
import { auth } from '@/features/utils/auth';
import { prisma } from '@/features/utils/db';
import { notFound, redirect } from 'next/navigation';
import { getCountryObject } from '@/features/utils/countriesList';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { JsonToHtml } from '@/components/general/JsonHtml';
import { Card } from '@/components/ui/card';
import { GeneralSubmitButton } from '@/components/general/SubmitButton';
import { getFlagEmoji } from '@/features/utils/countriesList';
import Image from 'next/image';

type iParam = {
	params: Promise<{
		id: string;
	}>;
};

const getJobData = async (jobId: string) => {
	const jobData = await prisma.jobPost.findUnique({
		where: {
			id: jobId,
			status: EJobPostStatus.PUBLISHED,
		},
		select: {
			jobTitle: true,
			employmentType: true,
			location: true,
			jobDescription: true,
			createdAt: true,
			listingDuration: true,
			company: {
				select: {
					name: true,
					logo: true,
					location: true,
					about: true,
				},
			},
		},
	});

	return jobData;
};

export default async function JobDetail({ params }: iParam) {
	const { id } = await params;

	const session = await auth();

	if (!session) {
		return redirect('/login');
	}

	const jobData = await getJobData(id);
	const locationObject = getCountryObject(jobData?.location || '');
	const locationFlag = getFlagEmoji(locationObject?.code || '');

	if (!jobData) {
		return notFound();
	}

	return (
		<div className="container mx-auto py-8">
			<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
				{/* Main Content */}
				<div className="lg:col-span-3 transition-all duration-300 p-4 space-y-8">
					{/* Header */}
					<div className="flex justify-between items-center">
						<div>
							<h1 className="text-3xl font-bold">{jobData.jobTitle}</h1>
							<div className="flex items-center gap-2 mt-2">
								<span className="font-medium">{jobData.company.name}</span>
								<Badge variant="secondary">{jobData.employmentType}</Badge>
								<Badge
									variant="secondary"
									className="rounded-full">
									{locationFlag && <span className="mr-1">{locationFlag}</span>}
									{jobData.location}
								</Badge>
							</div>
						</div>
						{session?.user ? (
							<Button
								variant="outline"
								// disabled={pending}
								type="submit"
								className="flex items-center gap-2">
								<Heart className={`size-4 transition-colors ${true ? 'fill-current text-red-500' : ''}`} />
								{true ? 'Saved' : 'Save Job'}
							</Button>
						) : (
							<Button
								variant="outline"
								asChild>
								<Link href="/login">
									<Heart className="size-4 mr-2" />
									Save Job
								</Link>
							</Button>
						)}
					</div>

					{/* Job Description */}
					<section>
						<JsonToHtml json={JSON.parse(jobData.jobDescription)} />
					</section>

					{/* Benefits */}
					<section>
						<h3 className="text-lg font-semibold">
							Benefits{' '}
							<span className="text-sm text-muted-foreground font-normal">
								(green is offered and red is not offered)
							</span>
						</h3>
					</section>
				</div>

				{/* Side Content */}
				<div className="lg:col-span-1 space-y-8">
					{/* Apply now */}
					<Card className="p-6">
						<div className="space-y-4">
							<div>
								<div className="flex items-center justify-between">
									<h3 className="font-semibold">Apply now</h3>
								</div>
								<p className="text-sm text-muted-foreground mt-1">
									Please let {jobData.company.name} know you found this job on Job Seeker. This helps us grow!
								</p>
							</div>
							<form>
								<GeneralSubmitButton label="Apply now" />
							</form>
						</div>
					</Card>

					{/* Job Details */}
					<Card className="p-6">
						<div className="space-y-4">
							<h3 className="font-semibold">About the job</h3>
							<div className="space-y-2">
								<div className="flex justify-between">
									<span className="text-sm text-muted-foreground">Apply before</span>
									<span className="text-sm">
										{new Date(
											jobData.createdAt.getTime() + jobData.listingDuration * 24 * 60 * 60 * 1000,
										).toLocaleDateString('en-US', {
											month: 'long',
											day: 'numeric',
											year: 'numeric',
										})}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-muted-foreground">Posted on</span>
									<span className="text-sm">
										{jobData.createdAt.toLocaleDateString('en-US', {
											month: 'long',
											day: 'numeric',
											year: 'numeric',
										})}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-muted-foreground">Employment type</span>
									<span className="text-sm">{jobData.employmentType}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-muted-foreground">Location</span>
									<Badge variant="secondary">
										{locationFlag && <span className="mr-1">{locationFlag}</span>}
										{jobData.location}
									</Badge>
								</div>
							</div>
						</div>
					</Card>

					{/* Company */}
					<Card className="p-6">
						<div className="space-y-4">
							<div>
								<Image
									src={jobData.company.logo ?? `https://avatar.vercel.sh/${jobData.company.name}`}
									alt={jobData.company.name}
									width={48}
									height={48}
									className="rounded-full size-12"
								/>
							</div>
							<div>
								<h3 className="font-semibold">{jobData.company.name}</h3>
								<p className="text-sm text-muted-foreground line-clamp-3">{jobData.company.about}</p>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}
