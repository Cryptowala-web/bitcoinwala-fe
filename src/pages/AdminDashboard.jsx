import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CustomAlert from "../components/CustomAlert";
import { API } from "../api";
import Announcements from "../components/AnnouncementManagement";
import Footer from "../components/Footer";
import SubscriberList from "../components/subscriberList";
import SuperAdminEmail from "../components/SuperAdminEmail";
import WhitepaperCMSModal from "../components/WhitePaperCMSModal";
import ContentManagement from "../components/ContentManagement/ContentManagement";

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
  const [open, setOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false)
  const user = localStorage.getItem("user");
  const parsedUser = JSON.parse(user);
  const userRole = parsedUser.role;

  const fetchAdmins = async () => {
    try {
      const activeAdminsResponse = await fetch(`${API}/admin/active-admins`);
      const activeAdmins = await activeAdminsResponse.json();

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
      await fetch(`${API}/admin/approve-admin/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      setAlertMessage("Approved");
      setAlertVisible(true);
      await fetchAdmins();
    } catch {
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
      await fetch(`${API}/admin/reject-admin/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      setAlertMessage("Rejected");
      setAlertVisible(true);
      await fetchAdmins();
    } catch {
      setAlertMessage("Failed to reject admin.");
      setAlertVisible(true);
    } finally {
      setLoadingId(null);
      setActionType(null);
      setTimeout(() => setAlertVisible(false), 3000);
    }
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
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="flex justify-between items-center bg-black/30 backdrop-blur-sm px-4 py-3 rounded-md shadow-md mb-6">
        <h1 className="text-3xl font-bold">Admin Management</h1>
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          className="mt-6"
        >
          <motion.button
            type="submit"
            // className="w-full"
            whileHover="hover"
            whileTap="tap"
            className="w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-all duration-200"
            onClick={() => {
              localStorage.clear();
              sessionStorage.clear();
              window.location.href = "/";
            }}
          >
            Logout
          </motion.button>
        </motion.div>
      </div>
      <CustomAlert
        message={alertMessage}
        show={alertVisible}
        onClose={() => setAlertVisible(false)}
      />
      {userRole === "super_admin" && (
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
                    <p className="text-sm text-gray-300 mb-2">
                      {request.email}
                    </p>
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
      )}
      <Announcements />
      <SubscriberList />
      <div className="flex gap-6 justify-center mt-10 bg-black py-10">
      <div className="mt-10 flex items-center justify-center bg-black text-white">
        <button
          onClick={() => setOpen(true)}
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-white font-semibold"
        >
          Open Whitepaper CMS
        </button>

        <WhitepaperCMSModal isOpen={open} onClose={() => setOpen(false)} />
      </div>
      <div className="mt-10 flex items-center justify-center bg-black text-white">
        <button
          onClick={() => setIsEditOpen(true)}
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-white font-semibold"
        >
          Edit UI Content
        </button>

        <ContentManagement isOpen={isEditOpen} close={() => setIsEditOpen(false)} />
      </div>
      </div>
      {/* <ContentManagement/> */}
      {userRole === "super_admin" && <SuperAdminEmail />}
      <Footer />
    </div>
  );
}
