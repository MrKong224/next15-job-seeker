'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Loader2, Mail, Eye } from 'lucide-react';
import { toast } from 'sonner';

export default function EmailJobsPage() {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSendTestEmail = async () => {
		if (!email) {
			toast.error('Please enter an email address');
			return;
		}

		try {
			setLoading(true);
			const response = await fetch(`/api/test-job-email?email=${encodeURIComponent(email)}`);
			const data = await response.json();

			if (data.error) {
				throw new Error(data.error);
			}

			toast.success('Test email sent successfully!');
		} catch (error) {
			console.error('Error sending test email:', error);
			toast.error('Failed to send test email');
		} finally {
			setLoading(false);
		}
	};

	const handlePreviewEmail = () => {
		// Open a new window to preview the email
		window.open('/api/test-job-email?preview=true', '_blank');
	};

	return (
		<div className="container mx-auto max-w-3xl py-8">
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Job Matching Email</CardTitle>
					<CardDescription>Test and preview the daily job matching email</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="flex flex-col space-y-2">
						<h3 className="text-lg font-medium">Send Test Email</h3>
						<div className="flex space-x-2">
							<Input
								placeholder="Enter email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								type="email"
								className="flex-1"
							/>
							<Button
								onClick={handleSendTestEmail}
								disabled={loading}>
								{loading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Sending...
									</>
								) : (
									<>
										<Mail className="mr-2 h-4 w-4" />
										Send Test
									</>
								)}
							</Button>
						</div>
					</div>

					<div className="flex flex-col space-y-2">
						<h3 className="text-lg font-medium">Preview Email</h3>
						<p className="text-sm text-muted-foreground">View how the email will appear to recipients</p>
						<Button
							variant="outline"
							onClick={handlePreviewEmail}>
							<Eye className="mr-2 h-4 w-4" />
							Preview Email Template
						</Button>
					</div>
				</CardContent>
				<CardFooter className="border-t p-4">
					<p className="text-sm text-muted-foreground">
						The test email uses sample job data that would match a user with React, TypeScript, and Next.js skills.
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
