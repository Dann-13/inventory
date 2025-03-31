import Link from 'next/link';
import { FaCog, FaFolder, FaTachometerAlt, FaUserCircle } from "react-icons/fa";

export const Slider = () => {
  return (
    <div className="w-64 h-screen bg-white text-gray-800 flex flex-col p-4 shadow-lg border-r-2 border-gray-200">

      {/* Enlaces del Sidebar */}
      <Link href={"/protected/home"}>
        <div className="flex items-center text-lg mb-4 px-4 py-2 rounded-md hover:bg-[#8D7FE0] hover:text-white transition duration-300 group">
          <FaTachometerAlt className="mr-3 text-[#8D7FE0] group-hover:text-white" /> {/* Icono del Dashboard */}
          Panel de Control
        </div>
      </Link>

      <Link href={"/protected/documents"}>
        <div className="flex items-center text-lg mb-4 px-4 py-2 rounded-md hover:bg-[#8D7FE0] hover:text-white transition duration-300 group">
          <FaFolder className="mr-3 text-[#8D7FE0] group-hover:text-white" /> {/* Icono de Documentos */}
          Documentos
        </div>
      </Link>

      <Link href={"/configuracion"}>
        <div className="flex items-center text-lg mb-4 px-4 py-2 rounded-md hover:bg-[#8D7FE0] hover:text-white transition duration-300 group">
          <FaCog className="mr-3 text-[#8D7FE0] group-hover:text-white" /> {/* Icono de Configuración */}
          Configuración
        </div>
      </Link>

      <Link href={"/perfil"}>
        <div className="flex items-center text-lg mb-4 px-4 py-2 rounded-md hover:bg-[#8D7FE0] hover:text-white transition duration-300 group">
          <FaUserCircle className="mr-3 text-[#8D7FE0] group-hover:text-white" /> {/* Icono de Perfil */}
          Mi Perfil
        </div>
      </Link>

      {/* Footer del Sidebar */}
      <div className="mt-auto text-center text-sm text-gray-500">
        © 2025 Inventory
      </div>
    </div>
  );
}
