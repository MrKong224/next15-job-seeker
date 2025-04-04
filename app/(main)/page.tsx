import Image from 'next/image';
import { auth } from '@/app/utils/auth';
import { Separator } from '@/components/ui/separator';
export default async function Home() {
	const session = await auth();
	return (
		<div className="my-5">
			<h1>Hello World</h1>
			<Separator className="my-4" />
			<pre>{JSON.stringify(session, null, 2)}</pre>
			<Separator className="my-4" />
		</div>
	);
}
