import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import CustomAlert from "../components/CustomAlert";

export default function ChangePassword({ email }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const preventDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setAlertMessage("Passwords do not match!");
      setAlertVisible(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API}/admin/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();
      setAlertMessage(data.message);
      setAlertVisible(true);
      if (response.status === 200) {
        setAlertMessage("Password changed successfully!");
        setAlertVisible(true);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        setAlertMessage(data.message);
        setAlertVisible(true);
      }
    } catch (error) {
      setAlertMessage("Something went wrong. Please try again.");
      setAlertVisible(true);
    } finally {
      setLoading(false);
      setTimeout(() => setAlertVisible(false), 3000);
    }
  };

  return (
    <>
      <CustomAlert
        message={alertMessage}
        show={alertVisible}
        onClose={() => setAlertVisible(false)}
      />
      <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-black">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img src="bitlogo.png" alt="Logo" className="mx-auto h-20 w-auto" />
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-white">
            Hi, {email} 👋
          </h2>
          <p className="mt-1 text-center text-sm text-gray-400">
            Let's change your password
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-white"
              >
                New Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  required
                  value={formData.newPassword}
                  onChange={handleChange}
                  onDrop={preventDrop}
                  onDragOver={preventDrop}
                  className="block w-full rounded-md bg-white px-3 py-1.5 pr-10 text-base text-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-white"
              >
                Confirm Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Re-enter new password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onDrop={preventDrop}
                  onDragOver={preventDrop}
                  className="block w-full rounded-md bg-white px-3 py-1.5 pr-10 text-base text-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword2((prev) => !prev)}
                >
                  {showPassword2 ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div>
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
                  "Submit"
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
