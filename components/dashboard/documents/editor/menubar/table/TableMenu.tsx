// components/TableMenu.tsx
import { Editor } from "@tiptap/core";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FaTable, FaPlus, FaMinus, FaTrash, FaObjectGroup, FaTh } from "react-icons/fa";

interface TableMenuProps {
  editor: Editor;
}

export const TableMenu = ({ editor }: TableMenuProps) => {
  if (!editor) return null;

  const tableOptions = [
    {
      label: "Insertar tabla",
      icon: <FaTable className="mr-2" />,
      action: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    },
    {
      label: "Añadir columna antes",
      icon: <FaPlus className="mr-2" />,
      action: () => editor.chain().focus().addColumnBefore().run(),
    },
    {
      label: "Añadir columna después",
      icon: <FaPlus className="mr-2" />,
      action: () => editor.chain().focus().addColumnAfter().run(),
    },
    {
      label: "Eliminar columna",
      icon: <FaMinus className="mr-2" />,
      action: () => editor.chain().focus().deleteColumn().run(),
    },
    {
      label: "Añadir fila antes",
      icon: <FaPlus className="mr-2" />,
      action: () => editor.chain().focus().addRowBefore().run(),
    },
    {
      label: "Añadir fila después",
      icon: <FaPlus className="mr-2" />,
      action: () => editor.chain().focus().addRowAfter().run(),
    },
    {
      label: "Eliminar fila",
      icon: <FaMinus className="mr-2" />,
      action: () => editor.chain().focus().deleteRow().run(),
    },
    {
      label: "Eliminar tabla",
      icon: <FaTrash className="mr-2" />,
      action: () => editor.chain().focus().deleteTable().run(),
    },
    {
      label: "Combinar celdas",
      icon: <FaObjectGroup className="mr-2" />,
      action: () => editor.chain().focus().mergeCells().run(),
    },
    {
      label: "Cabecera de columna",
      icon: <FaTh className="mr-2" />,
      action: () => editor.chain().focus().toggleHeaderColumn().run(),
    },
    {
      label: "Cabecera de fila",
      icon: <FaTh className="mr-2" />,
      action: () => editor.chain().focus().toggleHeaderRow().run(),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 hover:bg-gray-100 rounded">
          <FaTable className="text-lg" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {tableOptions.map((option, index) => (
          <DropdownMenuItem key={index} onClick={option.action}>
            {option.icon}
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};