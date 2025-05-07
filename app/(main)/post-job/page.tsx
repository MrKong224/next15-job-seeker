import CreateJobForm from './components/CreateJobForm';
import { getCompany } from '@/features/action';
import { requireUser } from '@/features/utils/requireUser';
import CompanyProfile from './components/CompaynProfile';
import { TCompanyProfile } from '@/types';
import { redirect } from 'next/navigation';

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
