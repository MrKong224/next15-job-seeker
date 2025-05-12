import JobFilter from './main-page/components/JobFilter';
import JobList from './main-page/components/JobList';

type iParam = {
	searchParams: Promise<{
		page: string;
		pageSize: string;
		jobTypes: string;
		location: string;
	}>;
};

export default async function Home({ searchParams }: iParam) {
	const param = await searchParams;

	const page = param.page ? parseInt(param.page) : 1;
	const pageSize = param.pageSize ? parseInt(param.pageSize) : 20;
	const jobTypes = param.jobTypes ? param.jobTypes.split(',') : [];
	const location = param.location ? param.location : '';

	return (
		<div className="grid grid-cols-4 gap-8 mt-4">
			<JobFilter />
			<div className="col-span-3 flex flex-col gap-8">
				<JobList
					page={page}
					pageSize={pageSize}
					filter={{
						jobTypes,
						location,
					}}
				/>
			</div>
		</div>
	);
}
