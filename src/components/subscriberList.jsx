import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { API } from "../api";
import { useEffect } from "react";
import CustomAlert from "./CustomAlert";

export default function SubscriberList() {
  const [subscribers, setSubscribers] = useState([]);
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);
  const [softDeletingItem, setSoftDeletingItem] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [actionLoad, setActionLoad] = useState(false);
  const [emailLoading, setEmailLoading] = useState({});
  const [toggleLoading, setToggleLoading] = useState({});
  const [deleteSubscriberLoading, setDeleteSubscriberLoading] = useState({});

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API}/announcement`);
        const data = await res.json();
        setAnnouncements(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setTimeout(() => setAlertVisible(false), 3000);
        setLoading(false);
      }
    };

    fetchAnnouncements();
    const fetchSubscribers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/subscription`);
        if (!res.ok) {
          throw new Error("Failed to fetch subscribers");
        }
        const data = await res.json();
        setSubscribers(data);
      } catch (error) {
        console.error("Fetch subscribers error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  if (loading) {
   return (
      <div className="mt-7 flex flex-row justify-center items-center gap-5 animate-pulse">
        <div className="flex justify-center my-6">
          <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-white text-center mt-2">
          Loading Subscribers...
        </p>
      </div>
    );
  }

  const openModal = (subscriber) => {
    setSelectedSubscriber(subscriber);
    setSelectedAnnouncement(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedSubscriber(null);
    setSelectedAnnouncement(null);
    setShowModal(false);
  };

  const sendEmail = async (announcementId, subscriberId, subscriberEmail) => {
    try {
      setEmailLoading((prev) => ({ ...prev, [announcementId]: true }));

      const response = await fetch(
        `${API}/announcement/subscriber/${announcementId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subscriberId,
            subscriberEmail,
          }),
        }
      );

      const result = await response.json();
      console.log("response", response);
      if (response.ok) {
        closeModal();
        setAlertMessage(`Email sent to ${subscriberEmail}`);
      } else {
        setAlertMessage(result.message || "Failed to send email");
      }

      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000);
    } catch (error) {
      console.log(error);
      setAlertMessage("Network error. Please try again.");
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000);
    } finally {
      setTimeout(() => setAlertVisible(false), 3000);
      setEmailLoading((prev) => ({ ...prev, [announcementId]: false }));
  
    }
  };

  const toggleActive = async (id) => {
    try {
      setToggleLoading((prev) => ({ ...prev, [id]: true }));
      const res = await fetch(`${API}/subscription/${id}/toggle-active`, {
        method: "PATCH",
      });

      if (!res.ok) {
        setAlertMessage("Unable to toggle now.");
        setAlertVisible(true);
      }

      const updated = await res.json();
      setAlertMessage("Toggle Done.");
      setAlertVisible(true);

      setSubscribers((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, is_active: updated.is_active } : s
        )
      );
    } catch (error) {
      setAlertMessage("Unable to toggle now.");
      setAlertVisible(true);
    } finally {
      setToggleLoading((prev) => ({ ...prev, [id]: false }));
      setTimeout(() => setAlertVisible(false), 3000);
      setSoftDeletingItem(null);
    }
  };

  const confirmSoftDelete = async (id) => {
    setDeleteSubscriberLoading((prev) => ({ ...prev, [id]: true }));
    if (deletingItem) {
      try {
        const res = await fetch(`${API}/subscription/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          throw new Error("Failed to delete");
        }

        setSubscribers((prev) => prev.filter((s) => s.id !== id));
        setAlertMessage("Subscriber deleted.");
      } catch (error) {
        console.error("Delete error:", error);
        setAlertMessage("Unable to delete now.");
      } finally {
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 3000);
        setDeleteSubscriberLoading((prev) => ({ ...prev, [id]: false }));
        setDeletingItem(null);
      }
    }
  };

  return (
    <>
      {" "}
      <CustomAlert
        message={alertMessage}
        show={alertVisible}
        onClose={() => setAlertVisible(false)}
      />
      {subscribers.length === 0 ? (
        <>
          <h1 className="text-3xl font-bold mb-10 text-left">Subscribers</h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-gray-400 text-lg bg-white/10 p-6 rounded-md"
          >
            No Subscribers yet.
          </motion.div>
        </>
      ) : (
        <div className=" bg-black text-white px-6 py-10">
          <h1 className="text-3xl font-bold mb-10 text-center">Subscribers</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {subscribers.map((subscriber) => (
              <motion.div
                key={subscriber.id}
                whileHover={{ scale: 1.03 }}
                className="p-5 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl shadow-md flex flex-col justify-between transition-all duration-300"
              >
                {/* Details Section */}
                <div className="text-sm grid grid-cols-1 gap-1">
                  <p>
                    <span className="font-semibold">Name:</span>{" "}
                    {subscriber.name}
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {subscriber.phone}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {subscriber.email}
                  </p>
                  <p>
                    <span className="font-semibold">Organization:</span>{" "}
                    {subscriber.organization}
                  </p>
                  <p>
                    <span className="font-semibold">Subscribed:</span>{" "}
                    <span
                      className={
                        subscriber.is_subscribed
                          ? "text-green-500 font-medium"
                          : "text-red-500 font-medium"
                      }
                    >
                      {subscriber.is_subscribed ? "Yes" : "No"}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Active:</span>{" "}
                    <span
                      className={
                        subscriber.is_active
                          ? "text-green-500 font-medium"
                          : "text-red-500 font-medium"
                      }
                    >
                      {subscriber.is_active ? "Yes" : "No"}
                    </span>
                  </p>
                </div>

                {/* Buttons Section */}
                <div className="mt-5 flex flex-wrap justify-end gap-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setSoftDeletingItem(subscriber)}
                    className="px-3 py-1 text-xs font-semibold rounded bg-yellow-400 text-white hover:bg-yellow-500"
                  >
                    Toggle Active
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setDeletingItem(subscriber)}
                    className="px-3 py-1 text-xs font-semibold rounded bg-red-500 hover:bg-red-600 text-white"
                  >
                    Delete
                  </motion.button>

                  {subscriber.is_active && subscriber.is_subscribed && (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.03 }}
                      onClick={() => openModal(subscriber)}
                      className="px-3 py-1 text-xs font-semibold rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Send Email
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Email Modal */}
          <AnimatePresence>
            {showModal && selectedSubscriber && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
              >
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  className="bg-white text-black rounded-lg shadow-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Select Announcement</h3>
                    <button
                      onClick={closeModal}
                      className="text-gray-500 hover:text-black"
                    >
                      ✕
                    </button>
                  </div>

                  <p className="text-sm mb-2">
                    Send to: <strong>{selectedSubscriber.name}</strong>
                  </p>

                  {selectedAnnouncement && (
                    <div className="bg-blue-100 border border-blue-300 rounded-md p-4 mb-3">
                      <h4 className="text-md font-bold text-blue-800">
                        {selectedAnnouncement.title}
                      </h4>
                      <p className="text-sm text-blue-700">
                        {selectedAnnouncement.description}
                      </p>
                    </div>
                  )}

                  <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4 pr-1 mb-4">
                    {announcements.map((announcement) => (
                      <motion.div
                        key={announcement.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedAnnouncement(announcement)}
                        className={`cursor-pointer border p-3 rounded-lg transition ${
                          selectedAnnouncement?.id === announcement.id
                            ? "bg-blue-100 border-blue-400"
                            : "bg-white border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        <h4 className="font-semibold">{announcement.title}</h4>
                        <p className="text-sm text-gray-600">
                          {announcement.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex justify-end gap-4">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 text-sm font-semibold text-white bg-gray-200 rounded hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    {selectedAnnouncement && (
                      <button
                        onClick={() => {
                          sendEmail(
                            selectedAnnouncement.id,
                            selectedSubscriber.id,
                            selectedSubscriber.email
                          );
                        }}
                        className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        {emailLoading[selectedAnnouncement.id] ? (
                          <div className="flex justify-center items-center py-2 text-white">
                            <svg
                              className="animate-spin h-5 w-5 text-white mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 20"
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
                            Sending Email...
                          </div>
                        ) : (
                          <p>Send</p>
                        )}
                        {/* Send */}
                      </button>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Soft Delete Confirmation Modal */}
          <AnimatePresence>
            {softDeletingItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  className="bg-white rounded-lg w-full max-w-sm p-6 relative text-black"
                >
                  <button
                    onClick={() => setSoftDeletingItem(null)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-yellow-600"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <h2 className="text-xl font-bold mb-4 text-center">
                    Toggle Active Status
                  </h2>
                  <p className="text-sm text-gray-700 mb-6 text-center">
                    Do you want to{" "}
                    {softDeletingItem.is_active ? "deactivate" : "activate"}{" "}
                    <strong>{softDeletingItem.name}</strong>?
                  </p>

                  <div className="flex gap-4 justify-center">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.03 }}
                      onClick={() => setSoftDeletingItem(null)}
                      className="px-4 py-2 text-sm font-semibold border border-gray-400 rounded text-white-700 hover:bg-gray-100 text-white"
                    >
                      Cancel
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.03 }}
                      onClick={() => toggleActive(softDeletingItem.id)}
                      className="px-4 py-2 text-sm font-semibold text-white bg-yellow-400 rounded hover:bg-yellow-500"
                    >
                      {toggleLoading[softDeletingItem.id] ? (
                        <div className="flex justify-center items-center py-2 text-white">
                          <svg
                            className="animate-spin h-5 w-5 text-white mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
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
                          Toggling...
                        </div>
                      ) : (
                        <p>Confirm</p>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Permanent Delete Confirmation Modal */}
          <AnimatePresence>
            {deletingItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  className="bg-white rounded-lg w-full max-w-sm p-6 relative text-black"
                >
                  <button
                    onClick={() => setDeletingItem(null)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <h2 className="text-xl font-bold mb-4 text-center">
                    Confirm Deletion
                  </h2>
                  <p className="text-sm text-gray-700 mb-6 text-center">
                    Are you sure you want to permanently delete{" "}
                    <strong>{deletingItem.name}</strong>?
                  </p>

                  <div className="flex gap-4 justify-center">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.03 }}
                      onClick={() => setDeletingItem(null)}
                      className="px-4 py-2 text-sm text-white font-semibold border border-gray-400 rounded text-gray-700 hover:bg-gray-100"
                    >
                      Cancel
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.03 }}
                      onClick={() => confirmSoftDelete(deletingItem.id)}
                      className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded hover:bg-red-500"
                    >
                      {deleteSubscriberLoading[deletingItem.id] ? (
                        <div className="flex justify-center items-center py-2 text-white">
                          <svg
                            className="animate-spin h-5 w-5 text-white mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
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
                          Deleting...
                        </div>
                      ) : (
                        <p>Confirm Delete</p>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
