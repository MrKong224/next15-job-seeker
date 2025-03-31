import { RegisterLink, LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { buttonVariants } from '../ui/button';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { UserDropDown } from './UserDropDown';

export default async function NavBarKindeAuth() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	const avatarFallback = `${user?.given_name?.charAt(0).toUpperCase()}${user?.family_name?.charAt(0).toUpperCase()}`;

	return (
		<div className="flex items-center gap-5">
			{user ? (
				<UserDropDown
					name={user.given_name as string}
					email={user.email as string}
					profileImage={user.picture as string}
					avatarFallback={avatarFallback as string}
				/>
			) : (
				<>
					<LoginLink className={buttonVariants({ variant: 'default' })}>Sign in</LoginLink>
					<RegisterLink className={buttonVariants({ variant: 'default' })}>Sign up</RegisterLink>
				</>
			)}
		</div>
	);
}
