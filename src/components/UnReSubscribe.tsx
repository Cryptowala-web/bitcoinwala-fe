import { useState } from "react";
import { motion } from "framer-motion";
import bitlogo from "../../public/bitlogo.png"
import { API } from "../api";
import CustomAlert from "./CustomAlert";

export default function BitcoinUnsubscribeCard() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  const handleToggle = async () => {
    if (!email) {
      showAlert("Please enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      const endpoint = subscribed ? "/unsubscribe" : "/resubscribe";
      const response = await fetch(`${API}/subscription${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      console.log("REsponse", response)
      if(response.status>=404){
        showAlert("You haven't subscribe yet.")
        return
      }
      if (!response.ok) throw new Error("Request failed");

      const message = subscribed
        ? "Successfully unsubscribed."
        : "Successfully resubscribed.";
      showAlert(message);
      setSubscribed(!subscribed);
    } catch (err) {
        console.log(err)
      showAlert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (message: string) => {
    setAlertMessage(message);
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mt-10 p-6 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-xl text-white relative"
    >
      <CustomAlert
        message={alertMessage}
        show={alertVisible}
        onClose={() => setAlertVisible(false)}
      />

      <div className="flex flex-col items-center gap-3 mb-6 justify-center">
        <img src={bitlogo} alt="Bitcoin Logo" className="w-50 h-50" />
        <h4 className="text-white">Bitcoin Updates</h4>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 rounded-md bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          disabled={loading}
          onClick={handleToggle}
          className={`px-4 py-2 rounded-md bg-blue font-semibold text-white transition ${
            subscribed
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          } ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {loading
            ? "Please wait..."
            : subscribed
            ? "Unsubscribe"
            : "Resubscribe"}
        </button>
      </div>
    </motion.div>
  );
}
