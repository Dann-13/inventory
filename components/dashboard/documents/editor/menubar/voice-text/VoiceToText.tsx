'use client'
import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FaCircleStop } from "react-icons/fa6";
import { CiMicrophoneOn } from "react-icons/ci";
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

type VoiceToTextProps = {
  editor: any;
  disabled?: boolean;
};

export default function VoiceToText({ editor, disabled = false }: VoiceToTextProps) {
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  // Verificar si el micrófono está disponible
  useEffect(() => {
    console.log("¿Micrófono disponible?", isMicrophoneAvailable);
    console.log("¿Soporta SpeechRecognition el navegador?", browserSupportsSpeechRecognition);
  }, [isMicrophoneAvailable, browserSupportsSpeechRecognition]);

  const [currentText, setCurrentText] = useState('');
  console.log("Componente renderizado");
  useEffect(() => {
    console.log("Estado de la transcripción:", transcript); 
    if (!transcript || !editor) return;

    // Guardamos el texto actual para evitar que se sobreescriba
    setCurrentText(transcript);

    // Obtenemos la posición actual del cursor
    const { from } = editor.state.selection;

    // Insertamos el texto en la posición actual
    editor
      .chain()
      .focus()
      .insertContentAt(from, currentText + ' ') // Insertamos el texto con un espacio al final
      .run();
  }, [transcript, editor, currentText]); 

  useEffect(() => {
    console.log("¿Reconociendo voz?", listening); // Verifica si está escuchando
  }, [listening]);


  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();

    } else {
      SpeechRecognition.startListening({
        continuous: true,
        language: 'es-ES',
      });

    }
  };

  if (!browserSupportsSpeechRecognition || !isMicrophoneAvailable) {
    return null;
  }

  return (
    <button
      onClick={toggleListening}
      disabled={disabled || !editor?.isEditable}
      className={`p-2 rounded ${
        listening 
          ? 'bg-red-100 text-red-600' 
          : 'hover:bg-gray-100 text-gray-700'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      title={listening ? 'Detener dictado' : 'Iniciar dictado'}
      aria-label={listening ? 'Detener dictado' : 'Iniciar dictado'}
    >
      {listening ? (
        <FaMicrophoneSlash className="text-lg" />
      ) : (
        <FaMicrophone className="text-lg" />
      )}
    </button>
  );
}