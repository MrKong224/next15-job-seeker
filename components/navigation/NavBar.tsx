import * as React from 'react';
import Link from 'next/link';
import Logo from '@/public/logo.png';
import Image from 'next/image';

import { ModeToggle } from '@/components/navigation/ModeToggle';
import { Button, buttonVariants } from '@/components/ui/button';

import MobileNav from './MobileNav';

import { auth } from '@/utils/auth';
import { UserDropDown } from './UserDropDown';

// import NavBarKindeAuth from './NavBarKindeAuth';

export async function NavBar() {
	const session = await auth();

	return (
		<nav className="sticky top-0 z-50 w-full shadow-md bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="flex justify-between items-center py-5">
				<Link
					href="/"
					className="flex items-center justify-center space-x-2">
					<div className="relative h-10 w-10 overflow-hidden">
						<Image
							src={Logo}
							alt="Job Marshal Logo"
							fill
							className="object-cover"
						/>
					</div>
					<h1 className="text-2xl font-bold text-primary uppercase">Seeker</h1>
				</Link>

				{/* Desktop Navigation */}
				<div className="hidden md:flex items-center gap-5">
					<Link
						href="/onboarding"
						className={buttonVariants({ variant: 'ghost' })}
						passHref>
						Onboarding
					</Link>
					<Link
						href="/dashboard"
						className={buttonVariants({ variant: 'ghost' })}
						passHref>
						Dashboard
					</Link>
					<ModeToggle />
					{session?.user ? (
						<>
							<Link
								href="/post-job"
								className={buttonVariants({ size: 'lg' })}
								passHref>
								Post Job
							</Link>
							<UserDropDown
								name={session.user.name as string}
								email={session.user.email as string}
								profileImage={session.user.image as string}
								avatarFallback={session.user.name?.charAt(0) as string}
							/>
						</>
					) : (
						<Link
							href="/login"
							className={buttonVariants({ variant: 'default', size: 'lg' })}>
							Login
						</Link>
					)}
				</div>

				{/* Mobile Navigation */}
				<div className="md:hidden flex flex-col gap-4">
					<MobileNav />
				</div>
			</div>
		</nav>
	);
}
