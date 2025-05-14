'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { XIcon } from 'lucide-react';
import { EEmploymentType } from '@/features/types';
import { Checkbox } from '@/components/ui/checkbox';
import SelectJobLocation from '@/components/general/SelectJobLocation';
import { useCallback, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function JobFilter() {
	const employmentTypes = Object.values(EEmploymentType);

	const router = useRouter();
	const searchParams = useSearchParams();
	const [jobTypes, setJobTypes] = useState<string[]>([]);
	const [location, setLocation] = useState<string>('');
	// const [salaryRange, setSalaryRange] = useState<{ min: number | null; max: number | null }>({
	// 	min: 0,
	// 	max: 500000,
	// });

	// Get current filters from URL
	useEffect(() => {
		const qJobTypes = searchParams.get('jobTypes')?.split(',') || [];
		const qLocation = searchParams.get('location') || '';
		// const qMinSalary = searchParams.get('minSalary') || null;
		// const qMaxSalary = searchParams.get('maxSalary') || null;

		setJobTypes(qJobTypes);
		setLocation(qLocation);
		// setSalaryRange({ min: qMinSalary ? parseInt(qMinSalary) : null, max: qMaxSalary ? parseInt(qMaxSalary) : null });
	}, [searchParams]);

	const handleChangeJobType = (type: string, checked: boolean) => {
		const currentType = new Set(jobTypes);
		if (checked) {
			currentType.add(type);
		} else {
			currentType.delete(type);
		}

		const updatedJobTypes = Array.from(currentType);
		setJobTypes(updatedJobTypes);
	};

	const onHandleClear = () => {
		router.push('/');
	};

	const handleApplyFilters = () => {
		const params = new URLSearchParams(searchParams.toString());

		if (jobTypes.length) {
			params.set('jobTypes', jobTypes.join(','));
		} else {
			params.delete('jobTypes');
		}

		if (location) {
			params.set('location', location);
		} else {
			params.delete('location');
		}

		// if (salaryRange.min) {
		// 	params.set('minSalary', salaryRange.min.toString());
		// } else {
		// 	params.delete('minSalary');
		// }

		// if (salaryRange.max) {
		// 	params.set('maxSalary', salaryRange.max.toString());
		// } else {
		// 	params.delete('maxSalary');
		// }

		router.push(`?${params.toString()}`);
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex justify-between items-center">
					<CardTitle className="text-2xl font-bold">Job Filter</CardTitle>
					<Button
						variant="destructive"
						size="sm"
						onClick={onHandleClear}>
						Clear all
						<XIcon className="w-4 h-4" />
					</Button>
				</div>
			</CardHeader>
			<Separator />
			<CardContent>
				<div>
					<Label className="text-lg mb-2 font-semibold">Job Type</Label>
					{employmentTypes.map((type) => (
						<div
							key={type}
							className="flex items-center space-x-2 ml-4">
							<Checkbox
								id={type}
								checked={jobTypes.includes(type)}
								onCheckedChange={(checked) => handleChangeJobType(type, checked as boolean)}
							/>
							<label
								htmlFor={type}
								className="font-medium">
								{type}
							</label>
						</div>
					))}
				</div>
				<Separator className="my-4" />
				<div>
					<Label className="text-lg mb-2 font-semibold">Location</Label>
					<div className="ml-4">
						<SelectJobLocation
							onChange={(newLocation) => setLocation(newLocation)}
							value={location}
						/>
					</div>
				</div>
				<Separator className="my-4" />
				<div>
					<Label className="text-lg mb-2 font-semibold">Salary Range</Label>
					<div className="ml-4 flex items-center gap-4">
						<div>
							<Label className="text-sm mb-2 font-semibold">Min</Label>
							<Input
								type="number"
								placeholder="0"
								className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
								// onChange={(e) =>
								// 	setSalaryRange({ ...salaryRange, min: e.target.value ? parseInt(e.target.value) : null })
								// }
							/>
						</div>
						<div>
							<Label className="text-sm mb-2 font-semibold">Max</Label>
							<Input
								type="number"
								placeholder="500,000"
								className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
								// onChange={(e) =>
								// 	setSalaryRange({ ...salaryRange, max: e.target.value ? parseInt(e.target.value) : null })
								// }
							/>
						</div>
					</div>
				</div>
				<Separator className="my-4" />

				<Button
					className="w-full"
					onClick={handleApplyFilters}>
					Apply
				</Button>
			</CardContent>
		</Card>
	);
}
