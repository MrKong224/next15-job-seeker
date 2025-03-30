import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ModeToggle } from '@/components/navigation/ModeToggle';

export default function ShadcnGuildPage() {
	return (
		<div className="container mx-auto py-10 px-4">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold">Shadcn UI Components</h1>
				<ModeToggle />
			</div>

			<div className="grid gap-8 md:grid-cols-2">
				{/* Color Section */}
				<Card>
					<CardHeader>
						<CardTitle>Colors</CardTitle>
						<CardDescription>Various color styles</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-4">
						<p className="text-base text-primary">This is a primary color</p>
						<p className="text-base text-secondary">This is a secondary color</p>
						<p className="text-base text-muted-foreground">This is a muted foreground color</p>
						<p className="text-base text-foreground">This is a foreground color</p>
						<p className="text-base text-background">This is a background color</p>
						<p className="text-base text-card">This is a card color</p>
						<p className="text-base text-card-foreground">This is a card foreground color</p>
						<p className="text-base text-muted">This is a muted color</p>
						<p className="text-base text-accent">This is an accent color</p>
						<p className="text-base text-accent-foreground">This is an accent foreground color</p>
						<p className="text-base text-ring">This is a ring color</p>
						<p className="text-base text-border">This is a border color</p>
						<p className="text-base text-input">This is an input color</p>
						<p className="text-base text-ring">This is a ring color</p>
						<p className="text-base text-border">This is a border color</p>
						<p className="text-base text-input">This is an input color</p>
						<p className="text-base text-sidebar">This is a sidebar color</p>
						<p className="text-base text-sidebar-foreground">This is a sidebar foreground color</p>
						<p className="text-base text-sidebar-primary">This is a sidebar primary color</p>
						<p className="text-base text-sidebar-primary-foreground">This is a sidebar primary foreground color</p>
						<p className="text-base text-sidebar-accent">This is a sidebar accent color</p>
						<p className="text-base text-sidebar-accent-foreground">This is a sidebar accent foreground color</p>
						<p className="text-base text-sidebar-border">This is a sidebar border color</p>
						<p className="text-base text-sidebar-ring">This is a sidebar ring color</p>
						<p className="text-base text-sidebar-background">This is a sidebar background color</p>
						<p className="text-base text-sidebar-foreground">This is a sidebar foreground color</p>
						<p className="text-base text-sidebar-primary">This is a sidebar primary color</p>
						<p className="text-base text-sidebar-primary-foreground">This is a sidebar primary foreground color</p>
						<p className="text-base text-sidebar-accent">This is a sidebar accent color</p>
					</CardContent>
				</Card>

				{/* Buttons Section */}
				<Card>
					<CardHeader>
						<CardTitle>Buttons</CardTitle>
						<CardDescription>Various button styles with shadcn/ui</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-wrap gap-3">
						<Button variant="default">Default</Button>
						<Button variant="destructive">Destructive</Button>
						<Button variant="outline">Outline</Button>
						<Button variant="secondary">Secondary</Button>
						<Button variant="ghost">Ghost</Button>
						<Button variant="link">Link</Button>
					</CardContent>
				</Card>

				{/* Button Sizes */}
				<Card>
					<CardHeader>
						<CardTitle>Button Sizes</CardTitle>
						<CardDescription>Different button sizes</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-4">
						<div className="flex items-center gap-3">
							<Button size="sm">Small</Button>
							<Button size="default">Default</Button>
							<Button size="lg">Large</Button>
						</div>
						<div className="flex items-center gap-3">
							<Button
								size="icon"
								variant="outline">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="lucide lucide-plus">
									<path d="M5 12h14" />
									<path d="M12 5v14" />
								</svg>
							</Button>
							<Button
								size="icon"
								variant="secondary">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="lucide lucide-heart">
									<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
								</svg>
							</Button>
						</div>
					</CardContent>
				</Card>

				{/* Input Fields */}
				<Card>
					<CardHeader>
						<CardTitle>Input Fields</CardTitle>
						<CardDescription>Various input field styles</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-4">
						<Input placeholder="Default input" />
						<Input
							placeholder="Disabled input"
							disabled
						/>
						<div className="flex gap-2">
							<Input placeholder="First name" />
							<Input placeholder="Last name" />
						</div>
						<div className="relative">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="lucide lucide-search absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
								<circle
									cx="11"
									cy="11"
									r="8"
								/>
								<path d="m21 21-4.3-4.3" />
							</svg>
							<Input
								className="pl-8"
								placeholder="Search..."
							/>
						</div>
					</CardContent>
				</Card>

				{/* Theme Toggle */}
				<Card>
					<CardHeader>
						<CardTitle>Theme Toggle</CardTitle>
						<CardDescription>Toggle between light and dark mode</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-4">
						<div className="flex items-center justify-between p-4 border rounded-lg">
							<div>
								<h3 className="font-medium">Dark Mode</h3>
								<p className="text-sm text-muted-foreground">Toggle between light and dark mode</p>
							</div>
							<ModeToggle />
						</div>
						<div className="p-4 bg-primary text-primary-foreground rounded-lg">
							<p>This element uses primary colors</p>
						</div>
						<div className="p-4 bg-secondary text-secondary-foreground rounded-lg">
							<p>This element uses secondary colors</p>
						</div>
					</CardContent>
				</Card>

				{/* Card Examples */}
				<Card>
					<CardHeader>
						<CardTitle>Card Examples</CardTitle>
						<CardDescription>Nested card examples with different styles</CardDescription>
					</CardHeader>
					<CardContent className="gap-4 grid">
						<Card>
							<CardHeader className="p-4">
								<CardTitle className="text-lg">Account</CardTitle>
							</CardHeader>
							<CardContent className="p-4 pt-0">
								<p className="text-sm text-muted-foreground">Update your account settings.</p>
							</CardContent>
							<CardFooter className="p-4 pt-0">
								<Button
									variant="outline"
									size="sm">
									Save changes
								</Button>
							</CardFooter>
						</Card>

						<Card>
							<CardHeader className="p-4 bg-primary text-primary-foreground rounded-t-md">
								<CardTitle className="text-lg">Premium Plan</CardTitle>
							</CardHeader>
							<CardContent className="p-4">
								<p className="text-sm text-muted-foreground">$9.99/month</p>
							</CardContent>
							<CardFooter className="p-4 pt-0">
								<Button size="sm">Subscribe</Button>
							</CardFooter>
						</Card>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
