"use client";
import { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { FaPalette, FaTimes } from "react-icons/fa";

interface ColorPickerProps {
  editor: any;
}

const DEFAULT_COLORS = [
  "#000000", // Negro
  "#FFFFFF", // Blanco
  "#FF0000", // Rojo
  "#00FF00", // Verde
  "#0000FF", // Azul
  "#FFFF00", // Amarillo
  "#FF00FF", // Magenta
  "#00FFFF", // Cyan
];
const ColorPicker = ({ editor }: ColorPickerProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const [customColor, setCustomColor] = useState("#000000");
  const [recentColors, setRecentColors] = useState<string[]>([]);

  useEffect(() => {
    const savedColors = localStorage.getItem("recentColors");
    if (savedColors) setRecentColors(JSON.parse(savedColors));
  }, []);

  const saveRecentColor = (color: string) => {
    const updatedColors = [
      color,
      ...recentColors.filter((c) => c !== color).slice(0, 7), // Máximo 8 colores
    ];
    setRecentColors(updatedColors);
    localStorage.setItem("recentColors", JSON.stringify(updatedColors));
  };

  const applyColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
    saveRecentColor(color);
    setShowPicker(false);
  };

  return (
    <div className="relative">
      {/* Botón para abrir el menú de colores */}
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="p-2 rounded hover:bg-gray-100"
        title="Color de texto"
      >
        <FaPalette className="text-lg" />
      </button>

      {/* Menú desplegable de colores */}
      {showPicker && (
        <div className="absolute z-50 bg-white p-4 shadow-lg rounded-md border border-gray-200 w-64">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Color de texto</h3>
            <button onClick={() => setShowPicker(false)}>
              <FaTimes className="text-gray-500" />
            </button>
          </div>

          {/* Colores recientes */}
          {recentColors.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm text-gray-600 mb-1">Recientes</h4>
              <div className="flex flex-wrap gap-2">
                {recentColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => applyColor(color)}
                    className="w-6 h-6 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Colores predeterminados */}
          <div className="mb-4">
            <h4 className="text-sm text-gray-600 mb-1">Predeterminados</h4>
            <div className="flex flex-wrap gap-2">
              {DEFAULT_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => applyColor(color)}
                  className="w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Selector de color personalizado */}
          <div className="mb-2">
            <h4 className="text-sm text-gray-600 mb-2">Personalizado</h4>
            <HexColorPicker
              color={customColor}
              onChange={setCustomColor}
              style={{ width: "100%" }}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-600">{customColor}</span>
              <button
                onClick={() => applyColor(customColor)}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}

export default ColorPicker;