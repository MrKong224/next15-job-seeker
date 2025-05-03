import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { jobSeekerSchema } from '@/utils/zodSchemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { UploadDropzone } from '@/utils/UploadThing';
import { XIcon } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import PDFImage from '@/public/pdf.png';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createJobSeeker } from '../../../action';

export default function JobSeekerForm() {
	const [pending, setPending] = useState(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof jobSeekerSchema>>({
		resolver: zodResolver(jobSeekerSchema),
		defaultValues: {
			about: '',
			resume: '',
			name: '',
			resumeFileName: '',
		},
	});

	const onSubmit = async (data: z.infer<typeof jobSeekerSchema>) => {
		try {
			setPending(true);
			await createJobSeeker(data);
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
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full name</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter your full name"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="about"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Bio</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Tell us about yourself ... "
									className="h-40"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="resume"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Resume (PDF)</FormLabel>
							<FormControl>
								<div>
									{field.value ? (
										<div className="relative w-fit">
											<Image
												src={PDFImage}
												alt="PDF resume"
												width={100}
												height={100}
												className="rounded-lg"
											/>
											<Button
												type="button"
												variant="destructive"
												size="icon"
												className="absolute -top-2 -right-2 "
												onClick={() => field.onChange('')}>
												<XIcon className="h-4 w-4" />
											</Button>
										</div>
									) : (
										<UploadDropzone
											endpoint="resumeUploader"
											className="border-primary ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/90 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground ut-button:px-3"
											onClientUploadComplete={(res) => {
												field.onChange(res[0].url);
												form.setValue('resumeFileName', res[0].name);
												toast.success('Resume uploaded successfully!');
												console.log('🚀 ~ JobSeekerForm ~ res:', res);
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
						'Submit'
					)}
				</Button>
			</form>
		</Form>
	);
}
