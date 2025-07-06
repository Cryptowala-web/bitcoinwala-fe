import { useState } from "react";
import { motion } from "framer-motion";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { API } from "../api";
import CustomAlert from "./CustomAlert";

export default function SuperAdminEmail() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "test@example.com",
    password: "password123",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = localStorage.getItem("user");
      const parsedUser = JSON.parse(user);
      console.log("pasedUser id", parsedUser.id);
      const res = await fetch(`${API}/admin/email/${parsedUser.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.status===200) {
        setAlertMessage("Email sent and credentials saved successfully.");
        setAlertVisible(true);
        setIsEditing(false);
      } 
      else{
        setAlertMessage("Invalid credentials");
      setAlertVisible(true);
      }
    } catch (err) {
      console.log(err);
      setAlertMessage("Invalid credentials");
      setAlertVisible(true);
    } finally {
      setLoading(false);
      setTimeout(() => setAlertVisible(false), 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const preventDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <>
      <CustomAlert
        message={alertMessage}
        show={alertVisible}
        onClose={() => setAlertVisible(false)}
      />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="bitlogo.png"
            className="mx-auto h-50 w-auto"
          />
          <p className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
            * This Email is used to send Mails
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {!isEditing ? (
            <div className="bg-white/10 p-4 rounded-md shadow-sm text-white space-y-4">
              <div>
                <label className="text-sm font-medium text-white">Email</label>
                <p className="text-base text-gray-300">{formData.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-white">
                  Password
                </label>
                <p className="text-base text-gray-300">
                  {showPassword
                    ? formData.password
                    : "*".repeat(formData.password.length)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="text-sm font-semibold text-indigo-400 hover:text-indigo-300"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
                <button
                  className="text-sm font-semibold text-indigo-400 hover:text-indigo-300"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "Hide Password" : "Show Password"}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    onChange={handleChange}
                    onDrop={preventDrop}
                    onDragOver={preventDrop}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-white"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Your Password"
                    required
                    autoComplete="current-password"
                    value={formData.password}
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
          )}
        </div>
      </div>
    </>
  );
}
