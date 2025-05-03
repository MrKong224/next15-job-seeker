import OnboardingForm from '@/app/onboarding/forms/OnboardingForm';
import { requireUser } from '@/utils/requireUser';
import { prisma } from '@/utils/db';
import { redirect } from 'next/navigation';

const hasFinishedOnBoarding = async (userId: string) => {
	const userInfo = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			onboardingCompleted: true,
		},
	});

	console.log('🚀 ~ hasFinishedOnBoarding ~ userInfo:', userInfo);

	return userInfo?.onboardingCompleted;
};
export default async function OnboardingPage() {
	const user = await requireUser();
	const hasFinished = await hasFinishedOnBoarding(user.id as string);

	if (hasFinished) {
		redirect('/dashboard');
	}

	return (
		<div className="min-h-screen w-screen flex flex-col items-center justify-center py-10 gap-10">
			<OnboardingForm />
		</div>
	);
}
