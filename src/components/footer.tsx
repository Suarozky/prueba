import Image from "next/image";

export default function Footer() {
  return (
    <div className="flex flex-col justify-between gap-10 items-center bg-pink-100 text-pink-700">
      <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-32 m-10">
        <div className="flex flex-col gap-2">
          <span className="text-black text-2xl font-bold">Sobre Nosotros</span>
          <span>DigPatho ofrece soluciones de IA de vanguardia</span>
          <span>para patólogos y científicos, permitiéndoles analizar</span>
          <span>imágenes médicas complejas con una velocidad,</span>
          <span>precisión y consistencia sin precedentes.</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-black text-2xl font-bold">Recurso</span>
          <span>Investigación Cáncer de Próstata</span>
          <span>Cáncer de Mama Artículos</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-black text-2xl font-bold">Contacto</span>
          <span>+54 9 3513 05-8327</span>
          <span>contact@digpatho.com</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-black text-2xl font-bold">Ubicaciones</span>
          <span>Encuéntranos Aquí</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center w-full p-4 bg-pink-100 gap-4">
        <Image src="/web/logo.svg" alt="Next.js logo" width={180} height={38} />
        <span className="text-center md:text-left">
          Liberando el poder de la IA para una patología de precisión.
        </span>
      </div>
    </div>
  );
}
