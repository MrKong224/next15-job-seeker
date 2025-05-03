import { formatCurrency } from '@/features/utils/formatCurrency';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';
import { Control, useController } from 'react-hook-form';

interface Props {
	control: Control;
	currency: string;
	minSalary: number;
	maxSalary: number;
	stepSalary: number;
}

export default function SalaryRangeSelector({ control, currency, minSalary, maxSalary, stepSalary }: Props) {
	const { field: fromField } = useController({
		control,
		name: 'salaryFrom',
	});

	const { field: toField } = useController({
		control,
		name: 'salaryTo',
	});

	const [range, setRange] = useState<[number, number]>([fromField.value || minSalary, toField.value || maxSalary / 2]);

	const handleRangeChange = (value: number[]) => {
		const newRange: [number, number] = [value[0], value[1]];
		setRange(newRange);
		fromField.onChange(newRange[0]);
		toField.onChange(newRange[1]);
	};

	return (
		<div className="w-full space-y-4">
			<Slider
				min={minSalary}
				max={maxSalary}
				step={stepSalary}
				value={range}
				onValueChange={handleRangeChange}
				className="py-4"
			/>
			<div className="flex justify-between">
				<span className="text-sm text-muted-foreground">{formatCurrency(range[0], currency)}</span>
				<span className="text-sm text-muted-foreground">{formatCurrency(range[1], currency)}</span>
			</div>
		</div>
	);
}
