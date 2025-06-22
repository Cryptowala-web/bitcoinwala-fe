import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import CustomAlert from "../components/CustomAlert";
import { API } from "../api";
import { motion } from "framer-motion";
import { replace, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      setAlertMessage(result.message);
      setAlertVisible(true);
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(result.user));
        if (result.user.role === "super_admin") {
          setTimeout(() => {
            navigate("/admin",replace);
          }, 1000);
        } else {
          setTimeout(() => {
            navigate("/admin",replace);
          }, 1000);
        }
        setFormData({
          email: "",
          password: "",
        });
      }
    } catch (err) {
      console.log(err)
      setAlertMessage(
        "Error occurred while logging in. Please try after some time."
      );
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
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
            Welcome Back, Amigos
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
                <div
                  className="text-sm"
                  onClick={() => navigate("/forgot-password")}
                >
                  <a
                    href="#"
                    className="font-semibold text-indigo-400 hover:text-indigo-300"
                  >
                    Forgot password?
                  </a>
                </div>
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
                  "Log In"
                )}
              </motion.button>
            </div>
          </form>
          <div className="mt-6 text-center text-sm text-white">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Register here
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
