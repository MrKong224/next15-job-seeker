'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Typography from '@tiptap/extension-typography';
import MenuBar from './MenuBar';
import { ControllerRenderProps } from 'react-hook-form';

interface iProps {
	field: ControllerRenderProps;
}

const TextEditor = ({ field }: iProps) => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			// Link.configure({
			// 	openOnClick: false,
			// }),
			TextAlign.configure({
				types: ['heading', 'paragraph'],
			}),
			Typography,
		],
		immediatelyRender: false,
		editorProps: {
			attributes: {
				class:
					'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[500px] p-4 max-w-none dark:prose-invert',
			},
		},
		onUpdate: ({ editor }) => {
			field.onChange(JSON.stringify(editor.getJSON()));
		},

		content: field.value ? JSON.parse(field.value) : '',
	});

	return (
		<div className="w-full border rounded-lg overflow-hidden bg-card">
			<MenuBar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	);
};

export default TextEditor;
