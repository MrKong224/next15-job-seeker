import { Button, buttonVariants } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, Layers, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { signOut } from '@/utils/auth';
import { GeneralSubmitButton } from '../general/SubmitButton';
import Image from 'next/image';

interface props {
	name: string;
	email: string;
	profileImage: string;
	avatarFallback: string;
}

export function UserDropDown({ name, email, profileImage, avatarFallback }: props) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				{profileImage ? (
					<>
						<div className="relative size-10 cursor-pointer overflow-hidden rounded-full">
							<Image
								src={profileImage}
								alt="Profile image"
								fill
								className="object-cover"
							/>
						</div>
					</>
				) : (
					<Button
						variant="ghost"
						className="h-auto p-0 hover:bg-transparent dark:hover:bg-transparent">
						<User />
					</Button>
				)}
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-48"
				align="center">
				<DropdownMenuLabel className="flex min-w-0 flex-col">
					<span className="truncate text-sm font-medium text-foreground capitalize">{name}</span>
					<span className="truncate text-xs text-muted-foreground">{email}</span>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Link
							href="/favorites"
							className="flex items-center gap-5 w-full">
							<Heart
								size={16}
								strokeWidth={2}
								className="opacity-60"
								aria-hidden="true"
							/>
							<span>Favorite Jobs</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Link
							href="/my-jobs"
							className="flex items-center gap-5 w-full">
							<Layers
								size={16}
								strokeWidth={2}
								className="opacity-60"
								aria-hidden="true"
							/>
							<span>My Job Listings</span>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<form
						action={async () => {
							'use server';
							await signOut({ redirectTo: '/' });
						}}
						className="w-full">
						<GeneralSubmitButton
							label="Logout"
							variant="outline"
							icon={<LogOut className="size-4" />}
						/>
					</form>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
