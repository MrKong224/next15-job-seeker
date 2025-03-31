import { Button, buttonVariants } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, Layers, User } from 'lucide-react';
import Link from 'next/link';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';

interface props {
	name: string;
	email: string;
	profileImage: string;
	avatarFallback: string;
}

export function UserDropDown({ name, email, profileImage, avatarFallback }: props) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				{profileImage ? (
					<>
						<Avatar className="w-10 h-10 cursor-pointer">
							<AvatarImage
								src={profileImage}
								alt="Profile image"
							/>
							<AvatarFallback>{avatarFallback}</AvatarFallback>
						</Avatar>
					</>
				) : (
					<Button
						variant="outline"
						className="cursor-pointer">
						<User />
					</Button>
				)}
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-56"
				align="end">
				<DropdownMenuLabel className="flex min-w-0 flex-col">
					<span className="truncate text-sm font-medium text-foreground text-center">{email}</span>
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
							<span>Saved Jobs</span>
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
					<LogoutLink className={`${buttonVariants({ variant: 'outline' })} w-full`}>Sign out</LogoutLink>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
