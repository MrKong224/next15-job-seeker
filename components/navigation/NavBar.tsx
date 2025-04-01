import * as React from 'react';
import Link from 'next/link';
import Logo from '@/public/logo.png';
import Image from 'next/image';

import { ModeToggle } from '@/components/navigation/ModeToggle';
import { buttonVariants } from '@/components/ui/button';

import MobileNav from './MobileNav';
import NavBarAuthjs from './NavBarAuthjs';
// import NavBarKindeAuth from './NavBarKindeAuth';

export function NavBar() {
	return (
		<nav className="sticky top-0 z-50 w-full shadow-md bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex justify-between items-center py-5">
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
						href="/dashboard"
						className={buttonVariants({ variant: 'ghost' })}
						passHref>
						Dashboard
					</Link>
					<Link
						href="/shadcn-guild"
						className={buttonVariants({ variant: 'ghost' })}
						passHref>
						Shadcn Guild
					</Link>
					<ModeToggle />
					<NavBarAuthjs />
					{/* <NavBarKindeAuth /> */}
				</div>

				{/* Mobile Navigation */}
				<div className="md:hidden flex flex-col gap-4">
					<MobileNav />
				</div>
			</div>
		</nav>
	);
}
