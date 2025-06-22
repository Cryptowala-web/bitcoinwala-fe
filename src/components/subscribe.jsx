import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import ThankYouModal from "./ThankYouModal";
import { motion, AnimatePresence } from "framer-motion";
import { API } from "../api";

function Subscribe({ show, closeModal }) {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    accountType: "individual",
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [showThankYou, setShowThankYou] = useState(false);
  const [errors, setErrors] = useState({});

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  // Debug useEffect to monitor showThankYou state changes
  useEffect(() => {
    console.log("showThankYou state changed:", showThankYou);
  }, [showThankYou]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields for both individual and company
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    // Additional validation for company type
    if (formData.accountType === "company") {
      if (!formData.companyName.trim()) {
        newErrors.companyName = "Company name is required";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      console.log("Form validation failed:", formErrors);
      return;
    }

    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    try {
      const response = await fetch(`${API}/subscription/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          organization:
            formData.accountType === "company" ? formData.companyName : "",
        }),
      });

      const data = await response.json();

      if (response.status !== 201) {
        setAlertMessage(
          data.message || "Something went wrong. Please try again."
        );
        setAlertVisible(true);
      } else {
        setShowThankYou(true);
      }
    } catch (error) {
      console.error("Subscription failed:", error);
      setAlertMessage(
        "Failed to subscribe. Please check your network or try again."
      );
      setAlertVisible(true);
    } finally {
      setLoading(false);
    }
    console.log("Form submitted:", formData);
    console.log("Setting showThankYou to true");
    setShowThankYou(true);
  };

  const handleThankYouClose = () => {
    setShowThankYou(false);
    closeModal();
  };

  if (!show) return null;

  const logoVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.2,
      },
    },
  };

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const modalVariants = {
    hidden: {
      scale: 0.9,
      opacity: 0,
      y: 20,
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        delay: 0.1,
      },
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.3,
      },
    }),
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

  return (
    <>
      {showThankYou ? (
        <ThankYouModal show={true} onClose={handleThankYouClose} />
      ) : (
        <AnimatePresence>
          {show && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-hidden">
              {/* Blurred background overlay */}
              <motion.div
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={closeModal}
              />

              {/* Modal Content */}
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative z-10 w-full max-w-lg border border-gray-500 rounded-2xl"
                style={{
                  backgroundColor: "#1a1a1a", // Matches the dark background from the image
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
                }}
              >
                {/* Header logo */}
                <motion.div
                  variants={logoVariants}
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-[40%] z-10 rounded-full"
                >
                  <img
                    src="/logo.svg"
                    alt="BitcoinWala"
                    className="h-16 sm:h-20 md:h-25"
                  />
                </motion.div>

                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 z-10"
                  onClick={closeModal}
                >
                  <X size={24} />
                </motion.button>

                {/* Form Header */}
                <div className="pt-8 pb-6 px-6 sm:px-8 text-center mt-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    Join the New Standard
                  </h2>
                </div>

                {/* Form Content */}
                <div className="px-8 sm:px-10 pb-3">
                  <motion.form onSubmit={handleSubmit} className="space-y-4">
                    {/* Individual/Company Buttons */}
                    <motion.div
                      custom={1}
                      variants={formItemVariants}
                      initial="hidden"
                      animate="visible"
                      className="grid grid-cols-2 gap-2 sm:gap-3 mb-6 w-4/5 mx-auto"
                    >
                      {/* Individual Button */}
                      <motion.button
                        type="button"
                        onClick={() =>
                          handleInputChange({
                            target: {
                              name: "accountType",
                              value: "individual",
                            },
                          })
                        }
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center justify-center bg-gray-800/50 rounded-lg border border-gray-700/50 hover:bg-gray-800/70 transition-colors duration-200"
                      >
                        <div className="flex items-center justify-center">
                          <img
                            src={
                              formData.accountType === "individual"
                                ? "/individual-selected.png"
                                : "/individual.png"
                            }
                            alt="Individual"
                            className="object-contain w-full h-full"
                          />
                        </div>
                      </motion.button>

                      {/* Company Button */}
                      <motion.button
                        type="button"
                        onClick={() =>
                          handleInputChange({
                            target: { name: "accountType", value: "company" },
                          })
                        }
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center justify-center bg-gray-800/50 rounded-lg border border-gray-700/50 hover:bg-gray-800/70 transition-colors duration-200"
                      >
                        <div className="flex items-center justify-center">
                          <img
                            src={
                              formData.accountType === "company"
                                ? "/company-selected.png"
                                : "/company.png"
                            }
                            alt="Company"
                            className="object-contain w-full h-full"
                          />
                        </div>
                      </motion.button>
                    </motion.div>

                    {/* Conditional Form Fields */}
                    {formData.accountType === "company" ? (
                      /* Company Form Fields */
                      <>
                        {/* Company Name Field */}
                        <motion.div
                          custom={2}
                          variants={formItemVariants}
                          initial="hidden"
                          animate="visible"
                          className="relative"
                        >
                          <input
                            type="text"
                            name="companyName"
                            id="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            placeholder="Company Name"
                            className={`peer w-full px-4 pt-6 pb-2 text-sm bg-[#242424] border rounded-lg text-white placeholder-transparent focus:outline-none transition-colors duration-200 ${
                              errors.companyName
                                ? "border-red-500 focus:border-red-400"
                                : "border-gray-700/50 focus:border-gray-500"
                            }`}
                            style={{
                              boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.3)",
                            }}
                          />
                          <label
                            htmlFor="companyName"
                            className="absolute left-4 top-2 text-xs text-gray-400 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                          >
                            Company Name
                          </label>
                          {errors.companyName && (
                            <p className="text-red-400 text-xs mt-1">
                              {errors.companyName}
                            </p>
                          )}
                        </motion.div>

                        {/* Last Name & First Name Row */}
                        <motion.div
                          custom={3}
                          variants={formItemVariants}
                          initial="hidden"
                          animate="visible"
                          className="grid grid-cols-2 gap-3"
                        >
                          <div className="relative">
                            <input
                              type="text"
                              name="firstName"
                              id="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              placeholder="First Name"
                              className={`peer w-full px-3 sm:px-4 pt-5 sm:pt-6 pb-1 sm:pb-2 text-xs sm:text-sm bg-[#242424] border rounded-lg text-white placeholder-transparent focus:outline-none transition-colors duration-200 ${
                                errors.firstName
                                  ? "border-red-500 focus:border-red-400"
                                  : "border-gray-700/50 focus:border-gray-500"
                              }`}
                              style={{
                                boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.3)",
                              }}
                            />
                            <label
                              htmlFor="firstName"
                              className="absolute left-3 sm:left-4 top-1.5 sm:top-2 text-xs text-gray-400 transition-all duration-200 peer-placeholder-shown:top-2.5 sm:peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs sm:peer-placeholder-shown:text-sm peer-focus:top-1.5 sm:peer-focus:top-2 peer-focus:text-xs"
                            >
                              First Name
                            </label>
                            {errors.firstName && (
                              <p className="text-red-400 text-xs mt-1">
                                {errors.firstName}
                              </p>
                            )}
                          </div>
                          <div className="relative">
                            <input
                              type="text"
                              name="lastName"
                              id="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              placeholder="Last Name"
                              className={`peer w-full px-3 sm:px-4 pt-5 sm:pt-6 pb-1 sm:pb-2 text-xs sm:text-sm bg-[#242424] border rounded-lg text-white placeholder-transparent focus:outline-none transition-colors duration-200 ${
                                errors.lastName
                                  ? "border-red-500 focus:border-red-400"
                                  : "border-gray-700/50 focus:border-gray-500"
                              }`}
                              style={{
                                boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.3)",
                              }}
                            />
                            <label
                              htmlFor="lastName"
                              className="absolute left-3 sm:left-4 top-1.5 sm:top-2 text-xs text-gray-400 transition-all duration-200 peer-placeholder-shown:top-2.5 sm:peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs sm:peer-placeholder-shown:text-sm peer-focus:top-1.5 sm:peer-focus:top-2 peer-focus:text-xs"
                            >
                              Last Name
                            </label>
                            {errors.lastName && (
                              <p className="text-red-400 text-xs mt-1">
                                {errors.lastName}
                              </p>
                            )}
                          </div>
                        </motion.div>

                        {/* Email */}
                        <motion.div
                          custom={4}
                          variants={formItemVariants}
                          initial="hidden"
                          animate="visible"
                          className="relative"
                        >
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className={`peer w-full px-4 pt-6 pb-2 text-sm bg-[#242424] border rounded-lg text-white placeholder-transparent focus:outline-none transition-colors duration-200 ${
                              errors.email
                                ? "border-red-500 focus:border-red-400"
                                : "border-gray-700/50 focus:border-gray-500"
                            }`}
                            style={{
                              boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.3)",
                            }}
                          />
                          <label
                            htmlFor="email"
                            className="absolute left-4 top-2 text-xs text-gray-400 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                          >
                            Email
                          </label>
                          {errors.email && (
                            <p className="text-red-400 text-xs mt-1">
                              {errors.email}
                            </p>
                          )}
                        </motion.div>

                        {/* Phone Number */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                          className="relative"
                        >
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Phone Number"
                            className={`peer w-full px-4 pt-6 pb-2 text-sm bg-[#242424] border rounded-lg text-white placeholder-transparent focus:outline-none transition-colors duration-200 ${
                              errors.phone
                                ? "border-red-500 focus:border-red-400"
                                : "border-gray-700/50 focus:border-gray-500"
                            }`}
                            style={{
                              boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.3)",
                            }}
                          />
                          <label
                            htmlFor="phone"
                            className="absolute left-4 top-2 text-xs text-gray-400 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                          >
                            Phone Number
                          </label>
                          {errors.phone && (
                            <p className="text-red-400 text-xs mt-1">
                              {errors.phone}
                            </p>
                          )}
                        </motion.div>
                      </>
                    ) : (
                      /* Individual Form Fields */
                      <>
                        {/* First Name & Last Name Row */}
                        <motion.div
                          custom={2}
                          variants={formItemVariants}
                          initial="hidden"
                          animate="visible"
                          className="grid grid-cols-2 gap-3"
                        >
                          <div className="relative">
                            <input
                              type="text"
                              name="firstName"
                              id="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              placeholder="First Name"
                              className={`peer w-full px-3 sm:px-4 pt-5 sm:pt-6 pb-1 sm:pb-2 text-xs sm:text-sm bg-[#242424] border rounded-lg text-white placeholder-transparent focus:outline-none transition-colors duration-200 ${
                                errors.firstName
                                  ? "border-red-500 focus:border-red-400"
                                  : "border-gray-700/50 focus:border-gray-500"
                              }`}
                              style={{
                                boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.3)",
                              }}
                            />
                            <label
                              htmlFor="firstName"
                              className="absolute left-3 sm:left-4 top-1.5 sm:top-2 text-xs text-gray-400 transition-all duration-200 peer-placeholder-shown:top-2.5 sm:peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs sm:peer-placeholder-shown:text-sm peer-focus:top-1.5 sm:peer-focus:top-2 peer-focus:text-xs"
                            >
                              First Name
                            </label>
                            {errors.firstName && (
                              <p className="text-red-400 text-xs mt-1">
                                {errors.firstName}
                              </p>
                            )}
                          </div>
                          <div className="relative">
                            <input
                              type="text"
                              name="lastName"
                              id="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              placeholder="Last Name"
                              className={`peer w-full px-3 sm:px-4 pt-5 sm:pt-6 pb-1 sm:pb-2 text-xs sm:text-sm bg-[#242424] border rounded-lg text-white placeholder-transparent focus:outline-none transition-colors duration-200 ${
                                errors.lastName
                                  ? "border-red-500 focus:border-red-400"
                                  : "border-gray-700/50 focus:border-gray-500"
                              }`}
                              style={{
                                boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.3)",
                              }}
                            />
                            <label
                              htmlFor="lastName"
                              className="absolute left-3 sm:left-4 top-1.5 sm:top-2 text-xs text-gray-400 transition-all duration-200 peer-placeholder-shown:top-2.5 sm:peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs sm:peer-placeholder-shown:text-sm peer-focus:top-1.5 sm:peer-focus:top-2 peer-focus:text-xs"
                            >
                              Last Name
                            </label>
                            {errors.lastName && (
                              <p className="text-red-400 text-xs mt-1">
                                {errors.lastName}
                              </p>
                            )}
                          </div>
                        </motion.div>

                        {/* Email */}
                        <motion.div
                          custom={3}
                          variants={formItemVariants}
                          initial="hidden"
                          animate="visible"
                          className="relative"
                        >
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className={`peer w-full px-4 pt-6 pb-2 text-sm bg-[#242424] border rounded-lg text-white placeholder-transparent focus:outline-none transition-colors duration-200 ${
                              errors.email
                                ? "border-red-500 focus:border-red-400"
                                : "border-gray-700/50 focus:border-gray-500"
                            }`}
                            style={{
                              boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.3)",
                            }}
                          />
                          <label
                            htmlFor="email"
                            className="absolute left-4 top-2 text-xs text-gray-400 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                          >
                            Email
                          </label>
                          {errors.email && (
                            <p className="text-red-400 text-xs mt-1">
                              {errors.email}
                            </p>
                          )}
                        </motion.div>

                        {/* Phone Number */}
                        <motion.div
                          custom={4}
                          variants={formItemVariants}
                          initial="hidden"
                          animate="visible"
                          className="relative"
                        >
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Phone Number"
                            className={`peer w-full px-4 pt-6 pb-2 text-sm bg-[#242424] border rounded-lg text-white placeholder-transparent focus:outline-none transition-colors duration-200 ${
                              errors.phone
                                ? "border-red-500 focus:border-red-400"
                                : "border-gray-700/50 focus:border-gray-500"
                            }`}
                            style={{
                              boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.3)",
                            }}
                          />
                          <label
                            htmlFor="phone"
                            className="absolute left-4 top-2 text-xs text-gray-400 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                          >
                            Phone Number
                          </label>
                          {errors.phone && (
                            <p className="text-red-400 text-xs mt-1">
                              {errors.phone}
                            </p>
                          )}
                        </motion.div>
                      </>
                    )}

                    {/* Subscribe Button */}
                    <motion.div
                      variants={buttonVariants}
                      initial="hidden"
                      animate="visible"
                      className="mt-6"
                    >
                      <motion.button
                        type="submit"
                        className="w-full"
                        whileHover="hover"
                        whileTap="tap"
                        disabled={loading}
                      >
                        {/* <img
                          src="/longsubscribe.svg"
                          alt="Subscribe"
                          className="w-full h-full"
                        /> */}
                        {loading ? (
                          <div className="flex justify-center items-center py-2 text-white">
                            <svg
                              className="animate-spin h-5 w-5 text-white mr-2"
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
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                              ></path>
                            </svg>
                            Subscribing...
                          </div>
                        ) : (
                          <img
                            src="/longsubscribe.svg"
                            alt="Subscribe"
                            className="w-full h-full"
                          />
                        )}
                      </motion.button>
                    </motion.div>
                  </motion.form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}

export default Subscribe;
