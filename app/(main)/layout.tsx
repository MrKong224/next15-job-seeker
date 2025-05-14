import { NavBar } from '@/components/navigation/NavBar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<NavBar />
			<div className="px-4 md:px-6 lg:px-8 pb-12">{children}</div>
		</div>
	);
}
