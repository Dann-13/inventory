import { Editor } from "@tiptap/core";
import { FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify } from "react-icons/fa";

interface TextAlignControlsProps {
  editor: Editor;
}
export const TextAlignControls = ({ editor }: TextAlignControlsProps) => {
  const alignments = [
    { icon: <FaAlignLeft />, value: "left", label: "Izquierda" },
    { icon: <FaAlignCenter />, value: "center", label: "Centro" },
    { icon: <FaAlignRight />, value: "right", label: "Derecha" },
    { icon: <FaAlignJustify />, value: "justify", label: "Justificado" },
  ];
  return (
    <div className="flex space-x-1">
      {alignments.map((alignment) => (
        <button
          key={alignment.value}
          onClick={() => editor.chain().focus().setTextAlign(alignment.value).run()}
          className={`p-2 rounded ${editor.isActive({ textAlign: alignment.value })
              ? "bg-primary_color text-white"
              : "hover:bg-gray-100"
            }`}
          title={alignment.label}
        >
          {alignment.icon}
        </button>
      ))}
    </div>
  );
}