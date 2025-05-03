import { benefits } from '@/utils/benefitsList';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ControllerRenderProps } from 'react-hook-form';

interface iProps {
	field: ControllerRenderProps;
}

export const BenefitsSelector = ({ field }: iProps) => {
	const toggleBenefit = (benefitId: string) => {
		const existingBenefits = field.value || [];
		const newBenefits = existingBenefits.includes(benefitId)
			? existingBenefits.filter((id: string) => id !== benefitId)
			: [...existingBenefits, benefitId];

		field.onChange(newBenefits);
	};
	return (
		<div>
			<div className="flex flex-wrap gap-3">
				{benefits.map((benefit) => {
					const isSelected = (field.value || []).includes(benefit.id);
					return (
						<Badge
							variant={isSelected ? 'default' : 'outline'}
							key={benefit.id}
							onClick={() => toggleBenefit(benefit.id)}
							className="cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 select-none px-4 py-2 rounded-full">
							{benefit.icon}
							{benefit.label}
						</Badge>
					);
				})}
			</div>

			<Separator className="my-4" />

			<div className="mt-4 text-sm text-muted-foreground">
				Selected benefits: <span className="text-primary">{(field.value || []).length}</span>
			</div>
		</div>
	);
};
