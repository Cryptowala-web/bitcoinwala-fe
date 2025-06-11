import React from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

function MissionSection({ isMobile }) {
  // State to track logo position
  const [isSticky, setIsSticky] = React.useState(false);
  const logoRef = React.useRef(null);
  const sectionRef = React.useRef(null);
  const anchorRef = React.useRef(null);


  // Effect to handle sticky behavior
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isAbove = entry.boundingClientRect.top < 0;
        const isVisible = entry.isIntersecting;
  
        setIsSticky(!isVisible && isAbove);
      },
      {
        threshold: 0,
      }
    );
  
    if (anchorRef.current) {
      observer.observe(anchorRef.current);
    }
  
    return () => {
      if (anchorRef.current) {
        observer.unobserve(anchorRef.current);
      }
    };
  }, []);
  
  
  

  // Function to handle file download
  const handleDownload = () => {
    // Create a temporary link element
    const link = document.createElement("a");

    // Set the file path - you can change this to your actual file path
    link.href = "/BitcoinWala WHITE PAPER.docx";

    // Set the download attribute with desired filename
    link.download = "BitcoinWala WHITE PAPER.docx"; // You can change the filename here

    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Animation variants
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

  const pulseAnimation = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  const imageScaleVariant = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 }
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-14"
      style={{
        backgroundColor: "#0A0A0A",
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.05) 2px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      {/* Logo */}
      <motion.div
  ref={logoRef}
  variants={logoAnimation}
  whileHover="hover"
  className={`${isSticky ? 'fixed top-0' : 'absolute top-8 sm:top-2'} left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300`}
>
  <img
    src="/logo.svg"
    alt="Bitcoinwala logo"
    className="w-auto h-18 sm:h-26"
  />
</motion.div>

{/* Anchor div goes just below */}
<div ref={anchorRef} className="w-full h-1"></div>


      <motion.div
        variants={staggerContainer}
        className="max-w-7xl w-full relative h-full flex flex-col justify-center py-10 sm:py-0"
      >
        {/* Main Content Area */}
        <motion.div
          variants={slideUp}
          className={`flex ${isMobile
            ? "flex-col items-center space-y-12"
            : "items-start space-x-4"
            } mt-8 sm:mt-12 md:mt-20 px-2 sm:px-4`}
        >
          {/* Mission Text */}
          <motion.div
            variants={slideUp}
            className={`${isMobile ? "mt-20 w-full flex flex-col items-center" : ""}`}
          >
            {/* Mission Text Image */}
            <motion.div
              variants={imageScaleVariant}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`relative group overflow-hidden ${isMobile
                ? "w-full max-w-sm"
                : "w-full max-w-[24rem] xs:max-w-[30rem] sm:max-w-[42rem] md:max-w-[48rem] lg:w-[52rem] xl:w-[56rem]"
                } h-auto`}
              whileHover="hover"
            >
              {/* Default image */}
              <motion.img
                src="missiontext.png"
                alt="Bitcoinwala mission statement graphic"
                className="w-full"
                initial={{ y: 0, opacity: 1 }}
                variants={{
                  initial: { y: 0, opacity: 1 },
                  hover: { y: "-50%", opacity: 0 }
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />

              {/* Hover image */}
              <motion.img
                src="missiontext-hover.png"
                alt="Bitcoinwala mission statement graphic - hover state"
                className="absolute top-0 left-0 w-full"
                initial={{ y: "50%", opacity: 0 }}
                variants={{
                  initial: { y: "50%", opacity: 0 },
                  hover: { y: 0, opacity: 1 }
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>

          {/* Bitcoin Logo for Desktop */}
          {!isMobile && (
            <motion.div variants={slideUp} className="flex-shrink-0">
              <motion.div
                whileHover={{
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 1 },
                }}
                className="relative group w-30 h-30 ml-80"
              >
                <motion.img
                  src="bitlogo.png"
                  alt="Logo default"
                  className="absolute w-30 h-auto transition-opacity duration-600 opacity-100 group-hover:opacity-0"
                />
                <motion.img
                  src="bitlogo-hover.png"
                  alt="Logo hover"
                  className="absolute w-30 h-auto transition-opacity duration-600 opacity-0 group-hover:opacity-100"
                />
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Access button and manifest  */}
        <motion.div
          variants={slideUp}
          className={`${isMobile
            ? "flex flex-col items-center mt-16 space-y-6"
            : "ml-8 mt-20 md:mt-24  lg:mt-32"
            }`}
        >
          <motion.img
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            src="manifest.png"
            alt="bitcoinwala"
            className={`${isMobile ? "max-w-[200px] sm:max-w-[250px]" : "max-w-xs"
              } h-auto cursor-pointer`}
          />
          <motion.button
            onClick={handleDownload}
            className="group relative mt-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.img
              src="accessnow.png"
              alt="access now"
              className={`transition-opacity duration-300 opacity-100 ${isMobile ? "max-w-[180px] sm:max-w-[200px]" : "max-w-56"
                } h-auto cursor-pointer hover:opacity-80 `}

            />
          </motion.button>
        </motion.div>

        {/* Bitcoin Logo for Mobile  */}
        {isMobile && (
          <motion.div variants={slideUp} className="flex justify-center mt-12">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="relative group w-20 h-20 bg-transparent rounded-full flex items-center justify-center border border-gray-700"
            >
              <motion.img
                src="bitlogo.png"
                alt="Logo default"
                className="absolute w-full h-full transition-opacity duration-300 opacity-100 group-hover:opacity-0"
              />
              <motion.img
                src="bitlogo-hover.png"
                alt="Logo hover"
                className="absolute w-full h-full transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              />
            </motion.div>
          </motion.div>
        )}

        {/* Connect Section */}
        <motion.div
          variants={slideUp}
          className={` ${isMobile ? "mt-16 mb-8" : "absolute bottom-1 left-250"
            }`}
        >
          <motion.div className="flex items-end space-x-4 justify-center md:justify-end px-4 md:px-0 mt-10">
            <div className="text-left md:text-left">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex text-lg sm:text-xl text-white mb-4 tracking-widest justify-center md:justify-start"
              >
                <motion.img
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  src="/line.svg"
                  className="mr-2 w-4 h-4 sm:w-auto sm:h-auto"
                  alt="Decorative line separator"
                />
                Connect
              </motion.h3>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex space-x-6 sm:space-x-8 justify-center md:justify-end mt-2"
              >


                <motion.a
                  variants={slideUp}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://x.com/Bitcoinwalax?t=pR2Fmib9FeSt6f_PGjGBMQ&s=09"
                  target="_blank"
                  className="group relative text-gray-500 hover:text-white transition-colors w-5 h-6 sm:w-6 sm:h-7 inline-block"
                >
                  <motion.img
                    src="x.png"
                    alt="X (formerly Twitter) logo"
                    className="absolute w-full h-full transition-opacity duration-1000 opacity-100 group-hover:opacity-0 mr-2"
                  />
                  <motion.img
                    src="x-hover.png"
                    alt="X (formerly Twitter) logo - hover state"
                    className="absolute w-full h-full transition-opacity duration-1000 opacity-0 group-hover:opacity-100 mr-2"
                  />
                </motion.a>

                <motion.a
                  variants={slideUp}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://www.instagram.com/bitcoinwala.x?igsh=NXhqbjY0NHp2ZnRu"
                  target="_blank"
                  className="group relative text-gray-500 hover:text-white transition-colors w-5 h-6 sm:w-6 sm:h-7 inline-block"
                >
                  <motion.img
                    src="insta.png"
                    alt="Instagram logo"
                    className="absolute w-full h-full transition-opacity duration-1000 opacity-100 group-hover:opacity-0 mr-2"
                  />
                  <motion.img
                    src="insta-hover.png"
                    alt="Instagram logo - hover state"
                    className="absolute w-full h-full transition-opacity duration-1000 opacity-0 group-hover:opacity-100 mr-2"
                  />
                </motion.a>

                <motion.a
                  variants={slideUp}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://www.linkedin.com/company/bitcoinwalaofficial"
                  target="_blank"
                  className="group relative text-gray-500 hover:text-white transition-colors w-5 h-6 sm:w-6 sm:h-7 inline-block"
                >
                  <motion.img
                    src="linkedin.png"
                    alt="LinkedIn logo"
                    className="absolute w-full h-full transition-opacity duration-1000 opacity-100 group-hover:opacity-0 mr-2"
                  />
                  <motion.img
                    src="linkedin-hover.png"
                    alt="LinkedIn logo - hover state"
                    className="absolute w-full h-full transition-opacity duration-1000 opacity-0 group-hover:opacity-100 mr-2"
                  />
                </motion.a>

                <motion.a
                  variants={slideUp}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://t.me/bitcoinwalax"
                  target="_blank"
                  className="group relative text-gray-500 hover:text-white transition-colors w-5 h-6 sm:w-6 sm:h-7 inline-block"
                >
                  <motion.img
                    src="telegram.png"
                    alt="telegram logo"
                    className="absolute w-full h-full transition-opacity duration-1000 opacity-100 group-hover:opacity-0 mr-2"
                  />
                  <motion.img
                    src="telegram-hover.png"
                    alt="telegram logo - hover state"
                    className="absolute w-full h-full transition-opacity duration-1000 opacity-0 group-hover:opacity-100 mr-2"
                  />
                </motion.a>

              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Arrow */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default MissionSection;