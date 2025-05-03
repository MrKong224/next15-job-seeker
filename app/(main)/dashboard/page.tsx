import { auth } from '@/features/utils/auth';
import { Separator } from '@/components/ui/separator';
import { redirect } from 'next/navigation';
export default async function DashboardPage() {
	const session = await auth();

	if (!session?.user) {
		redirect('/login');
	}

	return (
		<div className="my-5">
			Dashboard
			<Separator className="my-4" />
			<pre>{JSON.stringify(session?.user, null, 2)}</pre>
		</div>
	);
}
