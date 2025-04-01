import { auth } from '@/app/utils/auth';
import { Separator } from '@/components/ui/separator';
import { redirect } from 'next/navigation';
export default async function Dashboard() {
	const session = await auth();

	if (!session?.user) {
		redirect('/login');
	}

	return (
		<div>
			Dashboard
			<Separator className="my-4" />
			<pre>{JSON.stringify(session?.user, null, 2)}</pre>
		</div>
	);
}
