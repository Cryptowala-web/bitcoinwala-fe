import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";
import AnnouncementForm from "./NewsLetter";
import CustomAlert from "./CustomAlert";
import { API } from "../api";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [deletingItem, setDeletingItem] = useState(null);
  const [formMode, setFormMode] = useState(null);
  const [formItem, setFormItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [publishLoading, setPublishLoading] = useState({});
  const [inactiveLoading, setInactiveLoading] = useState({});
  const [deleteLoading, setDeleteLoading] = useState({});

  const [updateLoading, setUpdateLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  const bitlogo  = "/biglog.png"

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API}/announcement`);
        const data = await res.json();
        console.log("fetched daa", data);
        setAnnouncements(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setTimeout(() => setAlertVisible(false), 3000);
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const openFormModal = (mode, item = null) => {
    setFormMode(mode);
    setFormItem(item);
  };

  const closeFormModal = () => {
    setFormMode(null);
    setFormItem(null);
  };

  const handleUpdate = async (formDataObj) => {
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    const id = parsedUser.id;

    const formDataToSend = new FormData();
    formDataToSend.append("title", formDataObj.title);
    formDataToSend.append("description", formDataObj.description);
    formDataToSend.append("status", formDataObj.status);
    formDataToSend.append(
      "schedule_time",
      formDataObj.schedule_time?.toISOString() || ""
    );
    formDataToSend.append(
      "expiry_date",
      formDataObj.expiry_date?.toISOString() || ""
    );
    formDataToSend.append("show_on_dashboard", formDataObj.show_on_dashboard);
    formDataToSend.append("send_email", formDataObj.send_email);
    formDataToSend.append("created_by", id);
    formDataToSend.append("image", formDataObj.image);

    if (formMode === "create") {
      setCreateLoading(true);
      try {
        const response = await fetch(`${API}/announcement/${id}`, {
          method: "POST",
          body: formDataToSend,
        });

        const created = await response.json();
        setAnnouncements((prev) => [created, ...prev]);
        setAlertMessage("Created successfully.");
        setAlertVisible(true);
      } catch (error) {
        setAlertMessage(created.error || "Failed to update, try Again");
        setAlertVisible(true);
      } finally {
        setCreateLoading(false);
        closeFormModal();
        setTimeout(() => setAlertVisible(false), 3000);
      }
    } else if (formMode === "edit") {
      setUpdateLoading(true);
      const announcementId = formItem.id;
      console.log("announcementid", announcementId);
      try {
        const response = await fetch(
          `${API}/announcement/${id}/${announcementId}`,
          {
            method: "PUT",
            body: formDataToSend,
          }
        );
        const updated = await response.json();
        setAnnouncements((prev) =>
          prev.map((item) =>
            item.id === updated.id ? { ...item, ...updated } : item
          )
        );
        setAlertMessage("Updated successfully.");
        setAlertVisible(true);
      } catch (error) {
        setAlertMessage(error.message || "Failed to update, try Again");
        setAlertVisible(true);
      } finally {
        setUpdateLoading(false);
        closeFormModal();
        setTimeout(() => setAlertVisible(false), 3000);
      }
    }
    // setLoading(false)
  };

  const confirmDelete = async () => {
    if (!deletingItem) return;
     const deletingId = deletingItem.id;
    setDeleteLoading((prev) => ({ ...prev, [deletingId]: true }));
    if (!deletingItem) return;
    try {
      await fetch(`${API}/announcement/${deletingItem.id}`, {
        method: "DELETE",
      });
      setAnnouncements((prev) =>
        prev.filter((item) => item.id !== deletingItem.id)
      );
      setAlertMessage("Deleted successfully.");
      setAlertVisible(true);
    } catch {
      setAlertMessage("Failed to delete.");
      setAlertVisible(true);
    } finally {
      setDeletingItem(null);
     setDeleteLoading((prev) => ({ ...prev, [deletingId]: false }));
      setTimeout(() => setAlertVisible(false), 3000);
    }
  };

  const handlePublish = async (announcementId) => {
    setPublishLoading((prev) => ({ ...prev, [announcementId]: true }));
    try {
      const res = await fetch(`${API}/announcement/${announcementId}/publish`, {
        method: "POST",
      });
      const updated = await res.json();

      if (res.ok) {
        setAnnouncements((prev) =>
          prev.map((item) =>
            item.id === updated.id ? { ...item, ...updated } : item
          )
        );
        setAlertMessage("Announcement published successfully.");
      } else {
        setAlertMessage(updated.error || "Failed to publish announcement.");
      }
    } catch (error) {
      console.error("Publish error:", error);
      setAlertMessage("Failed to publish announcement.");
    } finally {
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000);
      setPublishLoading((prev) => ({ ...prev, [announcementId]: false }));
    }
  };

  const markInactive = async (id) => {
    setInactiveLoading((prev) => ({ ...prev, [id]: true }));
    try {
      const response = await fetch(`${API}/announcement/${id}/inactive`, {
        method: "POST",
      });

      const updated = await response.json();

      setAnnouncements((prev) =>
        prev.map((a) => (a.id === updated.id ? { ...a, ...updated } : a))
      );

      setAlertMessage("Marked as inactive.");
      setAlertVisible(true);
    } catch (error) {
      console.error("Error marking inactive:", error);
      setAlertMessage("Failed to mark as inactive.");
      setAlertVisible(true);
    } finally {
      setTimeout(() => setAlertVisible(false), 3000);
      setInactiveLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.5, duration: 0.3 },
    },
    hover: { scale: 1.03 },
    tap: { scale: 0.97 },
  };

  if (loading) {
    return (
      <div className="mt-7 flex flex-row justify-center items-center gap-5 animate-pulse">
        <div className="flex justify-center my-6">
          <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-white text-center mt-2">
          Loading  announcements...
        </p>
      </div>
    );
  }
  return (
    <>
      <CustomAlert
        message={alertMessage}
        show={alertVisible}
        onClose={() => setAlertVisible(false)}
      />

      <div className="bg-black text-white px-6 py-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">Announcements</h1>
          <motion.button
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 transition-all"
            onClick={() => openFormModal("create")}
          >
            Create Announcement
          </motion.button>
        </div>

        {announcements.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-gray-400 text-lg bg-white/10 p-6 rounded-md"
          >
            🎉 No announcements yet. Click "Create Announcement" to add one!
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.03 }}
                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl shadow-md overflow-hidden flex flex-col"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image || bitlogo}
                    alt={item.title}
                    className="h-full w-full object-contain p-4"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
                  <p className="text-sm text-gray-300 flex-1">
                    {item.description}
                  </p>
                  <div className="mt-4 flex gap-1 justify-end flex-wrap">
                    {item.status !== "published" &&
                      item.status !== "inactive" && (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          whileHover={{ scale: 1.03 }}
                          onClick={() => handlePublish(item.id)}
                          className="px-3 py-1 text-sm font-semibold text-white border border-gray-400 rounded hover:bg-gray-200 hover:text-black"
                        >
                          {" "}
                          {publishLoading[item.id] ? (
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
                              Plublishing...
                            </div>
                          ) : (
                            <p>Publish</p>
                          )}
                        </motion.button>
                      )}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.03 }}
                      onClick={() => openFormModal("preview", item)}
                      className="px-3 py-1 text-sm font-semibold text-white border border-gray-400 rounded hover:bg-gray-200 hover:text-black"
                    >
                      Preview
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.03 }}
                      onClick={() => openFormModal("edit", item)}
                      className="px-3 py-1 text-sm font-semibold bg-amber-500 text-white rounded hover:bg-amber-600"
                    >
                      Edit
                    </motion.button>

                    {item.status !== "inactive" && (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.03 }}
                        onClick={() => markInactive(item.id)}
                        className="px-3 py-1 text-sm font-semibold text-white border border-gray-400 rounded hover:bg-gray-200 hover:text-black"
                      >
                        {inactiveLoading[item.id] ? (
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
                            Marking Inactive...
                          </div>
                        ) : (
                          <p>Mark Inactive</p>
                        )}
                      </motion.button>
                    )}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.03 }}
                      onClick={() => setDeletingItem(item)}
                      className="px-3 py-1 text-sm font-semibold text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white"
                    >
                      Delete
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

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
                className="bg-white rounded-lg w-full max-w-sm p-6 relative"
              >
                <button
                  onClick={() => setDeletingItem(null)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
                <h2 className="text-xl font-bold text-black mb-4 text-center">
                  Confirm Deletion
                </h2>
                <p className="text-sm text-gray-700 mb-6 text-center">
                  Are you sure you want to delete{" "}
                  <strong>"{deletingItem.title}"</strong>?
                </p>
                <div className="flex gap-4 justify-center">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setDeletingItem(null)}
                    className="px-4 py-2 text-sm font-semibold text-white border border-gray-400 rounded hover:bg-gray-100"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.03 }}
                    onClick={confirmDelete}
                    className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded hover:bg-red-500"
                  >
                    {deleteLoading[deletingItem.id] ? (
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
                      <p>Delete</p>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {formMode && (
            <AnnouncementForm
              mode={formMode}
              initialData={formItem}
              onClose={closeFormModal}
              onSubmit={handleUpdate}
              loading={formMode === "create" ? createLoading : updateLoading}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
