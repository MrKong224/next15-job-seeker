import * as React from 'react';
import Link from 'next/link';
import { ModeToggle } from '@/components/navigation/ModeToggle';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';
import { RegisterLink, LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function NavBar() {
	// const { getUser } = getKindeServerSession();
	// const user = await getUser();

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto">
				<div className="flex h-14 items-center">
					<Link
						href="/"
						className="flex items-center space-x-2">
						<span className="font-bold">Next.js</span>
					</Link>
					<div className="hidden md:flex flex-1 items-center justify-between space-x-2 md:justify-end">
						<nav className="flex items-center">
							<Link
								href="/shadcn-guild"
								passHref>
								<Button variant="ghost">Shadcn Guild</Button>
							</Link>
						</nav>
						<LoginLink className={buttonVariants({ variant: 'default' })}>Sign in</LoginLink>
						<LogoutLink className={buttonVariants({ variant: 'destructive', size: 'lg' })}>Sign out</LogoutLink>
						<div className="flex items-center">
							<ModeToggle />
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
