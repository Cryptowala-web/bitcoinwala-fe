// import React, { useState } from "react";

// const initialData = {
//   hero: {
//     title: "A Mission fueled by Bitcoin Driven by Vision",
//   },
//   parallax: [
//     [
//       "The Future Doesn’t Wait. Neither Do We",
//       "You’ve heard of Bitcoin Now meet the ones who are Leading through it. Owning the next financial era."
//     ],
//     ["It’s not “crypto.”", "It’s monetary firepower."],
//     ["Bitcoin is not an experiment.", "It’s a weapon against inflation. A borderless, bankless standard of value."],
//     ["21 million.", "No QE. No bailouts. No games."],
//     ["India Needs a Leader in This Space.", "Now it has one."],
//     ["We are Bitcoinwala.", "A bold treasury house. An asset management company that doesn’t follow trends — we set them."],
//     ["We Don’t Manage Coins.", "We engineer legacies. For family offices. For institutions. For builders and believers who see the world changing — and move before it does."],
//     ["Real Value.", "Real Scarcity. Radical Transparency. We hold Bitcoin because it’s truth in code. And we manage it like dynastic wealth — Secure. Strategic. Sovereign."],
//     ["Global Standards.", "🇮🇳 Born in India. We’re not a startup. We’re India’s answer to sovereign-grade crypto capital."],
//     ["Bitcoinwala is not just a brand.", "It’s a financial fortress. A symbol of what comes next."],
//     ["The End of Fiat Thinking.", "The Rise of Bitcoin Powerhouses."],
//     ["If you’re still asking why Bitcoin", "You’re already late."],
//     ["If you're asking who to trust with it", "You're right on time."],
//     ["We Are Bitcoinwala.", "Your Wealth. Upgraded. Future-Proofed. On-Chain."]
//   ],
//   manifesto: "Bitcoinwala Manifesto",
//   prices: "Bitcoin Prices",
//   timeline: "Bitcoin Evolution Timeline",
//   news: ["News Letter", "Announcements are good to go"],
//   coming: ["Coming Soon", "Join the New Standard"],
//   footer: ["Contact Us", "bitcoinwalaofficial@gmail.com"],
//   copyrights: ["© 2025. Bitcoinwala All Rights Reserved."]
// };

// const ContentManagement = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [data, setData] = useState(initialData);

//   const handleChange = (path, value) => {
//     const clone = JSON.parse(JSON.stringify(data));
//     let current = clone;
//     for (let i = 0; i < path.length - 1; i++) {
//       current = current[path[i]];
//     }
//     current[path[path.length - 1]] = value;
//     setData(clone);
//   };

//   const handleSave = () => {
//     console.log("Updated JSON:", data);
//     alert("JSON saved to console!");
//     setShowModal(false);
//   };

//   return (
//     <>
//       {/* Floating Edit Button */}
//       <button
//         onClick={() => setShowModal(true)}
//         className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition"
//       >
//         Edit Content
//       </button>

//       {/* Modal Overlay */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white/10 backdrop-blur-xl p-8 rounded-xl text-white relative">
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-4 right-4 text-white text-2xl hover:text-red-400"
//             >
//               &times;
//             </button>

//             <h1 className="text-3xl font-bold mb-6 text-center">Bitcoinwala Admin Panel</h1>

//             <div className="space-y-4">

//               {/* Hero */}
//               <div>
//                 <label className="block mb-1 text-gray-300">Hero Title</label>
//                 <input
//                   className="w-full p-2 rounded bg-white/20 focus:outline-none"
//                   value={data.hero.title}
//                   onChange={(e) => handleChange(["hero", "title"], e.target.value)}
//                 />
//               </div>

//               {/* Parallax */}
//               <div>
//                 <h2 className="text-xl mt-8 mb-4 text-gray-200">Parallax Sections</h2>
//                 {data.parallax.map((pair, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-white/10 p-4 rounded mb-4"
//                   >
//                     <label className="block mb-1 text-gray-300">Heading</label>
//                     <input
//                       className="w-full mb-2 p-2 rounded bg-white/20 focus:outline-none"
//                       value={pair[0]}
//                       onChange={(e) =>
//                         handleChange(["parallax", idx, 0], e.target.value)
//                       }
//                     />
//                     <label className="block mb-1 text-gray-300">Subheading</label>
//                     <textarea
//                       rows={3}
//                       className="w-full p-2 rounded bg-white/20 focus:outline-none"
//                       value={pair[1]}
//                       onChange={(e) =>
//                         handleChange(["parallax", idx, 1], e.target.value)
//                       }
//                     />
//                   </div>
//                 ))}
//               </div>

