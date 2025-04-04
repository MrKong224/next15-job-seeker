import { Button } from '@/components/ui/button';
import { TUserType } from '@/types';
import { UserType } from '@prisma/client';
import { Building2, User2 } from 'lucide-react';

interface props {
	onSelect: (type: TUserType) => void;
}

const COMPANY: UserType = 'COMPANY';
const JOB_SEEKER: UserType = 'JOB_SEEKER';

export default function UserTypeSelectionForm({ onSelect }: props) {
	return (
		<div className="space-y-8">
			<div className="text-center space-y-2">
				<h2 className="text-2xl font-bold ">Let's get started</h2>
				<p className="text-muted-foreground">Choose your role in our platform</p>
			</div>
			<div className="grid gap-4">
				<Button
					onClick={() => onSelect(COMPANY)}
					variant="outline"
					className="w-full h-auto p-6 flex items-center gap-4 border-2 bg-background transition-all duration-200 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/5 dark:hover:border-primary ">
					<div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
						<Building2 className="size-6 text-primary" />
					</div>
					<div className="text-left">
						<h3 className="text-lg font-semibold">Company / Organization</h3>
						<p className="text-xs text-muted-foreground">Post jobs and find candidates for your organization.</p>
					</div>
				</Button>
				<Button
					onClick={() => onSelect(JOB_SEEKER)}
					variant="outline"
					className="w-full h-auto p-6 flex items-center gap-4 border-2 bg-background transition-all duration-200 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/5 dark:hover:border-primary ">
					<div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
						<User2 className="size-6 text-primary" />
					</div>
					<div className="text-left">
						<h3 className="text-lg font-semibold">Job Seeker</h3>
						<p className="text-xs text-muted-foreground">Find your dream job opportunities.</p>
					</div>
				</Button>
			</div>
		</div>
	);
}
