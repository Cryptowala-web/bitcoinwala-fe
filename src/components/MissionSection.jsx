import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedWhitepaperModal from "./pdf";
import Subscribe from "./subscribe";
import whitepaperJSON from "./whitepaper.json";
import { Timeline } from "./ManifestoTimeLine";
import { API } from "../api";
import WhitepaperSection from "./WhitePaperSection";

export function transformWhitePaperData(whitePaperJson) {
  return whitePaperJson.sections.map((section) => ({
    title: section.heading,
    content: (
      <div className="space-y-2">
        {section.content.map((line, i) => (
          <p
            key={i}
            className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base"
          >
            {line}
          </p>
        ))}
      </div>
    ),
  }));
}
function MissionSection({ isMobile }) {
  const [isSticky, setIsSticky] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const logoRef = useRef(null);
  const sectionRef = useRef(null);
  const anchorRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isAbove = entry.boundingClientRect.top < 0;
        setIsSticky(!entry.isIntersecting && isAbove);
      },
      { threshold: 0 }
    );

    if (anchorRef.current) observer.observe(anchorRef.current);

    return () => {
      if (anchorRef.current) observer.unobserve(anchorRef.current);
    };
  }, []);

  const [data, setData] = useState(whitepaperJSON);
  console.log("data12345", data);

  const fetchWhitepaper = async () => {
    const res = await fetch(`${API}/admin/api/whitepaper`);
    const data1 = await res.json();
    setData(data1);
  };

  useEffect(() => {
    try {
      fetchWhitepaper();
    } catch (e) {
      console.log(e);
    }
  }, []);
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  const slideUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.5,
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const logoAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20,
        duration: 0.8,
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  const imageScaleVariant = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
    },
  };

  const timelineData = transformWhitePaperData(data);
  console.log("tieline", timelineData);

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="relative w-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-14"
      style={{
        backgroundColor: "#0A0A0A",
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.05) 2px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      <div ref={anchorRef} className="w-full h-1"></div>
      <motion.div
        variants={staggerContainer}
        className="max-w-7xl w-full relative h-full flex flex-col justify-center py-10 sm:py-0"
      >
        <motion.div
          variants={slideUp}
          className={`flex ${
            isMobile
              ? "flex-col items-center space-y-12"
              : "items-start space-x-4"
          } mt-8 sm:mt-12 md:mt-20 px-2 sm:px-4`}
        >
          {/* Mission Image Block */}
          <motion.div
            variants={slideUp}
            className={
              isMobile ? "mt-20 w-full flex flex-col items-center" : ""
            }
          >
            <motion.div
              variants={imageScaleVariant}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`relative group overflow-hidden ${
                isMobile ? "w-full max-w-sm" : "w-full max-w-[56rem]"
              } h-auto`}
              whileHover="hover"
            >
              <motion.img
                src="missiontext.png"
                alt="Mission"
                className="w-full"
                initial={{ y: 0, opacity: 1 }}
                variants={{
                  initial: { y: 0, opacity: 1 },
                  hover: { y: "-50%", opacity: 0 },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <motion.img
                src="missiontext-hover.png"
                alt="Mission Hover"
                className="absolute top-0 left-0 w-full"
                initial={{ y: "50%", opacity: 0 }}
                variants={{
                  initial: { y: "50%", opacity: 0 },
                  hover: { y: 0, opacity: 1 },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>

          {!isMobile && (
            <motion.div variants={slideUp} className="flex-shrink-0 ml-80">
              <motion.div
                whileHover={{
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 1 },
                }}
                className="relative group w-30 h-30"
              >
                <motion.img
                  src="bitlogo.png"
                  alt="bitlogo"
                  className="absolute w-60 h-auto opacity-100 group-hover:opacity-0"
                />
                <motion.img
                  src="bitlogo-hover.png"
                  alt="bitlogo-hover"
                  className="absolute w-60 h-auto opacity-0 group-hover:opacity-100"
                />
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
      <WhitepaperSection data={data} />
    </motion.section>
  );
}

export default MissionSection;
