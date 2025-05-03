import { NavBar } from '@/components/navigation/NavBar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="mx-auto px-4 md:px-6 lg:px-8 pb-12">
			<NavBar />
			{children}
		</div>
	);
}
