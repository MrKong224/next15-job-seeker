import { formatCurrency } from '@/features/utils/formatCurrency';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';
import { Control, useController } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import SalaryFromTo from './SalaryFromTo';

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

	const incrementRange = (index: number) => {
		const salaryFrom = index === 0 ? Math.min(range[0] + stepSalary, range[1]) : range[0];
		const salaryTo = index === 1 ? Math.min(range[1] + stepSalary, maxSalary) : range[1];
		setRange([salaryFrom, salaryTo]);
		fromField.onChange(salaryFrom);
		toField.onChange(salaryTo);
	};
	const decrementRange = (index: number) => {
		const salaryFrom = index === 0 ? Math.max(range[0] - stepSalary, minSalary) : range[0];
		const salaryTo = index === 1 ? Math.max(range[1] - stepSalary, range[0]) : range[1];
		setRange([salaryFrom, salaryTo]);
		fromField.onChange(salaryFrom);
		toField.onChange(salaryTo);
	};

	return (
		<div className="w-full">
			<Slider
				min={minSalary}
				max={maxSalary}
				step={stepSalary}
				value={range}
				onValueChange={handleRangeChange}
				className="py-4 flex-1"
			/>
			<div className="flex justify-between">
				<SalaryFromTo
					salary={range[0]}
					currency={currency}
					onClickMinus={() => decrementRange(0)}
					onClickPlus={() => incrementRange(0)}
					disabledMinSalary={range[0] <= minSalary}
					disabledMaxSalary={range[0] >= range[1]}
				/>
				<SalaryFromTo
					salary={range[1]}
					currency={currency}
					onClickMinus={() => decrementRange(1)}
					onClickPlus={() => incrementRange(1)}
					disabledMinSalary={range[1] <= range[0]}
					disabledMaxSalary={range[1] >= maxSalary}
				/>
			</div>
		</div>
	);
}
