import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AnnouncementForm({
  onClose,
  onSubmit,
  initialData,
  mode = "edit",
  loading,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    imagePreview: null,
    status: "draft",
    schedule_time: "",
    expiry_date: "",
    show_on_dashboard: true,
    send_email: false,
    created_by: "",
  });
  // const [loading, setLoading] = useState(false)

  const isEditable = mode === "create" || mode === "edit";

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        schedule_time: initialData.schedule_time
          ? new Date(initialData.schedule_time)
          : "",
        expiry_date: initialData.expiry_date
          ? new Date(initialData.expiry_date)
          : "",
        imagePreview: initialData.image || null,
        image: mode === "preview" ? null : null,
      }));
    }
  }, [initialData, mode]);

  const inputBaseClass =
    "block w-full rounded-md bg-white/5 text-white placeholder:text-white/60 px-3 py-1.5 border border-white/20 outline-none focus:ring-2 focus:ring-white focus:border-white transition-all sm:text-sm";

  const readOnlyInputClass =
    "block w-full rounded-md bg-white/10 text-white/50 px-3 py-1.5 border border-white/10 cursor-not-allowed sm:text-sm";

  const preventDrop = (e) => e.preventDefault();

  const handleChange = (e) => {
    if (!isEditable) return;
    const { name, type, value, files, checked } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        const previewURL = URL.createObjectURL(file);
        setFormData((prev) => ({
          ...prev,
          image: file,
          imagePreview: previewURL,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEditable) return;
    onSubmit(formData);
    // onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white/10 backdrop-blur-md border border-white/10 text-white max-w-3xl w-full p-8 rounded-xl shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">
            {mode === "create" && "Create Announcement"}
            {mode === "edit" && "Edit Announcement"}
            {mode === "preview" && "Preview Announcement"}
          </h2>
          <span
            className={`text-xs font-semibold uppercase px-3 py-1 rounded-full
              ${mode === "create" && "bg-green-500 text-white"}
              ${mode === "edit" && "bg-yellow-500 text-white"}
              ${mode === "preview" && "bg-blue-500 text-white"}
            `}
          >
            {mode}
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title & Status */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium">Title</label>
              <input
                type="text"
                name="title"
                required={isEditable}
                value={formData.title}
                onChange={handleChange}
                onDrop={preventDrop}
                onDragOver={preventDrop}
                className={isEditable ? inputBaseClass : readOnlyInputClass}
                readOnly={!isEditable}
                placeholder="Enter title"
              />
            </div>
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={isEditable ? inputBaseClass : readOnlyInputClass}
                disabled={!isEditable}
              >
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="published">Published</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              required={isEditable}
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className={`${
                isEditable ? inputBaseClass : readOnlyInputClass
              } resize-none`}
              readOnly={!isEditable}
              placeholder="Enter description"
            />
          </div>

          {/* Schedule Time & Expiry Date */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium">Schedule Time</label>
              <DatePicker
                selected={formData.schedule_time}
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, schedule_time: date }))
                }
                showTimeSelect
                dateFormat="Pp"
                className={isEditable ? inputBaseClass : readOnlyInputClass}
                disabled={!isEditable}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">Expiry Date</label>
              <DatePicker
                selected={formData.expiry_date}
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, expiry_date: date }))
                }
                dateFormat="yyyy-MM-dd"
                className={isEditable ? inputBaseClass : readOnlyInputClass}
                disabled={!isEditable}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium">Upload Image</label>
            {isEditable ? (
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="block w-full text-white file:rounded-md file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-white hover:file:bg-gray-600"
              />
            ) : (
              formData.imagePreview && (
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  className="mt-2 w-full h-40 object-contain border rounded"
                />
              )
            )}
            {formData.imagePreview && isEditable && (
              <img
                src={formData.imagePreview}
                alt="Preview"
                className="mt-2 w-full h-40 object-contain border rounded"
              />
            )}
          </div>

          {/* Checkboxes */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                name="show_on_dashboard"
                checked={formData.show_on_dashboard}
                onChange={handleChange}
                disabled={!isEditable}
              />
              Show on Dashboard
            </label>
            <label className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                name="send_email"
                checked={formData.send_email}
                onChange={handleChange}
                disabled={!isEditable}
              />
              Send Email
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <motion.button
              type="button"
              onClick={onClose}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              className="px-4 py-2 text-sm font-semibold text-white bg-gray-600 rounded hover:bg-gray-700"
            >
              Cancel
            </motion.button>
            {isEditable && (
              <motion.button
                type="submit"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
              >
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
                    {mode === "create" ? "Creating" : "Updating"}
                  </div>
                ) : mode === "create" ? (
                  "Create"
                ) : (
                  "Update"
                )}
              </motion.button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}
