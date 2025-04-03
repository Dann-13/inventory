import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { text } = await req.json();

  // Validación de longitud
  if (text.length > 500) {
    return NextResponse.json(
      { error: "Texto demasiado largo" },
      { status: 400 }
    );
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { maxOutputTokens: 500 }
    });

    const prompt = `Por favor, mejora el siguiente texto, manteniendo su sentido pero ajustando el estilo a un tono técnico, formal y profesional adecuado para un informe de construcción. Asegúrate de corregir cualquier error gramatical o de coherencia y de optimizar la redacción para lograr un lenguaje preciso y claro. El texto original tiene un máximo de ${text.length} caracteres: "${text}"`;

    const result = await model.generateContent(prompt);
    const enhancedText = result.response.text();

    return NextResponse.json({ enhancedText });

  } catch (error) {
    console.error("Gemini Error:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}