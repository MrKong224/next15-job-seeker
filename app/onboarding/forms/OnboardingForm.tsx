'use client';
import Image from 'next/image';
import Logo from '@/public/logo.png';
import { Card, CardTitle, CardHeader, CardContent } from '../../../components/ui/card';
import { useState } from 'react';
import { TUserType } from '@/types';
import UserTypeSelectionForm from './UserTypeSelectionForm';
import CompanyForm from './CompanyForm';
import JobSeekerForm from './JobSeekerForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function OnboardingForm() {
	const [step, setStep] = useState(1);
	const [userType, setUserType] = useState<TUserType>(null);

	const handleUserTypeChange = (type: TUserType) => {
		setUserType(type);
		setStep(step + 1);
	};

	const handleBack = () => {
		setUserType(null);
		setStep(1);
	};

	const renderStep = () => {
		switch (step) {
			case 1:
				return <UserTypeSelectionForm onSelect={handleUserTypeChange} />;
			case 2:
				return userType === 'COMPANY' ? <CompanyForm /> : <JobSeekerForm />;
			default:
				return null;
		}
	};

	return (
		<>
			<div className="flex items-center gap-4">
				<div className="relative size-12 overflow-hidden rounded-full">
					<Image
						src={Logo}
						alt="Logo"
						fill
						className="object-cover"
					/>
				</div>
				<div className="text-4xl font-bold uppercase">Seeker</div>
			</div>
			<div className="w-full max-w-xl">
				{step > 1 && (
					<Button
						type="button"
						variant="link"
						className="w-fit text-muted-foreground hover:text-foreground hover:no-underline"
						onClick={() => handleBack()}>
						<ArrowLeft className="h-4 w-4" />
						Back
					</Button>
				)}
				<Card className="w-full max-w-xl">
					<CardContent>
						<div className="flex flex-col gap-4">{renderStep()}</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
