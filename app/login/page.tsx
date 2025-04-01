import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/public/logo.png';

import { LoginForm } from '@/components/forms/LoginForm';

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
				<LoginForm />
			</div>
		</div>
	);
}
