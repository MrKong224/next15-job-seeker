import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { TCompanyProfile } from '@/types';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';

interface iProps {
	companyData: TCompanyProfile;
}

export default function CompanyProfile({ companyData }: iProps) {
	return (
		<Card className="">
			<CardHeader>
				<CardTitle className="text-xl">Company Profile</CardTitle>
			</CardHeader>
			<CardContent>
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
							disabled
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label>Website</Label>
						<Input
							value={companyData.website}
							disabled
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label>X Account</Label>
						<Input
							value={companyData.xAccount}
							disabled
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label>About</Label>
						<Textarea
							value={companyData.about}
							disabled
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
