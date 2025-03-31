import { Separator } from '@/components/ui/separator';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function Dashboard() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	return (
		<div>
			Dashboard
			<Separator className="my-4" />
			<pre>{JSON.stringify(user, null, 2)}</pre>
		</div>
	);
}
