"use client";

import { type Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Underline,
  Undo,
} from "lucide-react";

type Props = {
  editor: Editor | null;
  content: string;
  isError: boolean;
};

const Toolbar = ({ editor, content, isError }: Props) => {
  if (!editor) {
    return null;
  }
  return (
    <div
      className={`px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start
    gap-5 w-full flex-wrap border-input ${isError ? "border-[1px] border-red-500" : "border-[1px] border-[rgb(36, 73, 132)]"}`}
    >
      <div className="flex justify-start items-center gap-5 w-full  flex-wrap ">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? "bg-[var(--clr-secondary)] text-white p-2 rounded-lg"
              : "text-[var(--clr-secondary)]"
          }
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? "bg-[var(--clr-secondary)] text-white p-2 rounded-lg"
              : "text-[var(--clr-secondary)]"
          }
        >
          <Italic className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? "bg-[var(--clr-secondary)] text-white p-2 rounded-lg"
              : "text-[var(--clr-secondary)]"
          }
        >
          <Underline className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "bg-[var(--clr-secondary)] text-white p-2 rounded-lg"
              : "text-[var(--clr-secondary)]"
          }
        >
          <Strikethrough className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-[var(--clr-secondary)] text-white p-2 rounded-lg"
              : "text-[var(--clr-secondary)]"
          }
        >
          <Heading2 className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "bg-[var(--clr-secondary)] text-white p-2 rounded-lg"
              : "text-[var(--clr-secondary)]"
          }
        >
          <List className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "bg-[var(--clr-secondary)] text-white p-2 rounded-lg"
              : "text-[var(--clr-secondary)]"
          }
        >
          <ListOrdered className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive("blockquote")
              ? "bg-[var(--clr-secondary)] text-white p-2 rounded-lg"
              : "text-[var(--clr-secondary)]"
          }
        >
          <Quote className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setCode().run();
          }}
          className={
            editor.isActive("code")
              ? "bg-[var(--clr-secondary)] text-white p-2 rounded-lg"
              : "text-[var(--clr-secondary)]"
          }
        >
          <Code className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo")
              ? "bg-[var(--clr-secondary)] text-white p-2 rounded-lg"
              : "text-[var(--clr-secondary)] hover:bg-[var(--clr-secondary)] hover:text-white p-1 hover:rounded-lg"
          }
        >
          <Undo className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive("redo")
              ? "bg-[var(--clr-secondary)] text-white p-2 rounded-lg"
              : "text-[var(--clr-secondary)] hover:bg-[var(--clr-secondary)] hover:text-white p-1 hover:rounded-lg"
          }
        >
          <Redo className="w-5 h-5" />
        </button>
      </div>
      {/* {content && (
        <button
          type="submit"
          className="px-4 bg-[var(--clr-secondary)] text-white py-2 rounded-md"
        >
          Add
        </button>
      )} */}
    </div>
  );
};

export default Toolbar;
