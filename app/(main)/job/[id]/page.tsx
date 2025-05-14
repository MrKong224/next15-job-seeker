import { Badge } from '@/components/ui/badge';
import { EJobPostStatus } from '@/features/types';
import { auth } from '@/features/utils/auth';
import { prisma } from '@/features/utils/db';
import { notFound, redirect } from 'next/navigation';
import { getCountryObject } from '@/features/utils/countriesList';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart } from 'lucide-react';

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

	if (!jobData) {
		return notFound();
	}

	return (
		<div className="container mx-auto py-8">
			<div className="grid grid-cols-[1fr, 400px] gap-8 px-4 md:px-6 lg:px-8 pb-12">
				<div className="space-y-8">
					<div className="flex justify-between items-center">
						<div>
							<h1 className="text-3xl font-bold">{jobData.jobTitle}</h1>
							<div className="flex items-center gap-2 mt-2">
								<span className="font-medium">{jobData.company.name}</span>
								<Badge
									className="rounded-full"
									variant="secondary">
									{jobData.employmentType}
								</Badge>
								<span className="hidden md:inline text-muted-foreground">•</span>
								<Badge
									className="rounded-full"
									variant="secondary">
									{locationObject?.flagEmoji && <span className="mr-1">{locationObject.flagEmoji}</span>}
									{locationObject?.name} Only
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
				</div>
			</div>
		</div>
	);
}
