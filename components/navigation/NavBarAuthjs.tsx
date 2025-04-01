import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { auth, signOut } from '@/app/utils/auth';
import { GeneralSubmitButton } from '../general/SubmitButton';
import { LogOut } from 'lucide-react';
export default async function NavBarAuthjs() {
	const session = await auth();

	return (
		<>
			{session?.user ? (
				<>
					<form
						action={async () => {
							'use server';
							await signOut({ redirectTo: '/' });
						}}>
						<GeneralSubmitButton
							label="Logout"
							variant="outline"
							icon={<LogOut className="size-4" />}
						/>
					</form>
				</>
			) : (
				<Link
					href="/login"
					className={buttonVariants({ variant: 'default', size: 'lg' })}>
					Login
				</Link>
			)}
		</>
	);
}
