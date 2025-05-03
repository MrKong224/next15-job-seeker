import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { jobDurationPricing } from '@/utils/jobDurationPricing';
import { Card } from '@/components/ui/card';
import { ControllerRenderProps } from 'react-hook-form';

interface iProps {
	field: ControllerRenderProps;
}

export const JobListingDuration = ({ field }: iProps) => {
	return (
		<div>
			<RadioGroup
				value={field.value?.toString()}
				onValueChange={(value) => field.onChange(parseInt(value))}>
				<div className="flex flex-col gap-5">
					{jobDurationPricing.map((duration) => (
						<div
							key={duration.days}
							className="flex items-center space-x-2">
							<RadioGroupItem
								value={duration.days.toString()}
								id={duration.days.toString()}
								className="peer sr-only"
							/>
							<Label
								htmlFor={duration.days.toString()}
								className="flex flex-col cursor-pointer w-full">
								<Card
									className={`p-4 border-2 transition-all w-full ${
										field.value === duration.days ? 'border-primary bg-primary/10' : 'hover:bg-secondary/50'
									}`}>
									<div className="flex justify-between items-center gap-4">
										<div>
											<p className="font-semibold text-lg">{duration.days} Days</p>
											<p className="text-sm text-muted-foreground">{duration.description}</p>
										</div>
										<div className="text-right">
											<p className="font-bold text-xl">${duration.price}</p>
											<p className="text-sm text-muted-foreground">
												${(duration.price / duration.days).toFixed(2)}/day
											</p>
										</div>
									</div>
								</Card>
							</Label>
						</div>
					))}
				</div>
			</RadioGroup>
		</div>
	);
};
