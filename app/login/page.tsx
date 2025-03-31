import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/public/logo.png';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import Github from '@/components/icons/Githubs';
import Google from '@/components/icons/Google';

export default function LoginPage() {
	return (
		<div className="min-h-screen w-screen flex items-center justify-center">
			<div className="flex flex-col gap-6 w-full max-w-sm">
				<Link
					href="/"
					className="flex items-center gap-2 self-center">
					<div className="relative h-10 w-10 overflow-hidden">
						<Image
							src={Logo}
							alt="Job Seeker Logo"
							fill
							className="object-cover"
						/>
					</div>
					<h1 className="text-2xl font-bold text-primary uppercase">Seeker</h1>
				</Link>
				<Card>
					<CardHeader className="text-center">
						<CardTitle className="text-xl">Welcome back</CardTitle>
						<CardDescription>Login with your Google or Github account</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col gap-4">
							<Button
								className="w-full"
								variant="outline">
								<Google className="size-4" />
								Login with Google
							</Button>
							<Button
								className="w-full"
								variant="outline">
								<Github className="size-4" />
								Login with Github
							</Button>
						</div>
					</CardContent>
				</Card>
				<div className="text-center text-sm">Click to view our service term and privacy policy</div>
			</div>
		</div>
	);
}
