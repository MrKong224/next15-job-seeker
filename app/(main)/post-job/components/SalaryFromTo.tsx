import { formatCurrency } from '@/features/utils/formatCurrency';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Minus } from 'lucide-react';

interface iProps {
	salary: number;
	currency: string;
	onClickMinus: () => void;
	onClickPlus: () => void;
	disabledMinSalary: boolean;
	disabledMaxSalary: boolean;
}

export default function SalaryFromTo({
	salary,
	currency,
	onClickMinus,
	onClickPlus,
	disabledMinSalary,
	disabledMaxSalary,
}: iProps) {
	return (
		<div className="flex items-center gap-2">
			<Button
				variant="outline"
				size="icon-sm"
				onClick={onClickMinus}
				disabled={disabledMinSalary}
				type="button">
				<Minus className="h-4 w-4" />
			</Button>
			<span className="text-sm text-muted-foreground">{formatCurrency(salary, currency)}</span>
			<Button
				variant="outline"
				size="icon-sm"
				onClick={onClickPlus}
				disabled={disabledMaxSalary}
				type="button">
				<Plus className="h-4 w-4" />
			</Button>
		</div>
	);
}
