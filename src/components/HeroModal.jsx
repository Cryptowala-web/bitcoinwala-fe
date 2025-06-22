import React, { useEffect } from "react";

const HeroModal = () => {
  useEffect(() => {
    class SmoothScroll {
      constructor() {
        this.elements = document.querySelectorAll(".parallax-element");
        this.scrollElements = document.querySelectorAll(".scroll-reveal");
        this.init();
      }

      init() {
        this.addScrollListeners();
        this.handleScroll();
        this.observeScrollElements();
      }

      addScrollListeners() {
        let ticking = false;
        window.addEventListener("scroll", () => {
          if (!ticking) {
            requestAnimationFrame(() => {
              this.handleScroll();
              ticking = false;
            });
            ticking = true;
          }
        });
      }

      handleScroll() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;

        this.elements.forEach((element) => {
          const speed = parseFloat(element.dataset.speed) || 1;
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollTop;

          if (rect.top < windowHeight && rect.bottom > 0) {
            const yPos = (scrollTop - elementTop) * speed * 0.1;
            element.style.transform = `translateY(${yPos}px)`;
          }
        });
      }

      observeScrollElements() {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add(
                  "opacity-100",
                  "translate-y-0",
                  "scale-100"
                );
              }
            });
          },
          {
            threshold: 0.1,
            rootMargin: "0px 0px -100px 0px",
          }
        );

        this.scrollElements.forEach((element) => {
          observer.observe(element);
        });
      }
    }

    new SmoothScroll();
  }, []);

  const images = [
    "photo-1530569673472-307dc017a82d",
    "photo-1439853949127-fa647821eba0",
    "photo-1551376347-075b0121a65b",
    "photo-1551376347-075b0121a65b",
  ];

  return (
    <div className="relative overflow-x-hidden bg-black text-white font-unbounded">
      <section id="about" className="py-16 md:py-24 px-4 md:px-10 flex flex-col justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {images.map((id, i) => (
            <div
              key={i}
              className="scroll-reveal opacity-0 transform translate-y-10 scale-95 transition-all duration-1000 ease-out
                         relative overflow-hidden rounded-xl aspect-[4/5] shadow-lg parallax-element w-full"
              data-speed={0.6 + i * 0.01}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
              <img
                src={`https://images.unsplash.com/${id}?auto=format&q=80&w=600`}
                alt={`Creative ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105 hover:rotate-[1deg] brightness-100 hover:brightness-110"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HeroModal;
