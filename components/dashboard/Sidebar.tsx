'use client'
import Link from 'next/link';
import { useState } from 'react';
import { FaCog, FaFolder, FaTachometerAlt, FaUserCircle } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import { CiMenuFries } from "react-icons/ci";

export const Slider = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={`xl:h-[100vh] overflow-y-scroll fixed xl:static w-[80%] md:w-[35%] lg:w-[30%] xl:w-auto h-full bg-white top-0 p-4 flex flex-col justify-between z-50 slider-bar-container ${showMenu ? "left-0" : "-left-full"
      } transition-all`}>

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

      <button
          onClick={() => setShowMenu(!showMenu)}
          className="xl:hidden fixed bottom-4 right-4 bg-primary_color text-white p-5 rounded-full z-50"
        >
          {showMenu ? <CiMenuFries size={20} /> : <CiMenuBurger size={20} />}
        </button>
    </div>
  );
}
