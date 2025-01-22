"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Verificamos si hay un correo en el almacenamiento local
    if (typeof window !== "undefined") {
      const userEmail = localStorage.getItem("userEmail");
      if (userEmail) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const handleLogout = () => {
    // Eliminamos el correo del almacenamiento local y redirigimos al inicio
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white text-pink-700 text-2xl md:px-8 lg:px-16">
      {/* Logo */}
      <Link href="/" className="flex-shrink-0">
        <Image src="/web/logo.svg" alt="Logo" width={180} height={38} />
      </Link>

      {/* Menú para pantallas más grandes */}
      <div className="hidden md:flex gap-10">
        <button className="font-bold">Home</button>

        {isLoggedIn ? (
          // Si el usuario está logueado, mostramos "logout"
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-pink-700 to-pink-500 hover:from-pink-500 hover:to-pink-300 text-white h-10 w-28 rounded-lg"
          >
            logout
          </button>
        ) : (
          // Si no está logueado, mostramos "login"
          <Link href="/login">
            <button className="bg-gradient-to-r from-pink-700 to-pink-500 hover:from-pink-500 hover:to-pink-300 text-white h-10 w-28 rounded-lg">
              login
            </button>
          </Link>
        )}
      </div>

      {/* Menú para pantallas pequeñas */}
      <div className="md:hidden">
        {/* Ícono de hamburguesa */}
        <button 
          className="text-2xl" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Menú desplegable */}
        {isMenuOpen && (
          <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 z-50">
            <div className="flex flex-col gap-4">
              <Link href="/" className="font-bold">Home</Link>

              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-pink-700 to-pink-500 hover:from-pink-500 hover:to-pink-300 text-white h-10 w-28 rounded-lg"
                >
                  logout
                </button>
              ) : (
                <Link href="/login">
                  <button className="bg-gradient-to-r from-pink-700 to-pink-500 hover:from-pink-500 hover:to-pink-300 text-white h-10 w-28 rounded-lg">
                    login
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
