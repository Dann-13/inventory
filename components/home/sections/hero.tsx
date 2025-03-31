import Image from "next/image";
import HeroImage from "../../../public/assets/hero.jpg";
const Hero = () => {
  return (
    <section className="px-2 pt-10 lg:py-20 bg-white md:px-0">
      <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
        <div className="flex flex-wrap items-center sm:-mx-3">
          <div className="w-full md:w-1/2 md:px-3">
            <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                <span className="block xl:inline">Genera Reportes Rápidos para tus </span>
                <span className="block text-primary_color xl:inline">Proyecto de Construcción.</span>
              </h1>
              <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">Transforma tu forma de gestionar proyectos de construcción con una herramienta innovadora que captura toda la información de tu obra directamente desde tu móvil. Crea informes detallados y
                 personalizados en menos de un minuto, optimizando tu tiempo y recursos.
                .</p>
              <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                <a href="#_" className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-primary_color rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto">
                  Contacto
                </a>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
              <Image alt="s" src={HeroImage} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );

}
export default Hero;