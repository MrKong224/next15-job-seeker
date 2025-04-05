import { NavBar } from '@/components/navigation/NavBar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="mx-auto px-4 md:px-6 lg:px-8 pb-12">
			<NavBar />
			{children}
			<div className="min-h-[2000px] bg-amber-900 my-5 rounded-4xl"></div>
			<footer className="min-h-96 bg-stone-900"></footer>
		</div>
	);
}
