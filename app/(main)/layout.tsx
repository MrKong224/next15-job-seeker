import { NavBar } from '@/components/navigation/NavBar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<NavBar />
			{children}
		</div>
	);
}
