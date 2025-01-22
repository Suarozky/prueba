import Image from "next/image";

export default function Productos() {
  return (
    <div className="flex justify-center items-center w-full h-full bg-pink-200 text-pink-600 p-4">
      <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-10 m-10 lg:h-96 bg-pink-200 text-pink-600">
        <div className="rounded-full h-60 w-60 lg:h-72 lg:w-72 flex-shrink-0">
          <Image
            src="/web/cell1.svg"
            alt="Cell Image 1"
            width={320}
            height={320}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col gap-4 text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl tracking-tighter font-bold">
            Sobre nuestros
            <br /> productos
          </h1>
          <p className="font-medium tracking-widest text-base lg:text-lg text-gray-900">
            Nuestros algoritmos procesan y analizan
            <br /> imágenes para identificar células con ciertas
            <br /> características y estructuras, según la patología
            <br /> a estudiar. Con nuestras herramientas, los
            <br /> profesionales pueden realizar análisis de
            <br /> manera más rápida y efectiva, ahorrando
            <br /> tiempo y esfuerzo.
          </p>
          <button className="bg-gradient-to-r from-pink-700 to-pink-500 hover:from-pink-500 hover:to-pink-300 text-white py-3 px-8 rounded-lg text-base lg:text-xl shadow-md transform hover:scale-105 transition-transform">
            MÁS INFORMACIÓN
          </button>
        </div>
        <div className="rounded-full h-60 w-60 lg:h-72 lg:w-72 flex-shrink-0">
          <Image
            src="/web/cell2.svg"
            alt="Cell Image 2"
            width={320}
            height={320}
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
