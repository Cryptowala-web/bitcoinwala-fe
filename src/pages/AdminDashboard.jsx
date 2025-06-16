import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CustomAlert from "../components/CustomAlert";
import { API } from "../api";

const ActionButton = ({ onClick, label, loading, bgColor }) => (
  <motion.button
    type="button"
    whileTap={{ scale: 0.95 }}
    whileHover={{ scale: 1.03 }}
    disabled={loading}
    onClick={onClick}
    className={`flex justify-center items-center gap-2 rounded-md px-3 py-1.5 text-sm font-semibold text-white shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 ${bgColor}`}
  >
    {loading ? (
      <motion.div
        className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    ) : (
      label
    )}
  </motion.button>
);

export default function AdminManagement() {
  const [activeAdmins, setActiveAdmins] = useState([]);
  const [adminRequests, setAdminRequests] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const fetchAdmins = async () => {
    try {
      const activeAdminsResponse = await fetch(`${API}/admin/active-admins`);
      const activeAdmins = await activeAdminsResponse.json();
      console.log("REsponse", activeAdmins);
      setActiveAdmins(activeAdmins);
      const pendingAdminResponse = await fetch(`${API}/admin/pending-admins`);
      const pendingAdmins = await pendingAdminResponse.json();
      setActiveAdmins(activeAdmins);
      setAdminRequests(pendingAdmins);
    } catch (error) {
      console.error("Failed to fetch admins", error);
      setAlertMessage("Failed to load admin data.");
      setAlertVisible(true);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleAccept = async (id) => {
    setLoadingId(id);
    setActionType("accept");
    try {
      const result = await fetch(`${API}/admin/approve-admin/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAlertMessage("Approved");

      setAlertVisible(true);
      await fetchAdmins(); 
    } catch (error) {
      setAlertMessage("Failed to approve admin.");
      setAlertVisible(true);
    } finally {
      setLoadingId(null);
      setActionType(null);
      setTimeout(() => setAlertVisible(false), 3000);
    }
  };

  const handleReject = async (id) => {
    setLoadingId(id);
    setActionType("reject");
    try {
      const result = await fetch(`${API}/admin/reject-admin/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAlertMessage("Rejected");
      setAlertVisible(true);
      await fetchAdmins();
    } catch (error) {
      setAlertMessage("Failed to reject admin.");
      setAlertVisible(true);
    } finally {
      setLoadingId(null);
      setActionType(null);
      setTimeout(() => setAlertVisible(false), 3000);   
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Management</h1>
      <CustomAlert
        message={alertMessage}
        show={alertVisible}
        onClose={() => setAlertVisible(false)}
      />
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-white/10 p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">Active Admins</h2>
          {activeAdmins.length === 0 ? (
            <p className="text-gray-300">No active admins.</p>
          ) : (
            <ul className="space-y-3">
              {activeAdmins.map((admin) => (
                <li
                  key={admin.id}
                  className="p-3 rounded-md bg-white/5 border border-white/10"
                >
                  <p className="font-medium">{admin.username}</p>
                  <p className="text-sm text-gray-300">{admin.email}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex-1 bg-white/10 p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">Admin Requests</h2>
          {adminRequests.length === 0 ? (
            <p className="text-gray-300">No admin requests.</p>
          ) : (
            <ul className="space-y-4">
              {adminRequests.map((request) => (
                <li
                  key={request.id}
                  className="p-4 rounded-md bg-white/5 border border-white/10"
                >
                  <p className="font-medium">{request.username}</p>
                  <p className="text-sm text-gray-300 mb-2">{request.email}</p>
                  <div className="flex gap-2">
                    <ActionButton
                      label="Accept"
                      onClick={() => handleAccept(request.id)}
                      loading={
                        loadingId === request.id && actionType === "accept"
                      }
                      bgColor="bg-green-600 hover:bg-green-700 focus:ring-green-500"
                    />
                    <ActionButton
                      label="Reject"
                      onClick={() => handleReject(request.id)}
                      loading={
                        loadingId === request.id && actionType === "reject"
                      }
                      bgColor="bg-red-600 hover:bg-red-700 focus:ring-red-500"
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
