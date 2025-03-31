import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export default function NavBarAuthjs() {
	return (
		<Link
			href="/login"
			className={buttonVariants({ variant: 'outline', size: 'lg' })}>
			Login
		</Link>
	);
}
