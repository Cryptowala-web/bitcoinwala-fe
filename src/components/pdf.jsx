import { X, Download } from "lucide-react";
import { motion } from "framer-motion";
import whitepaperJSON from "./whitepaper.json";
import { useEffect,useState } from "react";
import { API } from "../api";

const AnimatedWhitepaperModal = ({ isOpen, onClose }) => {
    const [data,setData] = useState(whitepaperJSON)
  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = "/BitcoinWala WHITE_PAPER.pdf";
    link.download = "BitcoinWala WHITE_PAPER.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchWhitepaper = async () => {
    const res = await fetch(`${API}/admin/api/whitepaper`);
    const data = await res.json();
    setData(data);
  };

  useEffect(() => {
    fetchWhitepaper();
  }, []);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-md p-4">
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-[#111] text-white max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl shadow-xl border border-gray-800 p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-cyan-400">
            BitcoinWala Whitepaper
          </h2>
          <div className="flex items-center gap-2">
            <button onClick={downloadPDF} title="Download">
              <Download className="w-5 h-5 text-blue-400 hover:text-blue-200" />
            </button>
            <button onClick={onClose} title="Close">
              <X className="w-5 h-5 text-red-400 hover:text-red-200" />
            </button>
          </div>
        </div>

        {/* Section Content */}
        {data.sections.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="mb-6"
          >
            <h3 className="text-lg font-semibold text-cyan-300 mb-2">
              {section.heading}
            </h3>

            <div className="space-y-2 text-sm text-gray-200 leading-relaxed">
              <motion.ul
                className="space-y-2 text-sm leading-relaxed text-gray-200"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.2,
                    },
                  },
                }}
              >
                {section.content.map((line, i) => (
                  <motion.li
                    key={i}
                    className="origin-top transform-gpu"
                    variants={{
                      hidden: { opacity: 0, rotateX: -90 },
                      visible: {
                        opacity: 1,
                        rotateX: 0,
                        transition: {
                          duration: 0.6,
                          ease: "easeOut",
                        },
                      },
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: "1000px",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    {line.trim().startsWith("- ") ? (
                      <div key={i} className="flex items-start pl-4">
                        <span className="mr-2 mt-1 text-cyan-400">•</span>
                        <p>{line.replace("- ", "")}</p>
                      </div>
                    ) : (
                      <p key={i}>{line}</p>
                    )}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AnimatedWhitepaperModal;
