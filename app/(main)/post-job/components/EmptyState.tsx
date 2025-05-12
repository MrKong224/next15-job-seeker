import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Ban, PlusCircle } from 'lucide-react';
import Link from 'next/link';

interface iProp {
	title: string;
	description: string;
	href: string;
	buttonText: string;
}

export default function EmptyState({ title, description, href, buttonText }: iProp) {
	return (
		<div className="flex flex-col flex-1 h-full items-center justify-center border border-dashed rounded-md p-8 animate-in fade-in-10">
			<div className="flex size-20 items-center justify-center bg-primary/10 rounded-full">
				<Ban className="size-10 text-primary" />
			</div>
			<h2 className="mt-6 text-xl font-semibold">{title}</h2>
			<p className="mb-8 mt-2 text-center text-sm leading-tight text-muted-foreground max-w-md mx-auto">
				{description}
			</p>
			<Link
				href={href}
				className={cn(buttonVariants({ variant: 'outline' }), 'flex items-center gap-2')}>
				<PlusCircle className="size-4" />
				{buttonText}
			</Link>
		</div>
	);
}
