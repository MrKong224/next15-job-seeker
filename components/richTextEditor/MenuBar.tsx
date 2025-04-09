import { Editor } from '@tiptap/react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Toggle } from '@/components/ui/toggle';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import {
	Bold,
	Heading1,
	Heading2,
	Heading3,
	Italic,
	Redo,
	Strikethrough,
	Undo,
	List,
	ListOrdered,
	AlignLeft,
	AlignCenter,
	AlignRight,
	Link,
} from 'lucide-react';

interface iProps {
	editor: Editor | null;
}

export default function MenuBar({ editor }: iProps) {
	if (!editor) return null;

	const setLink = () => {
		const url = window.prompt('Enter the URL');
		if (url) {
			editor.chain().focus().setLink({ href: url }).run();
		}
	};

	return (
		<div className="border border-border rounded-t-lg p-2 bg-card flex flex-wrap gap-1 items-center">
			<TooltipProvider>
				<div className="flex flex-wrap items-center gap-1">
					{/* Bold */}
					<Tooltip>
						<TooltipTrigger asChild>
							<Toggle
								size="sm"
								pressed={editor.isActive('bold')}
								onPressedChange={() => editor.chain().focus().toggleBold().run()}
								aria-label="Toggle bold"
								className={cn(editor.isActive('bold') && 'bg-muted text-secondary-foreground')}>
								<Bold className="h-4 w-4" />
							</Toggle>
						</TooltipTrigger>
						<TooltipContent>
							<p>Bold</p>
						</TooltipContent>
					</Tooltip>

					{/* Italic */}
					<Tooltip>
						<TooltipTrigger asChild>
							<Toggle
								size="sm"
								pressed={editor.isActive('italic')}
								onPressedChange={() => editor.chain().focus().toggleItalic().run()}
								aria-label="Toggle italic"
								className={cn(editor.isActive('italic') && 'bg-muted text-secondary-foreground')}>
								<Italic className="h-4 w-4" />
							</Toggle>
						</TooltipTrigger>
						<TooltipContent>
							<p>Italic</p>
						</TooltipContent>
					</Tooltip>

					{/* Strike */}
					<Tooltip>
						<TooltipTrigger asChild>
							<Toggle
								size="sm"
								pressed={editor.isActive('toggleStrike')}
								onPressedChange={() => editor.chain().focus().toggleStrike().run()}
								aria-label="Toggle strikethrough"
								className={cn(editor.isActive('toggleStrike') && 'bg-muted text-secondary-foreground')}>
								<Strikethrough className="h-4 w-4" />
							</Toggle>
						</TooltipTrigger>
						<TooltipContent>
							<p>toggleStrike</p>
						</TooltipContent>
					</Tooltip>
				</div>

				<div className="w-px h-6 bg-border mx-2" />

				<div className="flex flex-wrap items-center gap-1">
					<Tooltip>
						<TooltipTrigger asChild>
							<Toggle
								size="sm"
								pressed={editor.isActive('heading', { level: 1 })}
								onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
								className={cn(editor.isActive('heading', { level: 1 }) && 'bg-muted text-muted-foreground')}>
								<Heading1 className="h-4 w-4" />
							</Toggle>
						</TooltipTrigger>
						<TooltipContent>Heading 1</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Toggle
								size="sm"
								pressed={editor.isActive('heading', { level: 2 })}
								onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
								className={cn(editor.isActive('heading', { level: 2 }) && 'bg-muted text-muted-foreground')}>
								<Heading2 className="h-4 w-4" />
							</Toggle>
						</TooltipTrigger>
						<TooltipContent>Heading 2</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Toggle
								size="sm"
								pressed={editor.isActive('heading', { level: 3 })}
								onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
								className={cn(editor.isActive('heading', { level: 3 }) && 'bg-muted text-muted-foreground')}>
								<Heading3 className="h-4 w-4" />
							</Toggle>
						</TooltipTrigger>
						<TooltipContent>Heading 3</TooltipContent>
					</Tooltip>
				</div>

				<div className="w-px h-6 bg-border mx-2" />

				<div className="flex flex-wrap gap-1">
					{/* Bullet List */}
					<Tooltip>
						<TooltipTrigger asChild>
							<Toggle
								size="sm"
								pressed={editor.isActive('bulletList')}
								onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
								className={cn(editor.isActive('bulletList') && 'bg-muted text-muted-foreground')}>
								<List className="h-4 w-4" />
							</Toggle>
						</TooltipTrigger>
						<TooltipContent>Bullet List</TooltipContent>
					</Tooltip>

					{/* Ordered List */}
					<Tooltip>
						<TooltipTrigger asChild>
							<Toggle
								size="sm"
								pressed={editor.isActive('orderedList')}
								onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
								className={cn(editor.isActive('orderedList') && 'bg-muted text-muted-foreground')}>
								<ListOrdered className="h-4 w-4" />
							</Toggle>
						</TooltipTrigger>
						<TooltipContent>Ordered List</TooltipContent>
					</Tooltip>
				</div>

				<div className="w-px h-6 bg-border mx-2" />

				<div className="flex flex-wrap gap-1">
					{/* Align Left */}
					<Tooltip>
						<TooltipTrigger asChild>
							<Toggle
								size="sm"
								pressed={editor.isActive({ textAlign: 'left' })}
								onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}
								className={cn(editor.isActive({ textAlign: 'left' }) && 'bg-muted text-muted-foreground')}>
								<AlignLeft className="h-4 w-4" />
							</Toggle>
						</TooltipTrigger>
						<TooltipContent>Align Left</TooltipContent>
					</Tooltip>

					{/* Align Center */}
					<Tooltip>
						<TooltipTrigger asChild>
							<Toggle
								size="sm"
								pressed={editor.isActive({ textAlign: 'center' })}
								onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}
								className={cn(editor.isActive({ textAlign: 'center' }) && 'bg-muted text-muted-foreground')}>
								<AlignCenter className="h-4 w-4" />
							</Toggle>
						</TooltipTrigger>
						<TooltipContent>Align Center</TooltipContent>
					</Tooltip>

					{/* Align Right */}
					<Tooltip>
						<TooltipTrigger asChild>
							<Toggle
								size="sm"
								pressed={editor.isActive({ textAlign: 'right' })}
								onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}
								className={cn(editor.isActive({ textAlign: 'right' }) && 'bg-muted text-muted-foreground')}>
								<AlignRight className="h-4 w-4" />
							</Toggle>
						</TooltipTrigger>
						<TooltipContent>Align Right</TooltipContent>
					</Tooltip>
				</div>

				{/* <div className="w-px h-6 bg-border mx-2" />

				<div className="flex flex-wrap gap-1">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								size="sm"
								type="button"
								variant={editor.isActive('link') ? 'secondary' : 'ghost'}
								onClick={setLink}
								className={cn(editor.isActive('link') && 'bg-muted text-muted-foreground')}>
								<Link className="h-4 w-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Add Link</TooltipContent>
					</Tooltip>
				</div> */}

				<div className="w-px h-6 bg-border mx-2" />

				{/* Undo and Redo */}
				<div className="flex flex-wrap gap-1">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								size="sm"
								variant="ghost"
								type="button"
								onClick={() => editor.chain().focus().undo().run()}
								disabled={!editor.can().undo()}>
								<Undo className="h-4 w-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Undo</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								size="sm"
								type="button"
								variant="ghost"
								onClick={() => editor.chain().focus().redo().run()}
								disabled={!editor.can().redo()}>
								<Redo className="h-4 w-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Redo</TooltipContent>
					</Tooltip>
				</div>
			</TooltipProvider>
		</div>
	);
}
