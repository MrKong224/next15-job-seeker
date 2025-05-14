import { ModeToggle } from '@/components/navigation/ModeToggle';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function MobileNav() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex gap-2">
				<Link
					href="/email-jobs"
					className={buttonVariants({ variant: 'ghost', size: 'sm' })}
					passHref>
					Email Jobs
				</Link>
				<ModeToggle />
			</div>
		</div>
	);
}
