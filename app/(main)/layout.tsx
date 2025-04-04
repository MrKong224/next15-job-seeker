import { NavBar } from '@/components/navigation/NavBar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<NavBar />
			{children}
			<div className="min-h-[2000px] bg-stone-700"></div>
			<footer className="min-h-96 bg-stone-900"></footer>
		</>
	);
}
