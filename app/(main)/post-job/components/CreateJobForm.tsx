'use client';

import { jobPostSchema } from '@/app/utils/zodSchemas';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
	companyName: string;
	companyAbout: string;
	companyLocation: string;
	companyWebsite: string;
}

export default function CreateJobForm({ companyName, companyAbout, companyLocation, companyWebsite }: Props) {
	const [pending, setPending] = useState(false);

	const form = useForm<z.infer<typeof jobPostSchema>>({
		resolver: zodResolver(jobPostSchema),
		defaultValues: {
			jobTitle: '',
			employmentType: '',
			location: '',
			salaryFrom: 0,
			salaryTo: 0,
			jobDescription: '',
			benefits: [],
			listingDuration: 30,
			status: 'DRAFT',
		},
	});

	const onSubmit = (data: z.infer<typeof jobPostSchema>) => {
		console.log(data);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl font-bold">Job information</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<FormField
								control={form.control}
								name="jobTitle"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Job Title</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="employmentType"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Employment Type</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												value={field.value}>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select employment type" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="FULLTIME">Full-time</SelectItem>
													<SelectItem value="PARTTIME">Part-time</SelectItem>
													<SelectItem value="CONTRACT">Contract</SelectItem>
													<SelectItem value="INTERNSHIP">Internship</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
					</CardContent>
				</Card>
				<Button
					type="submit"
					disabled={pending}>
					{pending ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Posting...
						</>
					) : (
						'Post Job'
					)}
				</Button>
			</form>
		</Form>
	);
}
