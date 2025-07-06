import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { API } from "./../api";
import CustomAlert from "./CustomAlert";
import ThankYouModal from "./ThankYouModal";
import { useNavigate } from "react-router-dom";

const SubscribeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
  });
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false); // 👈 NEW

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.5, duration: 0.3 },
    },
    hover: { scale: 1.03, transition: { duration: 0.2 } },
    tap: { scale: 0.97 },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API}/subscription/create-subscriber`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.status === 400 || !response.ok) {
        setAlertMessage("Subscription Failed, Already exists");
        setAlertVisible(true);
        return;
      }
      setFormData({
        name: "",
        email: "",
        phone: "",
        organization: "",
      });
      setShowThankYou(true);
    } catch (error) {
      setAlertMessage("Subscription Failed, try again later");
      setAlertVisible(true);
    } finally {
      setLoading(false);
      setTimeout(() => setAlertVisible(false), 3000);
    }
  };

  const handleThankYouClose = () => {
    setShowThankYou(false);
    navigate("/");
    
  };

  return (
    <>
      <CustomAlert
        message={alertMessage}
        show={alertVisible}
        onClose={() => setAlertVisible(false)}
      />

      <ThankYouModal show={showThankYou} onClose={handleThankYouClose} />

      <div className="max-w-lg mx-auto mt-10 bg-[#1a1a1a] border border-gray-600 p-6 rounded-xl shadow-lg text-white">
        <div className="flex justify-center mb-6">
          <img src="/logo.svg" alt="BitcoinWala Logo" className="h-12" />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center">
          Subscribe to BitcoinWala
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
            required
          />
          <input
            type="text"
            name="organization"
            placeholder="Organization (Optional)"
            value={formData.organization}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
          />

          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            className="mt-6"
          >
            <motion.button
              type="submit"
              className="w-full flex items-center justify-center py-2 rounded-lg bg-yellow-500 text-black font-bold transition-transform"
              whileHover="hover"
              whileTap="tap"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-6 w-6 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              ) : (
                <img
                  src="/longsubscribe.svg"
                  alt="Subscribe"
                  className="w-full h-full"
                />
              )}
            </motion.button>
          </motion.div>
        </form>
      </div>
    </>
  );
};

export default SubscribeForm;
