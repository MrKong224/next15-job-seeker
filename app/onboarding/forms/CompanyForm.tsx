import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { companySchema } from '@/utils/zodSchemas';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { countryList } from '@/utils/countriesList';
import { Textarea } from '@/components/ui/textarea';
import { UploadDropzone } from '@/utils/UploadThing';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Image from 'next/image';
import { XIcon, Loader2 } from 'lucide-react';
import { createCompany } from '../../../action';
import { useRouter } from 'next/navigation';

export default function CompanyForm() {
	const [pending, setPending] = useState(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof companySchema>>({
		resolver: zodResolver(companySchema),
		defaultValues: {
			name: '',
			location: '',
			about: '',
			logo: '',
			website: '',
			xAccount: '',
		},
	});

	const onSubmit = async (data: z.infer<typeof companySchema>) => {
		try {
			setPending(true);
			await createCompany(data);
			router.push('/dashboard');
			toast.success('Company created successfully!');
		} catch (error) {
			console.log(error);
			if (error instanceof Error && error.message !== 'NEXT_REDIRECT') {
				toast.error('Something went wrong. Please try again.');
			}
			toast.error('Something went wrong. Please try again.');
		} finally {
			setPending(false);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Company name</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter company name"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="location"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Location</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select a location" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Worldwide</SelectLabel>
											<SelectItem value="WORLDWIDE">
												<span>🌍</span>
												<span className="pl-2">Worldwide / Remote</span>
											</SelectItem>
										</SelectGroup>
										<SelectGroup>
											<SelectLabel>Location</SelectLabel>
											{countryList.map((country) => (
												<SelectItem
													key={country.code}
													value={country.code}>
													<span>{country.flagEmoji}</span>
													<span className="pl-2">{country.name}</span>
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name="website"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Website</FormLabel>
								<FormControl>
									<Input
										placeholder="https://yourcompany.com"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="xAccount"
						render={({ field }) => (
							<FormItem>
								<FormLabel>X (Twitter) Account</FormLabel>
								<FormControl>
									<Input
										placeholder="@yourcompany"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="grid grid-cols-1 gap-6">
					<FormField
						control={form.control}
						name="about"
						render={({ field }) => (
							<FormItem>
								<FormLabel>About</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Enter company description"
										className="h-40"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="logo"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Logo</FormLabel>
								<FormControl>
									<div>
										{field.value ? (
											<div className="relative w-fit">
												<div className="relative size-100 rounded-lg overflow-hidden">
													<Image
														src={field.value}
														alt="Company logo"
														fill
														className="object-cover"
													/>
												</div>
												<Button
													type="button"
													variant="destructive"
													size="icon"
													className="absolute -top-2 right-2 "
													onClick={() => field.onChange('')}>
													<XIcon className="h-4 w-4" />
												</Button>
											</div>
										) : (
											<UploadDropzone
												endpoint="imageUploader"
												className="border-primary ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/90 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground ut-button:px-3"
												onClientUploadComplete={(res) => {
													field.onChange(res[0].url);
													toast.success('Logo uploaded successfully!');
												}}
												onUploadError={() => {
													toast.error('Something went wrong. Please try again.');
												}}
											/>
										)}
									</div>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
				<Button
					type="submit"
					className="w-full"
					disabled={pending}>
					{pending ? (
						<>
							<Loader2 className="h-4 w-4 animate-spin" />
							<span>Submitting...</span>
						</>
					) : (
						'Continue'
					)}
				</Button>
			</form>
		</Form>
	);
}
