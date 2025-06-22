import React, { useState, useEffect } from "react";
import { X, Download, Save } from "lucide-react";
import { API } from "../api";
import CustomAlert from "./CustomAlert";

export default function WhitepaperCMSModal({ isOpen, onClose }) {
  const [data, setData] = useState({ title: "", sections: [] });
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const fetchWhitepaper = async () => {
    const res = await fetch(`${API}/admin/api/whitepaper`);
    const data = await res.json();
    setData(data);
  };
  useEffect(() => {
    fetchWhitepaper();
  }, []);

  const handleChange = (sectionIndex, lineIndex, value) => {
    setData((prev) => {
      const updated = { ...prev };
      if (!updated.sections[sectionIndex]) return prev;
      const trimmed = value.trim();
      if (!trimmed) {
        updated.sections[sectionIndex].content.splice(lineIndex, 1);
      } else {
        updated.sections[sectionIndex].content[lineIndex] = trimmed;
      }
      if (
        updated.sections[sectionIndex] &&
        updated.sections[sectionIndex].content.length === 0 &&
        !updated.sections[sectionIndex].heading.trim()
      ) {
        updated.sections.splice(sectionIndex, 1);
      }
      return { ...updated };
    });
  };

  const handleHeadingChange = (sectionIndex, value) => {
    setData((prev) => {
      const updated = { ...prev };
      if (!updated.sections[sectionIndex]) return prev;

      const trimmed = value.trim();
      updated.sections[sectionIndex].heading = trimmed;
      if (
        trimmed === "" &&
        updated.sections[sectionIndex].content.length === 0
      ) {
        updated.sections.splice(sectionIndex, 1);
      }

      return { ...updated };
    });
  };

  const handleSave = async () => {
    await fetch(`${API}/admin/api/whitepaper`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setAlertMessage("Saved to Server");
    setAlertVisible(true);

    setTimeout(() => {
      setAlertVisible(false);
      onClose();
    }, 1500);
  };

  const addSection = () => {
    setData((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        { heading: "New Section", content: ["New point..."] },
      ],
    }));
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "bitcoinwala_whitepaper.json";
    link.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4 backdrop-blur">
      <CustomAlert
        message={alertMessage}
        show={alertVisible}
        onClose={() => setAlertVisible(false)}
      />
      <div className="bg-[#111] text-white max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl border border-gray-800 shadow-lg p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h2
            contentEditable
            suppressContentEditableWarning
            className="text-xl font-bold"
          >
            {data.title}
          </h2>
          <div className="flex gap-3">
            <button onClick={handleSave} title="Save Locally">
              <Save className="w-5 h-5 text-green-400 hover:text-green-200" />
            </button>
            <button onClick={downloadJSON} title="Download">
              <Download className="w-5 h-5 text-blue-400 hover:text-blue-200" />
            </button>
            <button onClick={addSection} title="Add Section">
              ➕
            </button>
            <button onClick={onClose} title="Close">
              <X className="w-5 h-5 text-red-400 hover:text-red-200" />
            </button>
            <p className="text-xs text-gray-500 mt-1">
              (Clear heading and all bullets to delete a section)
            </p>
          </div>
        </div>

        {data.sections.map((section, secIdx) => (
          <div key={secIdx} className="mb-6">
            <h3
              contentEditable
              suppressContentEditableWarning
              className="text-yellow-400 font-semibold text-lg mb-2"
              onBlur={(e) => handleHeadingChange(secIdx, e.target.textContent)}
            >
              {section.heading}
            </h3>
            <ul className="space-y-2 text-gray-200 text-sm">
              {section.content.map((line, lineIdx) => (
                <li
                  key={lineIdx}
                  contentEditable
                  suppressContentEditableWarning
                  className="border-l-2 pl-2 border-yellow-500 hover:bg-[#222] rounded-sm"
                  onBlur={(e) =>
                    handleChange(secIdx, lineIdx, e.target.textContent)
                  }
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