//               {/* Manifesto */}
//               <div>
//                 <label className="block mb-1 text-gray-300">Manifesto</label>
//                 <input
//                   className="w-full p-2 rounded bg-white/20 focus:outline-none"
//                   value={data.manifesto}
//                   onChange={(e) => handleChange(["manifesto"], e.target.value)}
//                 />
//               </div>

//               {/* Prices */}
//               <div>
//                 <label className="block mb-1 text-gray-300">Prices Title</label>
//                 <input
//                   className="w-full p-2 rounded bg-white/20 focus:outline-none"
//                   value={data.prices}
//                   onChange={(e) => handleChange(["prices"], e.target.value)}
//                 />
//               </div>

//               {/* Timeline */}
//               <div>
//                 <label className="block mb-1 text-gray-300">Timeline Title</label>
//                 <input
//                   className="w-full p-2 rounded bg-white/20 focus:outline-none"
//                   value={data.timeline}
//                   onChange={(e) => handleChange(["timeline"], e.target.value)}
//                 />
//               </div>

//               {/* News */}
//               <div>
//                 <h2 className="text-xl mt-8 mb-4 text-gray-200">News</h2>
//                 {data.news.map((item, idx) => (
//                   <div key={idx}>
//                     <input
//                       className="w-full mb-2 p-2 rounded bg-white/20 focus:outline-none"
//                       value={item}
//                       onChange={(e) => handleChange(["news", idx], e.target.value)}
//                     />
//                   </div>
//                 ))}
//               </div>

//               {/* Coming */}
//               <div>
//                 <h2 className="text-xl mt-8 mb-4 text-gray-200">Coming Section</h2>
//                 {data.coming.map((item, idx) => (
//                   <div key={idx}>
//                     <input
//                       className="w-full mb-2 p-2 rounded bg-white/20 focus:outline-none"
//                       value={item}
//                       onChange={(e) => handleChange(["coming", idx], e.target.value)}
//                     />
//                   </div>
//                 ))}
//               </div>

//               {/* Footer */}
//               <div>
//                 <h2 className="text-xl mt-8 mb-4 text-gray-200">Footer</h2>
//                 {data.footer.map((item, idx) => (
//                   <div key={idx}>
//                     <input
//                       className="w-full mb-2 p-2 rounded bg-white/20 focus:outline-none"
//                       value={item}
//                       onChange={(e) => handleChange(["footer", idx], e.target.value)}
//                     />
//                   </div>
//                 ))}
//               </div>

//               {/* Copyright */}
//               <div>
//                 <h2 className="text-xl mt-8 mb-4 text-gray-200">Copyright</h2>
//                 {data.copyrights.map((item, idx) => (
//                   <div key={idx}>
//                     <input
//                       className="w-full mb-2 p-2 rounded bg-white/20 focus:outline-none"
//                       value={item}
//                       onChange={(e) => handleChange(["copyrights", idx], e.target.value)}
//                     />
//                   </div>
//                 ))}
//               </div>

//               <button
//                 className="mt-8 w-full py-3 rounded bg-white/30 hover:bg-white/50 transition text-white font-bold"
//                 onClick={handleSave}
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ContentManagement;

// import React, { useState } from "react";

// const initialData = {
//   hero: {
//     title: "A Mission fueled by Bitcoin Driven by Vision",
//   },
//   parallax: [
//     [
//       "The Future Doesn’t Wait. Neither Do We",
//       "You’ve heard of Bitcoin Now meet the ones who are Leading through it. Owning the next financial era."
//     ],
//     ["It’s not “crypto.”", "It’s monetary firepower."],
//     ["Bitcoin is not an experiment.", "It’s a weapon against inflation. A borderless, bankless standard of value."],
//     ["21 million.", "No QE. No bailouts. No games."],
//     ["India Needs a Leader in This Space.", "Now it has one."],
//     ["We are Bitcoinwala.", "A bold treasury house. An asset management company that doesn’t follow trends — we set them."],
//     ["We Don’t Manage Coins.", "We engineer legacies. For family offices. For institutions. For builders and believers who see the world changing — and move before it does."],
//     ["Real Value.", "Real Scarcity. Radical Transparency. We hold Bitcoin because it’s truth in code. And we manage it like dynastic wealth — Secure. Strategic. Sovereign."],
//     ["Global Standards.", "🇮🇳 Born in India. We’re not a startup. We’re India’s answer to sovereign-grade crypto capital."],
//     ["Bitcoinwala is not just a brand.", "It’s a financial fortress. A symbol of what comes next."],
//     ["The End of Fiat Thinking.", "The Rise of Bitcoin Powerhouses."],
//     ["If you’re still asking why Bitcoin", "You’re already late."],
//     ["If you're asking who to trust with it", "You're right on time."],
//     ["We Are Bitcoinwala.", "Your Wealth. Upgraded. Future-Proofed. On-Chain."]
//   ],
//   manifesto: "Bitcoinwala Manifesto",
//   prices: "Bitcoin Prices",
//   timeline: "Bitcoin Evolution Timeline",
//   news: ["News Letter", "Announcements are good to go"],
//   coming: ["Coming Soon", "Join the New Standard"],
//   footer: ["Contact Us", "bitcoinwalaofficial@gmail.com"],
//   copyrights: ["© 2025. Bitcoinwala All Rights Reserved."]
// };

