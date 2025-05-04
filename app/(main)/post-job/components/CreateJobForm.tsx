'use client';

import { jobPostSchema } from '@/features/utils/zodSchemas';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Control, useForm, ControllerRenderProps } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import {
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectGroup,
	SelectLabel,
} from '@/components/ui/select';
import { countryList } from '@/features/utils/countriesList';
import SalaryRangeSelector from './SalaryRangeSelector';
import TextEditor from '@/components/richTextEditor/TextEditor';
import { BenefitsSelector } from './BenefitsSelector';
import { JobListingDuration } from './JobListingDuration';
import { createJobPost } from '@/features/action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { EEmploymentType, EJobPostStatus } from '@/types';

export default function CreateJobForm() {
	const router = useRouter();
	const [pending, setPending] = useState(false);

	const form = useForm<z.infer<typeof jobPostSchema>>({
		resolver: zodResolver(jobPostSchema),
		defaultValues: {
			jobTitle: '',
			employmentType: EEmploymentType.FULLTIME,
			location: '',
			salaryFrom: 0,
			salaryTo: 0,
			jobDescription: '',
			benefits: [],
			listingDuration: 30,
			status: EJobPostStatus.DRAFT,
		},
	});

	const onSubmit = async (data: z.infer<typeof jobPostSchema>) => {
		try {
			setPending(true);
			console.log(data);
			// await createJobPost(data);
			// router.push('/dashboard');
			// toast.success('Job posted successfully');
		} catch (error) {
			console.log(error);
			if (error instanceof Error && error.message !== 'NEXT_REDIRECT') {
				toast.error(error.message);
			} else {
				toast.error('Something went wrong. Please try again.');
			}
		} finally {
			setPending(false);
		}
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
					<CardContent className="space-y-6">
						<div className="grid md:grid-cols-2 gap-6">
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
						<div className="grid md:grid-cols-2 gap-6">
							<FormField
								control={form.control}
								name="location"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Location</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												value={field.value}>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select location" />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectLabel>Worldwide</SelectLabel>
														<SelectItem
															value="WORLDWIDE"
															className="flex items-center gap-2">
															<span>🌍</span>
															<span>Worldwide / Remote</span>
														</SelectItem>
													</SelectGroup>
													<SelectGroup>
														<SelectLabel>Location</SelectLabel>
														{countryList.map((country) => (
															<SelectItem
																key={country.code}
																value={country.code}
																className="flex items-center gap-2">
																<span>{country.flagEmoji}</span>
																<span>{country.name}</span>
															</SelectItem>
														))}
													</SelectGroup>
												</SelectContent>
											</Select>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormItem>
								<FormLabel>Salary Range</FormLabel>
								<FormControl>
									<SalaryRangeSelector
										control={form.control as unknown as Control}
										currency="THB"
										minSalary={15000}
										maxSalary={500000}
										stepSalary={1000}
									/>
								</FormControl>
								<FormMessage>
									{form.formState.errors.salaryFrom?.message || form.formState.errors.salaryTo?.message}
								</FormMessage>
							</FormItem>
						</div>
						<div className="grid gap-6">
							<FormField
								control={form.control}
								name="jobDescription"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Job Description</FormLabel>
										<FormControl>
											<TextEditor field={field as unknown as ControllerRenderProps} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}></FormField>

							<FormField
								control={form.control}
								name="benefits"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Benefits</FormLabel>
										<FormControl>
											<BenefitsSelector field={field as unknown as ControllerRenderProps} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}></FormField>
						</div>
						<div className="grid md:grid-cols-2 gap-6"></div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-2xl font-bold">Job Duration</CardTitle>
					</CardHeader>
					<CardContent>
						<FormField
							control={form.control}
							name="listingDuration"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<JobListingDuration field={field as unknown as ControllerRenderProps} />
									</FormControl>
								</FormItem>
							)}></FormField>
					</CardContent>
				</Card>

				<Button
					type="submit"
					size={'lg'}
					className="w-full"
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
