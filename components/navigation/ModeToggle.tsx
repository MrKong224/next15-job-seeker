'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export function ModeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Avoid hydration mismatch by only rendering after mounting on client
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<Button
			variant="outline"
			size="icon"
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			aria-label="Toggle theme">
			{theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
