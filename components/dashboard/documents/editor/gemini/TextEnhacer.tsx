"use client";
import { useState, useEffect } from "react";
import { Editor } from "@tiptap/core";
import { FaMagic, FaExclamationTriangle, FaDatabase } from "react-icons/fa";

const MAX_CHARS = 500;
const DAILY_LIMIT = 30;

export const TextEnhancer = ({ editor }: { editor: Editor }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const [lastUsedDate, setLastUsedDate] = useState("");

  const [cache, setCache] = useState<Record<string, string>>(() => {
    // Recuperar caché del localStorage si existe
    if (typeof window !== "undefined") {
      const savedCache = localStorage.getItem("textEnhancerCache");
      return savedCache ? JSON.parse(savedCache) : {};
    }
    return {};
  });

  const getEnhancedText = async (text: string) => {
    // Verificar primero en caché
    if (cache[text]) {
      return cache[text];
    }

    // Si no está en caché, hacer la solicitud a la API
    const response = await fetch("/api/enhance-text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    if (!response.ok) throw new Error("Error en la API");

    const { enhancedText } = await response.json();

    // Actualizar caché
    const newCache = { ...cache, [text]: enhancedText };
    setCache(newCache);
    localStorage.setItem("textEnhancerCache", JSON.stringify(newCache));

    return enhancedText;
  };

  const enhanceSelection = async () => {
    const today = new Date().toDateString();
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );

    // Validando texto seleccionado
    if (selectedText.trim().length === 0) {
      alert("Selecciona texto para mejorar");
      return;
    }

    // Validando el limite de caracteres
    if (selectedText.length > MAX_CHARS) {
      alert(`Máximo ${MAX_CHARS} caracteres. Reduce la selección.`);
      return;
    }

    // Validando los limites diarios
    if (usageCount >= DAILY_LIMIT && lastUsedDate === today) {
      alert("Límite diario alcanzado. Prueba mañana.");
      return;
    }

    setIsLoading(true);

    try {
      const enhancedText = await getEnhancedText(selectedText);

      editor.chain().focus().deleteSelection().insertContent(enhancedText).run();

      // Actualizar contador
      const newCount = usageCount + 1;
      setUsageCount(newCount);
      localStorage.setItem("geminiUsage",
        JSON.stringify({ date: today, count: newCount })
      );

    } catch (error) {
      console.error("Error:", error);
      alert("Error al procesar. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Limpiar caché si es muy grande (opcional)
  useEffect(() => {
    if (Object.keys(cache).length > 100) {
      setCache({});
      localStorage.removeItem("textEnhancerCache");
    }
  }, [cache]);

  return (
    <div className="relative">
      <button
        onClick={enhanceSelection}
        disabled={isLoading}
        className={`flex items-center gap-2 p-2 rounded ${isLoading ? "bg-gray-200" : "hover:bg-blue-50"
          }`}
      >
        <FaMagic className={isLoading ? "animate-pulse" : ""} />
        Mejorar
      </button>

      {/* Indicador de uso */}
      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {DAILY_LIMIT - usageCount}
      </div>
    </div>
  );
};