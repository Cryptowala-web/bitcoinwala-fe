import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import CustomAlert from "../components/CustomAlert";
import ChangePassword from "./ChangePassword";

import { API } from "../api";

export default function ForgotPasswordFlow() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isVerified, setIsverified] = useState(false);

  const handleEmailChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const preventDrop = (e) => {
    e.preventDefault();
  };

  const generateOtp = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const generatedOtp = generateOtp();
      const response = await fetch(`${API}/admin/request-reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          otp: generatedOtp,
        }),
      });

      const data = await response.json();
      setAlertMessage(data.message);
      setAlertVisible(true);

      if (response.status === 200) {
        setOtpSent(true);
        localStorage.setItem("email", formData.email);
        localStorage.setItem("otp", generatedOtp);
      } else {
        setAlertMessage(data.message || "Something went wrong.");
        setAlertVisible(true);
      }
    } catch (error) {
      setAlertMessage("Network error. Please try again.");
      setAlertVisible(true);
    } finally {
      setLoading(false);
      setTimeout(() => setAlertVisible(false), 3000);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (!value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const userOtp = otp.join("");
    if (localStorage.getItem("otp") !== userOtp) {
      setAlertMessage("Invalid OTP entered.");
      setAlertVisible(true);
    } else {
      setAlertMessage("Otp Verified");
      setAlertVisible(true);
      setIsverified(true);
    }
    setLoading(false);
  };

  return (
    <>
      <CustomAlert
        message={alertMessage}
        show={alertVisible}
        onClose={() => setAlertVisible(false)}
      />

      {!isVerified ? (
        <div className="min-h-screen flex flex-col items-center justify-start bg-black pt-20 px-4">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
            <img
              alt="Your Company"
              src="bitlogo.png"
              className="mx-auto h-50 w-auto"
            />
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-white">
              {!otpSent ? "Forgot Password" : "Verify Your Identity"}
            </h2>
          </div>

          {!otpSent ? (
            <form
              onSubmit={handleSendOtp}
              className="mt-10 w-full max-w-sm space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter Your Email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleEmailChange}
                    onDrop={preventDrop}
                    onDragOver={preventDrop}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                disabled={loading}
                className="flex w-full justify-center items-center gap-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 disabled:opacity-60"
              >
                {loading ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                  />
                ) : (
                  "Send OTP"
                )}
              </motion.button>
            </form>
          ) : (
            <form
              onSubmit={handleOtpSubmit}
              className="mt-10 w-full max-w-sm space-y-6"
            >
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    maxLength="1"
                    value={digit}
                    placeholder="•"
                    ref={(el) => (inputsRef.current[index] = el)}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-12 h-12 text-center text-black text-lg bg-white rounded-md focus:ring-2 focus:ring-indigo-600"
                  />
                ))}
              </div>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                disabled={loading}
                className="flex w-full justify-center items-center gap-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 disabled:opacity-60"
              >
                {loading ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                  />
                ) : (
                  "Submit OTP"
                )}
              </motion.button>
            </form>
          )}
        </div>
      ) : (
        <ChangePassword email={formData.email} />
      )}
    </>
  );
}
