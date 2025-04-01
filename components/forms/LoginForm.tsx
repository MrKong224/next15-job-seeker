import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import Github from '@/components/icons/Github';
import Google from '@/components/icons/Google';
import { auth, signIn } from '../../app/utils/auth';
import { GeneralSubmitButton } from '@/components/general/SubmitButton';
import { redirect } from 'next/navigation';

export async function LoginForm() {
	const session = await auth();

	if (session?.user) {
		redirect('/');
	}

	return (
		<div className="flex flex-col gap-6">
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Welcome back</CardTitle>
					<CardDescription>Login with your Google or Github account</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-4">
						<form
							action={async () => {
								'use server';
								await signIn('google', { redirectTo: '/' });
							}}>
							<GeneralSubmitButton
								icon={<Google className="size-4" />}
								label="Login with Google"
								variant="outline"
							/>
						</form>
						<form
							action={async () => {
								'use server';
								await signIn('github', { redirectTo: '/' });
							}}>
							<GeneralSubmitButton
								icon={<Github className="size-4" />}
								label="Login with Github"
								variant="outline"
							/>
						</form>
					</div>
				</CardContent>
			</Card>
			<div className="text-center text-sm">Click to view our service term and privacy policy</div>
		</div>
	);
}
