import HomePage from "./pages/home";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";

function App() {
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -20,
    },
  };

  const pageTransition = {
    duration: 0.3,
  };

  return (
    <>
      <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
            >
              <HomePage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
    </>
  );
}

export default App;