// const ContentManagement = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [data, setData] = useState(initialData);
//   const [openSection, setOpenSection] = useState(null);

//   const toggleSection = (name) => {
//     setOpenSection((prev) => (prev === name ? null : name));
//   };

//   const handleChange = (path, value) => {
//     const clone = JSON.parse(JSON.stringify(data));
//     let current = clone;
//     for (let i = 0; i < path.length - 1; i++) {
//       current = current[path[i]];
//     }
//     current[path[path.length - 1]] = value;
//     setData(clone);
//   };

//   const handleSave = () => {
//     console.log("Updated JSON:", data);
//     alert("JSON saved to console!");
//     setShowModal(false);
//   };

//   return (
//     <>
//       {/* Floating Edit Button */}
//       <button
//         onClick={() => setShowModal(true)}
//         className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition"
//       >
//         Edit Content
//       </button>

//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white/10 backdrop-blur-xl p-8 rounded-xl text-white relative">
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-4 right-4 text-white text-2xl hover:text-red-400"
//             >
//               &times;
//             </button>

//             <h1 className="text-3xl font-bold mb-6 text-center">Bitcoinwala Admin Panel</h1>

//             <div className="space-y-4">

//               {/* Hero Section */}
//               <Accordion
//                 title="Hero"
//                 isOpen={openSection === "hero"}
//                 onToggle={() => toggleSection("hero")}
//               >
//                 <label className="block mb-1 text-gray-300">Hero Title</label>
//                 <input
//                   className="w-full p-2 rounded bg-white/20 focus:outline-none"
//                   value={data.hero.title}
//                   onChange={(e) => handleChange(["hero", "title"], e.target.value)}
//                 />
//               </Accordion>

//               {/* Parallax Section */}
//               <Accordion
//                 title="Parallax"
//                 isOpen={openSection === "parallax"}
//                 onToggle={() => toggleSection("parallax")}
//               >
//                 {data.parallax.map((pair, idx) => (
//                   <div key={idx} className="bg-white/10 p-4 rounded mb-4">
//                     <label className="block mb-1 text-gray-300">Heading</label>
//                     <input
//                       className="w-full mb-2 p-2 rounded bg-white/20 focus:outline-none"
//                       value={pair[0]}
//                       onChange={(e) =>
//                         handleChange(["parallax", idx, 0], e.target.value)
//                       }
//                     />
//                     <label className="block mb-1 text-gray-300">Subheading</label>
//                     <textarea
//                       rows={3}
//                       className="w-full p-2 rounded bg-white/20 focus:outline-none"
//                       value={pair[1]}
//                       onChange={(e) =>
//                         handleChange(["parallax", idx, 1], e.target.value)
//                       }
//                     />
//                   </div>
//                 ))}
//               </Accordion>

//               {/* Manifesto Section */}
//               <Accordion
//                 title="Manifesto"
//                 isOpen={openSection === "manifesto"}
//                 onToggle={() => toggleSection("manifesto")}
//               >
//                 <input
//                   className="w-full p-2 rounded bg-white/20 focus:outline-none"
//                   value={data.manifesto}
//                   onChange={(e) => handleChange(["manifesto"], e.target.value)}
//                 />
//               </Accordion>

//               {/* Prices Section */}
//               <Accordion
//                 title="Prices"
//                 isOpen={openSection === "prices"}
//                 onToggle={() => toggleSection("prices")}
//               >
//                 <input
//                   className="w-full p-2 rounded bg-white/20 focus:outline-none"
//                   value={data.prices}
//                   onChange={(e) => handleChange(["prices"], e.target.value)}
//                 />
//               </Accordion>

