import { FaImage } from "react-icons/fa";
import { TableMenu } from "./table/TableMenu";
import { HeadingSelector } from "./heading/HeadingSelector";
import { TextAlignControls } from "./text-align/TextAlignControls";
import { ListControls } from "./list-controls/ListControls";
import { UndoRedoControls } from "./Undo-Redo/UndoRedoControls";
import ColorPicker from "./ColorPicker/ColorPicker";
import {  TextEnhancer } from "../gemini/TextEnhacer";

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        editor.chain().focus().setImage({ src: event.target?.result || "" }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="menu-bar">
      {/* Controles Deshacer/Rehacer */}
      <UndoRedoControls editor={editor} />

      {/* Selector de títulos */}
      <HeadingSelector editor={editor} />
      
      {/* Selector de aliniacion */}
      <TextAlignControls editor={editor} />

      {/* Controladores de lista */}
      <ListControls editor={editor} />
      {/* Negrita, cursiva, etc. */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <strong>B</strong>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <em>I</em>
      </button>

      {/* Tablas */}
      <TableMenu editor={editor} />
      {/* Imágenes */}
      <div className="flex items-center space-x-3">
        <label htmlFor="image-upload" className="cursor-pointer text-black hover:text-primary_color">
          <FaImage size={24} />
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="image-upload"
          accept="image/*"
        />
      </div>

      { /* Color Picker */ }
      <ColorPicker editor={editor} />

      { /* Gemini */}
      <TextEnhancer editor={editor} />
    </div>
  );
};

export default MenuBar;