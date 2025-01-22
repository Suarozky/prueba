"use client";

import { AnimatePresence } from "motion/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Pag1 from "../components/pag1";
import Image from "next/image";

export default function SharedLayoutAnimation() {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [userEmail, setUserEmail] = useState("");
  const [reportNumber, setReportNumber] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const profilePicture = ["/web/profile.jpg", "/web/profile4.jpg"];
  const randomIndex = Math.floor(Math.random() * profilePicture.length);
  const randomPicture = profilePicture[randomIndex];

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:mx-20 my-2 sm:my-5 h-screen max-h-screen text-black rounded-lg bg-white overflow-hidden shadow-lg flex flex-col">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row w-full bg-pink-100 p-4 gap-4">
        {/* Profile Image */}
        <div className="flex items-center">
          <div className="bg-black h-16 w-16 sm:h-24 sm:w-24 rounded-full overflow-hidden">
            <Image
              src={randomPicture}
              alt="logo"
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>
        </div>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
          {/* Patient Name */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Nombre del paciente</span>
            <input
              type="text"
              className="w-full h-10 rounded-lg pl-3"
              placeholder="Buscar"
              defaultValue={userEmail}
            />
          </div>

          {/* Report Number */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">N de informe</span>
            <input
              type="text"
              className="w-full h-10 rounded-lg pl-3"
              placeholder="Número del informe"
              value={reportNumber}
              readOnly
            />
          </div>

          {/* Sample Date */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Fecha de muestra</span>
            <input type="date" className="w-full h-10 rounded-lg pl-3" />
          </div>

          {/* Report Selection */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Elige un Informe</span>
            <select
              id="browser"
              name="browser"
              className="w-full h-10 rounded-lg pl-3"
              value={reportNumber}
              onChange={(e) => setReportNumber(e.target.value)}
            >
              <option value="">Selecciona un informe</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="bg-[#fdfdfd] p-1 rounded-t-lg border-b border-[#eeeeee] overflow-x-auto">
        <ul className="flex w-full list-none p-0 m-0 font-medium text-sm min-w-max">
          {tabs.map((item) => (
            <motion.li
              key={item.label}
              initial={false}
              animate={{
                backgroundColor: item === selectedTab ? "#eee" : "#eee0",
              }}
              className="relative flex-1 flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer whitespace-nowrap"
              onClick={() => setSelectedTab(item)}
            >
              <span className="flex items-center gap-2">
                <span className="text-base">{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </span>
              {item === selectedTab ? (
                <motion.div
                  className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-pink-600"
                  layoutId="underline"
                  id="underline"
                />
              ) : null}
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab.label : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {selectedTab && selectedTab.component ? (
              <selectedTab.component />
            ) : (
              "😋"
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

/**
 * ==============   Data   ================
 */

const KI67Component = () => (
  <div className="text-2xl sm:text-4xl font-bold">
    <Pag1 />
  </div>
);
const HER2Component = () => (
  <div className="text-2xl sm:text-4xl font-bold">
    <Pag1 />
  </div>
);
const EstrogenComponent = () => (
  <div className="text-2xl sm:text-4xl font-bold">
    <Pag1 />
  </div>
);
const ProgesteroneComponent = () => (
  <div className="text-2xl sm:text-4xl font-bold">
    <Pag1 />
  </div>
);

const allIngredients = [
  { icon: "🔬", label: "KI67", component: KI67Component },
  { icon: "🩹", label: "HER2", component: HER2Component },
  { icon: "💊", label: "Estrógeno", component: EstrogenComponent },
  { icon: "🩸", label: "Progesterona", component: ProgesteroneComponent },
];

const [KI67, HER2, Estrógeno, Progesterona] = allIngredients;
const tabs = [KI67, HER2, Estrógeno, Progesterona];
