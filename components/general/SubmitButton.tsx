'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

interface GeneralSubmitButtonProps {
	label: string;
	icon?: React.ReactNode;
	variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
	width?: string;
}

export function GeneralSubmitButton({ label, icon, variant = 'default', width = 'w-full' }: GeneralSubmitButtonProps) {
	const { pending } = useFormStatus();

	return (
		<Button
			disabled={pending}
			type="submit"
			className={width}
			variant={variant}>
			{pending ? (
				<>
					<Loader2 className="size-4 animate-spin" />
					Logging in...
				</>
			) : (
				<>
					{icon && <div className="size-4">{icon}</div>}
					<span>{label}</span>
				</>
			)}
		</Button>
	);
}
