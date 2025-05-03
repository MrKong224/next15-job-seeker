import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ArcJetLogo from '@/public/arcjet.jpg';
import InngestLogo from '@/public/inngest-locale.png';
import Image from 'next/image';
import CreateJobForm from './components/CreateJobForm';
import { getCompany } from '@/features/action';
import { requireUser } from '@/features/utils/requireUser';
import CompanyProfile from './components/CompaynProfile';
import { TCompanyProfile } from '@/types';
import { redirect } from 'next/navigation';
const companies = [
	{ id: 0, name: 'ArcJet', logo: ArcJetLogo },
	{ id: 1, name: 'Inngest', logo: InngestLogo },
	{ id: 2, name: 'ArcJet', logo: ArcJetLogo },
	{ id: 3, name: 'Inngest', logo: InngestLogo },
	{ id: 4, name: 'ArcJet', logo: ArcJetLogo },
	{ id: 5, name: 'Inngest', logo: InngestLogo },
];

const testimonials = [
	{
		quote: 'We found our ideal candidate within 48 hours of posting. The quality of applicants was exceptional!',
		author: 'Sarah Chen',
		company: 'TechCorp',
	},
	{
		quote: 'The platform made hiring remote talent incredibly simple. Highly recommended!',
		author: 'Mark Johnson',
		company: 'StartupX',
	},
	{
		quote: "We've consistently found high-quality candidates here. It's our go-to platform for all our hiring needs.",
		author: 'Emily Rodriguez',
		company: 'InnovateNow',
	},
];

const stats = [
	{ value: '10k+', label: 'Monthly active job seekers' },
	{ value: '48h', label: 'Average time to hire' },
	{ value: '95%', label: 'Employer satisfaction rate' },
	{ value: '500+', label: 'Companies hiring monthly' },
];

export default async function PostJob() {
	const user = await requireUser();

	const companyData = await getCompany(user.id as string);

	if (!companyData) {
		redirect('/');
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
			<div className="col-span-1 px-4 lg:col-span-2">
				<CreateJobForm />
			</div>

			<div className="col-span-1">
				<CompanyProfile companyData={companyData as TCompanyProfile} />
			</div>
		</div>
	);
}
