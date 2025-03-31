'use client'
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import MenuBar from "./menuBar";

const Editor = () => {
    const editor = useEditor({
        extensions: [
          StarterKit,
          Image,
          Table.configure({ resizable: true }),
          TableRow,
          TableCell,
          TableHeader,
        ],
        content: "<p>¡Empieza a escribir tu informe aquí! 🚀</p>",
        editorProps:{
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
