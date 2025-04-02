import { Editor } from "@tiptap/core";
import { FaListUl, FaListOl } from "react-icons/fa";

interface ListControlsProps {
  editor: Editor;
}

export const ListControls = ({ editor }: ListControlsProps) => {
  const listTypes = [
    {
      icon: <FaListUl />,
      command: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
      label: "Lista con viñetas",
    },
    {
      icon: <FaListOl />,
      command: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
      label: "Lista numerada",
    },
  ];

  return (
    <div className="flex space-x-1">
      {listTypes.map((list, index) => (
        <button
          key={index}
          onClick={list.command}
          className={`p-2 rounded ${list.isActive() ? "bg-blue-500 text-white" : "hover:bg-gray-100"
            }`}
          title={list.label}
        >
          {list.icon}
        </button>
      ))}
    </div>
  );
};