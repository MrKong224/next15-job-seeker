import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { TCompanyProfile } from '@/features/types';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';
import { countryList } from '@/features/utils/countriesList';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface iProps {
	companyData: TCompanyProfile;
}

export default function CompanyProfile({ companyData }: iProps) {
	const country = countryList.find((country) => country.code === companyData.location);
	return (
		<Card className="">
			<CardHeader>
				<CardTitle className="text-xl">Company Profile</CardTitle>
			</CardHeader>
			<CardContent>
				{!companyData.id && (
					<div className="flex flex-col items-center justify-center p-4 rounded-lg bg-slate-800 text-center">
						<div className="mb-4">
							<Search
								className="text-muted-foreground mx-auto"
								size={48}
							/>
						</div>
						<h2 className="text-xl font-semibold text-white mb-2">Company Profile Not Found</h2>
						<p className="text-muted-foreground mb-6 text-base">
							Please create a company profile to continue posting jobs.
						</p>
						<Link
							href="/onboarding"
							className={buttonVariants({ variant: 'default', size: 'lg' })}>
							Create Company Profile
						</Link>
					</div>
				)}
				{companyData?.id && (
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<Label>Logo</Label>
							<div className="relative size-20 overflow-hidden rounded-md">
								<Image
									src={companyData.logo}
									alt={companyData.name}
									fill
									className="object-cover"
								/>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<Label>Name</Label>
							<Input
								value={companyData.name}
								className="text-white focus-visible:ring-0 hover:cursor-default"
								readOnly
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label>Website</Label>
							<Input
								value={companyData.website}
								className="text-white focus-visible:ring-0 hover:cursor-default"
								readOnly
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label>Location</Label>
							<Input
								value={`${country?.flagEmoji} ${country?.name}`}
								className="text-white focus-visible:ring-0 hover:cursor-default"
								readOnly
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label>X Account</Label>
							<Input
								value={companyData.xAccount}
								className="text-white focus-visible:ring-0 hover:cursor-default"
								readOnly
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label>About</Label>
							<Textarea
								value={companyData.about}
								className="text-white focus-visible:ring-0 hover:cursor-default h-50"
								readOnly
							/>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
