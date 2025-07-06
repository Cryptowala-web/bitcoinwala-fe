/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Import components
import HeroSection from "../components/HeroSection.jsx";
import MissionSection from "../components/MissionSection.jsx";
import ComingSoonSection from "../components/ComingSoonSection.jsx";
import Footer from "../components/Footer.jsx";
import Bitcoin3DIframe from "./Bitcoin3DIframe.js";
import BitcoinTimelineGraph from "../components/TimeLineGraph.jsx";
import HeroModal from "../components/HeroModal.jsx";
import CardStack from "../components/CardStack.jsx";
import { API } from "../api";
import { JellooText } from "../components/TopSection/TopSection.jsx";
import Stats from "../components/Stats/Stats.jsx";
import AnimatedSection from "../components/CryptoHero/CryptoHero.jsx";
import { MaskContainer } from "../components/Title/Title.jsx";
import { ThreeDCardDemo } from "../components/AnnouncementDisplay.jsx";
import { SparklesPreview } from "../components/Sparkleee.jsx";

const staticData = [
  {
    title: "Welcome to the Platform",
    description: "Explore new features and stay updated with announcements.",
    image: "https://picsum.photos/id/1011/400/250",
    expiry_date: new Date().toISOString(),
    click_count: 12,
  },
  {
    title: "System Maintenance",
    description: "Scheduled maintenance on June 25, 10:00 AM to 12:00 PM IST.",
    image: "https://picsum.photos/id/1012/400/250",
    expiry_date: new Date().toISOString(),
    click_count: 8,
  },
  {
    title: "Feature Release: Dashboard 2.0",
    description: "A brand-new dashboard experience is here with better UX.",
    image: "https://picsum.photos/id/1013/400/250",
    expiry_date: new Date().toISOString(),
    click_count: 20,
  },
];

function HomePage() {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [announcementData, setAnnouncementData] = useState(staticData);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch(`${API}/announcement/`)
      .then((res) => res.json())
      .then((data) => setAnnouncementData(data))
      .catch((err) => console.error("Failed to fetch announcements:", err));
  }, []);

  const isMobile = windowWidth < 768;

  const sectionVariants = {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  const sectionTransition = {
    duration: 0.6,
  };

  return (
    <div className="relative min-h-full bg-black text-white font-['Montserrat',_sans-serif] overflow-y-scroll h-screen hide-scrollbar">
      {/* Hero Section */}

      {/* <motion.div
        variants={sectionVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        transition={sectionTransition}
      >
        <ThreeDCardDemo/>
      </motion.div> */}
      <motion.div
        variants={sectionVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        transition={sectionTransition}
      >
        <JellooText />
      </motion.div>
      <motion.div
        variants={sectionVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        transition={sectionTransition}
      >
        <AnimatedSection />
      </motion.div>
      <motion.div
        variants={sectionVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        transition={sectionTransition}
      >
        <Bitcoin3DIframe />
      </motion.div>

      {/* Mission Section */}
      <motion.div
        variants={sectionVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        transition={sectionTransition}
      >
        <MissionSection isMobile={isMobile} />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        transition={sectionTransition}
      >
        <Stats />
      </motion.div>
      <motion.div
        variants={sectionVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        transition={sectionTransition}
      >
        <BitcoinTimelineGraph />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        transition={sectionTransition}
      >
        <CardStack data={announcementData} />
        {/* <ThreeDCardDemo announcements={announcementData} /> */}
      </motion.div>
      {/* Coming Soon Section */}
      <motion.div
        variants={sectionVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        transition={sectionTransition}
      >
        <ComingSoonSection
          isSubscribeOpen={isSubscribeOpen}
          setIsSubscribeOpen={setIsSubscribeOpen}
        />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        transition={sectionTransition}
      >
        <SparklesPreview />
      </motion.div>
      {/* Footer */}
      <motion.div
        variants={sectionVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        transition={sectionTransition}
      >
        <Footer />
      </motion.div>
    </div>
  );
}

export default HomePage;
