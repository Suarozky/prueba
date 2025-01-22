import Image from "next/image";
import Productos from "../components/productos";
import Slider from "../components/constants/carousel";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen">
      <div className="w-full">
        <Slider />
      </div>
      
      <div className="flex flex-col lg:flex-row container justify-center items-center gap-8 lg:gap-20 mt-6 lg:mt-10 w-full px-4 sm:px-6 lg:px-16">
        {/* Left content section */}
        <div className="flex flex-col gap-6 lg:gap-8 text-gray-800 items-start justify-start w-full lg:w-1/2 lg:max-w-xl px-4 lg:px-0">
          <h1 className="text-pink-500 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tighter leading-tight text-center lg:text-left">
            Detección temprana de cáncer con IA
          </h1>

          <div className="flex flex-col tracking-tight gap-2 bg-pink-200 p-4 rounded-xl shadow-lg w-full">
            <p className="text-base sm:text-lg font-medium">
              Nuestra tecnología permite que la detección de cáncer sea más
              rápida y precisa.
            </p>
            <p className="text-base sm:text-lg font-medium">
              Estamos transformando el futuro de la patología con innovación.
            </p>
            <p className="font-sans text-xl sm:text-2xl text-pink-700 font-semibold">
              El futuro de la patología es ahora.
            </p>
            <p className="font-sans italic text-xl sm:text-2xl text-pink-600">
              El futuro es <span className="font-bold">Digpatho</span>.
            </p>
          </div>

          <button className="w-full sm:w-auto bg-gradient-to-r from-pink-700 to-pink-500 hover:from-pink-500 hover:to-pink-300 text-white py-2 px-8 rounded-lg text-lg sm:text-xl shadow-md transform hover:scale-105 transition-transform">
            Conoce más
          </button>
        </div>

        {/* Right image section */}
        <div className="w-full lg:w-1/2 max-w-lg mt-6 lg:mt-0 px-4 lg:px-0">
          <Image
            src="/web/doctor.svg"
            alt="Doctor illustration"
            width={600}
            height={580}
            className="rounded-3xl shadow-lg select-none w-full h-auto"
            priority
          />
        </div>
      </div>
      
      <div className="w-full">
        <Productos />
      </div>
    </div>
  );
}