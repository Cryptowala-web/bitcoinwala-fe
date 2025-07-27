import React from "react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const target = document.getElementById("sparkles-section");

    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowLogo(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.2,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <>
      {/* {showLogo && (
        <div
          //  className="fixed mt-0 sm:-top-1 md:-top-5 lg:-top-5 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-300"
          className="fixed flex flex-row justify-center items-start"
        >
          <img
            src="/nobglogo.png"
            alt="Bitcoinwala logo"
            className="w-40 sm:w-40 md:w-50 lg:w-60 h-auto drop-shadow-lg"
          />
        </div>
      )} */}
      {showLogo && (
        <div className="fixed sm:-top-5 left-1/2 transform -translate-x-1/2 z-20 flex justify-center items-start">
          <img
            src="/nobglogo.png"
            alt="Bitcoinwala logo"
            className="w-40 sm:w-40 md:w-50 lg:w-60 h-auto drop-shadow-lg"
          />
        </div>
      )}
    </>
  );
}
