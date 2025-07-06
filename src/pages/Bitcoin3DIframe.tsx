import React, { useMemo, useRef, useEffect, useContext } from "react";
import { ContentContext } from "../context/ContextProvider";

const Bitcoin3DIframe = () => {
  // const iframeKey = useMemo(() => Date.now(), []);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const iframeKey = useMemo(() => Date.now(), []);
  const content = useContext(ContentContext);

  useEffect(() => {
    if (iframeRef.current && content) {
      iframeRef.current.onload = () => {
        iframeRef.current?.contentWindow?.postMessage(
          content,
          "*" // or a specific origin if security matters
        );
      };
    }
  }, [content]);

  return (
    <iframe
      ref={iframeRef}
      src="./jk.html"
      sandbox="allow-scripts allow-same-origin"
      title="Bitcoin 3D Animation"
      style={{
        width: "100vw",
        height: "100vh",
        border: "none",
      }}
    />
  );
};

export default Bitcoin3DIframe;
