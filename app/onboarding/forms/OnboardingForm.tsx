'use client';
import Image from 'next/image';
import Logo from '@/public/logo.png';
import { Card, CardTitle, CardHeader, CardContent } from '../../../components/ui/card';
import { useState } from 'react';
import { TUserType } from '@/types';
import UserTypeSelectionForm from './UserTypeSelectionForm';
import CompanyForm from './CompanyForm';
import JobSeekerForm from './JobSeekerForm';

export default function OnboardingForm() {
	const [step, setStep] = useState(1);
	const [userType, setUserType] = useState<TUserType>(null);

	const handleUserTypeChange = (type: TUserType) => {
		setUserType(type);
		setStep(step + 1);
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
			<Card className="w-full max-w-lg">
				<CardContent>
					<div className="flex flex-col gap-4">{renderStep()}</div>
				</CardContent>
			</Card>
		</>
	);
}
