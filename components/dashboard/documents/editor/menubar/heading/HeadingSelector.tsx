import { Editor } from "@tiptap/core";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { FaHeading } from "react-icons/fa6";

interface IOption {
  value: number;
  label: string;
}

interface HeadingSelectorProps {
  editor: Editor;
}

const options: IOption[] = [
  { value: 1, label: "H1" },
  { value: 2, label: "H2" },
  { value: 3, label: "H3" },
  { value: 4, label: "H4" },
  { value: 5, label: "H5" },
  { value: 6, label: "H6" },
];

export const HeadingSelector = ({ editor }: HeadingSelectorProps) => {
  const handleChange = (level: number) => {
    editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run();
  };

  return (
    <div className="flex items-center space-x-1">
      <DropdownMenu>
        <DropdownMenuTrigger><FaHeading size={15} /></DropdownMenuTrigger>
        <DropdownMenuSeparator />
        <DropdownMenuContent className="w-fit min-w-[55px]">
          {options.map((option) => (
            <DropdownMenuItem key={option.value}>
              <button
                onClick={() => handleChange(option.value)}
                className={`p-1 rounded ${editor.isActive("heading", { level: option.value })
                  ? "bg-primary_color text-white"
                  : "hover:bg-gray-100"
                  }`}
              >
                {option.label}
              </button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  );
};