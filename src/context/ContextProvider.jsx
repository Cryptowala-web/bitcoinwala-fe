import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { API } from "../api";

export const ContentContext = createContext(null);

const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [networkError,setNetworkError] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      fetch(`${API}/admin/content`)
        .then(async (res) => {
          const data = await res.json();
          setContent(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setNetworkError(true);
          setLoading(false);
        });
    };
    fetchContent();
  }, []);


   if (networkError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8 text-center">
        <img
          src="/connection-error.png"
          alt="Connection Error"
          className="w-48 h-48 mb-4"
        />
        <h2 className="text-3xl font-bold mb-3">
          Oops! Can’t Reach the Server
        </h2>
        <p className="text-gray-400 mb-4">
          We’re having trouble connecting to our servers right now.
          <br />
          Please check back shortly.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-white text-white rounded hover:bg-gray-200 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <svg
          className="animate-spin h-12 w-12 text-white"
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
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      </div>
    );

  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  );
};

export default ContentProvider;
