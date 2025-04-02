'use client'
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import MenuBar from "./editor/menubar/MenuBar";
import TextAlign from "@tiptap/extension-text-align";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(
        {
          bulletList: {
            HTMLAttributes: {
              class: "list-disc pl-6",
            },
          },
          orderedList: {
            HTMLAttributes: {
              class: "list-decimal pl-6",
            }, 
          },
          heading: {
            levels: [1, 2, 3, 4, 5, 6],
          },
        }
      ),
      Color.configure({
        types: ["textStyle"], 
      }),
      Image,
      TextStyle,
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "custom-table",
        },
      }),
      TableRow,
      TableCell,
      TableHeader,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
        defaultAlignment: "left",
      }),
    ],
    content: "<p>¡Empieza a escribir tu informe aquí! 🚀</p>",
    editorProps: {
      handleKeyDown: (view, event) => {
        if (event.ctrlKey && event.key === "z") {
          editor?.chain().focus().undo().run();
          return true;
        }
        if (event.ctrlKey && event.key === "y") {
          editor?.chain().focus().redo().run();
          return true;
        }
        return false;
      },
      attributes: {
        class: "tiptap-editor",
      }
    }
  });

  return (
    <div className="editor-container">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="editor-content" />

      {/* Menú contextual al seleccionar texto */}
      {editor && (
        <BubbleMenu editor={editor}>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            Negrita
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            Cursiva
          </button>
        </BubbleMenu>
      )}
    </div>
  );
}

export default Editor;
