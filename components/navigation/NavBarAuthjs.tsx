import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { auth, signOut } from '@/app/utils/auth';
import { GeneralSubmitButton } from '../general/SubmitButton';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import { UserDropDown } from '@/components/navigation/UserDropDown';
export default async function NavBarAuthjs() {
	const session = await auth();

	return (
		<>
			{session?.user ? (
				<>
					<UserDropDown
						name={session.user.name || ''}
						email={session.user.email || ''}
						profileImage={session.user.image || ''}
						avatarFallback={session.user.name?.charAt(0) || ''}
					/>
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
