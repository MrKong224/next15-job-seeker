import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { jobSeekerSchema } from '@/app/utils/zodSchemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function JobSeekerForm() {
	const form = useForm<z.infer<typeof jobSeekerSchema>>({
		resolver: zodResolver(jobSeekerSchema),
		defaultValues: {
			about: '',
			resume: '',
			name: '',
		},
	});

	const onSubmit = (values: z.infer<typeof jobSeekerSchema>) => {
		console.log(values);
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
									placeholder="John Doe"
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
							<FormLabel>About</FormLabel>
							<FormControl>
								<Textarea
									placeholder="I am a software engineer..."
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
							<FormControl></FormControl>
						</FormItem>
					)}
				/>

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
