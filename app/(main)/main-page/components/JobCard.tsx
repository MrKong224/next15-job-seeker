import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { EEmploymentType } from '@/features/types';
import { formatDistanceToNow } from 'date-fns';
import { Building2, MapPin, Clock, BriefcaseBusiness, DollarSign, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Import the actual Prisma type for consistency
import { JobPostStatus, EmploymentType } from '@prisma/client';
import { countryList } from '@/features/utils/countriesList';

interface JobCardProps {
	job: {
		id: string;
		jobTitle: string;
		location: string;
		salaryFrom: number;
		salaryTo: number;
		employmentType: EmploymentType;
		benefits: string[];
		company: {
			name: string;
			logo: string;
		};
		createdAt: Date;
	};
}

// Helper function to format salary
const formatSalary = (from: number, to: number) => {
	const formatNumber = (num: number) => {
		if (num >= 1000) {
			return `${(num / 1000).toFixed(0)}k`;
		}
		return num.toString();
	};

	return `$${formatNumber(from)} - $${formatNumber(to)}`;
};

const formatCountry = (locationCode: string) => {
	const country = countryList.find((country) => locationCode.includes(country.code));
	return (
		<>
			{country ? (
				<>
					<span className="mr-1">{country?.flagEmoji}</span>
					<span>{country?.name}</span>
				</>
			) : (
				<span className="text-muted-foreground">{locationCode}</span>
			)}
		</>
	);
};

export default function JobCard({ job }: JobCardProps) {
	return (
		<Card className="w-full hover:shadow-md transition-shadow duration-200">
			<CardHeader className="flex flex-row items-start gap-4 pb-2">
				<Avatar className="h-14 w-14 rounded-md border-none">
					{job.company.logo ? (
						<Image
							src={job.company.logo}
							alt={job.company.name}
							width={56}
							height={56}
							className="aspect-square object-cover"
						/>
					) : (
						<Building2 className="h-8 w-8" />
					)}
				</Avatar>
				<div className="space-y-1 flex-1">
					<CardTitle className="text-xl font-bold line-clamp-1">{job.jobTitle}</CardTitle>
					<div className="flex items-center gap-4 text-muted-foreground text-sm">
						<span className="flex items-center gap-1">
							<Building2 className="h-3.5 w-3.5" />
							{job.company.name}
						</span>
						<span className="flex items-center gap-1">
							<MapPin className="h-3.5 w-3.5" />
							{formatCountry(job.location)}
						</span>
					</div>
				</div>
				<Badge
					variant="outline"
					className="font-normal">
					<Calendar className="h-3 w-3 mr-1" />
					{formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
				</Badge>
			</CardHeader>
			<CardContent className="pb-2">
				<div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
					<div className="flex items-center gap-2">
						<DollarSign className="h-4 w-4 text-muted-foreground" />
						<span>{formatSalary(job.salaryFrom, job.salaryTo)}</span>
					</div>
					<div className="flex items-center gap-2">
						<BriefcaseBusiness className="h-4 w-4 text-muted-foreground" />
						<span className="capitalize">{EEmploymentType[job.employmentType]}</span>
					</div>
					<div className="flex items-center gap-2">
						<Clock className="h-4 w-4 text-muted-foreground" />
						<span>Apply now</span>
					</div>
				</div>

				{job.benefits && job.benefits.length > 0 && (
					<div className="flex flex-wrap gap-2 mt-4">
						{job.benefits.slice(0, 3).map((benefit, index) => (
							<Badge
								key={index}
								variant="secondary"
								className="font-normal">
								{benefit}
							</Badge>
						))}
						{job.benefits.length > 3 && (
							<Badge
								variant="outline"
								className="font-normal">
								+{job.benefits.length - 3} more
							</Badge>
						)}
					</div>
				)}
			</CardContent>
			<CardFooter className="pt-2 flex justify-end">
				<Link
					href={`/job/${job.id}`}
					passHref>
					<Button
						variant="secondary"
						size="sm">
						View Details
					</Button>
				</Link>
			</CardFooter>
		</Card>
	);
}
