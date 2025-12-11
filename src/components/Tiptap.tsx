'use client';
import { useEditor, EditorContent, Editor, useEditorState } from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import { Toggle } from './ui/toggle';
import { BoldIcon, CodeIcon, HighlighterIcon, ItalicIcon, ListIcon, ListOrderedIcon, Quote, StrikethroughIcon, UnderlineIcon } from 'lucide-react';

const ToolBar = ({ editor }: { editor: Editor }) => {
    const editorState = useEditorState({
        editor, selector: (ctx) => {
            return {
                isBold: ctx.editor.isActive('bold') ?? false,
                isUnderline: ctx.editor.isActive('underline') ?? false,
                isItalic: ctx.editor.isActive('italic') ?? false,
                isStrike: ctx.editor.isActive("strike") ?? false,
                isCode: ctx.editor.isActive("code") ?? false,
                isHighlight: ctx.editor.isActive("highlight") ?? false,
                isBulletList: ctx.editor.isActive("bulletList") ?? false,
                isOrderedList: ctx.editor.isActive("orderedList") ?? false,
                isBlockquote: ctx.editor.isActive("blockquote") ?? false
            };
        }
    });

    return <>
        <Toggle
            size='sm'
            pressed={editorState.isBold}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
            aria-label='Toggle Bold'
        >
            <BoldIcon className='h-4 w-4' />
        </Toggle>
        <Toggle
            size='sm'
            pressed={editorState.isItalic}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            aria-label='Toggle Italic'
        >
            <ItalicIcon className='h-4 w-4' />
        </Toggle>
        <Toggle
            size='sm'
            pressed={editorState.isUnderline}
            onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
            aria-label='Toggle Underline'
        >
            <UnderlineIcon className='h-4 w-4' />
        </Toggle>
        <Toggle
            size="sm"
            pressed={editorState.isStrike}
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            aria-label="Toggle strikethrough"
        >
            <StrikethroughIcon className="h-4 w-4" />
        </Toggle>
        <Toggle
            size="sm"
            pressed={editorState.isHighlight}
            onPressedChange={() => editor.chain().focus().toggleHighlight({ color: "#87c4af" }).run()}
            aria-label="Toggle highlight"
        >
            <HighlighterIcon className="h-4 w-4" />
        </Toggle>

        <Toggle
            size="sm"
            pressed={editorState.isCode}
            onPressedChange={() => editor.chain().focus().toggleCode().run()}
            aria-label="Toggle code"
        >
            <CodeIcon className="h-4 w-4" />
        </Toggle>

        <Toggle
            size="sm"
            pressed={editorState.isBulletList}
            onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
            aria-label="Toggle bullet list"
        >
            <ListIcon className="h-4 w-4" />
        </Toggle>

        <Toggle
            size="sm"
            pressed={editorState.isOrderedList}
            onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
            aria-label="Toggle ordered list"
        >
            <ListOrderedIcon className="h-4 w-4" />
        </Toggle>

        <Toggle
            size="sm"
            pressed={editorState.isBlockquote}
            onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
            aria-label="Toggle blockquote"
        >
            <Quote className="h-4 w-4" />
        </Toggle>
    </>;
}

export const Tiptap = () => {
    const editor = useEditor({
        extensions: [StarterKit, Highlight.configure({ multicolor: true })],
        content: '<p>Hello World!</p>',
        editorProps: {
            attributes: {
                class: "prose dark:prose-invert prose-sm sm:prose-base focus:outline-none max-w-none"
            }
        },
        immediatelyRender: false
    })

    return <>
        {editor && <ToolBar editor={editor} />}
        <EditorContent editor={editor} />
    </>;
}
