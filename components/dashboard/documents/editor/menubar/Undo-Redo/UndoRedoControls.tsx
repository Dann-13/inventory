import { Editor } from "@tiptap/core";
import { FaUndo, FaRedo } from "react-icons/fa";

interface UndoRedoControlsProps {
  editor: Editor;
}

export const UndoRedoControls = ({ editor }: UndoRedoControlsProps) => {
  return (
    <div className="flex space-x-1">
      {/* Botón Deshacer (Undo) */}
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className={`p-2 rounded ${!editor.can().undo() ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
          }`}
        title="Deshacer (Ctrl+Z)"
      >
        <FaUndo />
      </button>

      {/* Botón Rehacer (Redo) */}
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className={`p-2 rounded ${!editor.can().redo() ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
          }`}
        title="Rehacer (Ctrl+Y)"
      >
        <FaRedo />
      </button>
    </div>
  );
};