//               {/* Timeline Section */}
//               <Accordion
//                 title="Timeline"
//                 isOpen={openSection === "timeline"}
//                 onToggle={() => toggleSection("timeline")}
//               >
//                 <input
//                   className="w-full p-2 rounded bg-white/20 focus:outline-none"
//                   value={data.timeline}
//                   onChange={(e) => handleChange(["timeline"], e.target.value)}
//                 />
//               </Accordion>

//               {/* News Section */}
//               <Accordion
//                 title="News"
//                 isOpen={openSection === "news"}
//                 onToggle={() => toggleSection("news")}
//               >
//                 {data.news.map((item, idx) => (
//                   <input
//                     key={idx}
//                     className="w-full mb-2 p-2 rounded bg-white/20 focus:outline-none"
//                     value={item}
//                     onChange={(e) =>
//                       handleChange(["news", idx], e.target.value)
//                     }
//                   />
//                 ))}
//               </Accordion>

//               {/* Coming Section */}
//               <Accordion
//                 title="Coming"
//                 isOpen={openSection === "coming"}
//                 onToggle={() => toggleSection("coming")}
//               >
//                 {data.coming.map((item, idx) => (
//                   <input
//                     key={idx}
//                     className="w-full mb-2 p-2 rounded bg-white/20 focus:outline-none"
//                     value={item}
//                     onChange={(e) =>
//                       handleChange(["coming", idx], e.target.value)
//                     }
//                   />
//                 ))}
//               </Accordion>

//               {/* Footer Section */}
//               <Accordion
//                 title="Footer"
//                 isOpen={openSection === "footer"}
//                 onToggle={() => toggleSection("footer")}
//               >
//                 {data.footer.map((item, idx) => (
//                   <input
//                     key={idx}
//                     className="w-full mb-2 p-2 rounded bg-white/20 focus:outline-none"
//                     value={item}
//                     onChange={(e) =>
//                       handleChange(["footer", idx], e.target.value)
//                     }
//                   />
//                 ))}
//               </Accordion>

//               {/* Copyright Section */}
//               <Accordion
//                 title="Copyright"
//                 isOpen={openSection === "copyrights"}
//                 onToggle={() => toggleSection("copyrights")}
//               >
//                 {data.copyrights.map((item, idx) => (
//                   <input
//                     key={idx}
//                     className="w-full mb-2 p-2 rounded bg-white/20 focus:outline-none"
//                     value={item}
//                     onChange={(e) =>
//                       handleChange(["copyrights", idx], e.target.value)
//                     }
//                   />
//                 ))}
//               </Accordion>

//               <button
//                 className="mt-8 w-full py-3 rounded bg-white/30 hover:bg-white/50 transition text-white font-bold"
//                 onClick={handleSave}
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// const Accordion = ({ title, children, isOpen, onToggle }) => (
//   <div className="border-b border-white/30">
//     <button
//       className="w-full text-left py-3 px-4 text-lg font-semibold flex justify-between items-center hover:bg-white/10 rounded"
//       onClick={onToggle}
//     >
//       <span>{title}</span>
//       <span>{isOpen ? "▲" : "▼"}</span>
//     </button>
//     {isOpen && (
//       <div className="py-4">
//         {children}
//       </div>
//     )}
//   </div>
// );

// export default ContentManagement;

import React, { useState,useEffect } from "react";
import { API } from "../../api";
const initialData = {
  hero: {
    title: "A Mission fueled by Bitcoin Driven by Vision",
  },
  parallax: [
    [
      "The Future Doesn’t Wait. Neither Do We",
      "You’ve heard of Bitcoin Now meet the ones who are Leading through it. Owning the next financial era.",
    ],
    ["It’s not “crypto.”", "It’s monetary firepower."],
    [
      "Bitcoin is not an experiment.",
      "It’s a weapon against inflation. A borderless, bankless standard of value.",
    ],
    ["21 million.", "No QE. No bailouts. No games."],
    ["India Needs a Leader in This Space.", "Now it has one."],
    [
      "We are Bitcoinwala.",
      "A bold treasury house. An asset management company that doesn’t follow trends — we set them.",
    ],
    [
      "We Don’t Manage Coins.",
      "We engineer legacies. For family offices. For institutions. For builders and believers who see the world changing — and move before it does.",
    ],
    [
      "Real Value.",
      "Real Scarcity. Radical Transparency. We hold Bitcoin because it’s truth in code. And we manage it like dynastic wealth — Secure. Strategic. Sovereign.",
    ],
    [
      "Global Standards.",
      "🇮🇳 Born in India. We’re not a startup. We’re India’s answer to sovereign-grade crypto capital.",
    ],
    [
      "Bitcoinwala is not just a brand.",
      "It’s a financial fortress. A symbol of what comes next.",
    ],
    ["The End of Fiat Thinking.", "The Rise of Bitcoin Powerhouses."],
    ["If you’re still asking why Bitcoin", "You’re already late."],
    ["If you're asking who to trust with it", "You're right on time."],
    ["We Are Bitcoinwala.", "Your Wealth. Upgraded. Future-Proofed. On-Chain."],
  ],
  manifesto: "Bitcoinwala Manifesto",
  prices: "Bitcoin Prices",
  timeline: "Bitcoin Evolution Timeline",
  news: ["News Letter", "Announcements are good to go"],
  coming: ["Coming Soon", "Join the New Standard"],
  footer: ["Contact Us", "bitcoinwalaofficial@gmail.com"],
  copyrights: ["© 2025. Bitcoinwala All Rights Reserved."],
};

const ContentManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [openSection, setOpenSection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/admin/content`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        // setSavedData(json);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  const toggleSection = (name) => {
    setOpenSection((prev) => (prev === name ? null : name));
  };

  const handleChange = (path, value) => {
    const clone = JSON.parse(JSON.stringify(data));
    let current = clone;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    setData(clone);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${API}/admin/content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      console.log(json);
      alert("Data saved!");
      setShowModal(false);
    } catch (e) {
      console.error(e);
      alert("Failed to save.");
    }
  };

  return (
    <>
      {/* Floating Edit Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition"
      >
        Edit Content
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white/10 backdrop-blur-xl p-8 rounded-xl text-white relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white text-2xl hover:text-red-400"
            >
              &times;
            </button>

            <h1 className="text-3xl font-bold mb-6 text-center">
              Bitcoinwala Admin Panel
            </h1>

            <div className="space-y-4">
              {Object.keys(data).map((key) => (
                <Accordion
                  key={key}
                  title={key.charAt(0).toUpperCase() + key.slice(1)}
                  isOpen={openSection === key}
                  onToggle={() => toggleSection(key)}
                >
                  {renderField(data, key, handleChange)}
                </Accordion>
              ))}

              <button
                className="mt-8 w-full py-3 rounded bg-white/30 hover:bg-white/50 transition text-white font-bold"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function renderField(data, key, handleChange) {
  const value = data[key];

  // If it's a string
  if (typeof value === "string") {
    return (
      <input
        className="w-full p-2 rounded bg-white/20 focus:outline-none"
        value={value}
        onChange={(e) => handleChange([key], e.target.value)}
      />
    );
  }

  // If it's an object
  if (typeof value === "object" && !Array.isArray(value)) {
    return Object.keys(value).map((subKey) => (
      <div key={subKey} className="mb-4">
        <label className="block mb-1 text-gray-300">{subKey}</label>
        <input
          className="w-full p-2 rounded bg-white/20 focus:outline-none"
          value={value[subKey]}
          onChange={(e) => handleChange([key, subKey], e.target.value)}
        />
      </div>
    ));
  }

  // If it's an array of arrays (like parallax)
  if (Array.isArray(value) && Array.isArray(value[0])) {
    return value.map((pair, idx) => (
      <div key={idx} className="bg-white/10 p-4 rounded mb-4">
        <label className="block mb-1 text-gray-300">Heading</label>
        <input
          className="w-full mb-2 p-2 rounded bg-white/20 focus:outline-none"
          value={pair[0]}
          onChange={(e) => handleChange([key, idx, 0], e.target.value)}
        />
        <label className="block mb-1 text-gray-300">Subheading</label>
        <textarea
          rows={3}
          className="w-full p-2 rounded bg-white/20 focus:outline-none"
          value={pair[1]}
          onChange={(e) => handleChange([key, idx, 1], e.target.value)}
        />
      </div>
    ));
  }

  // If it's an array of strings
  if (Array.isArray(value) && typeof value[0] === "string") {
    return value.map((item, idx) => (
      <input
        key={idx}
        className="w-full mb-2 p-2 rounded bg-white/20 focus:outline-none"
        value={item}
        onChange={(e) => handleChange([key, idx], e.target.value)}
      />
    ));
  }

  return <p>Unsupported data type.</p>;
}

const Accordion = ({ title, children, isOpen, onToggle }) => (
  <div className="border-b border-white/30">
    <button
      className="w-full text-left py-3 px-4 text-lg font-semibold flex justify-between items-center hover:bg-white/10 rounded"
      onClick={onToggle}
    >
      <span>{title}</span>
      <span>{isOpen ? "▲" : "▼"}</span>
    </button>
    {isOpen && <div className="py-4">{children}</div>}
  </div>
);

export default ContentManagement;
