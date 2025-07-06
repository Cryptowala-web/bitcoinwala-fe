import React, { useMemo } from "react";

const Bitcoin3DIframe = () => {
  const iframeKey = useMemo(() => Date.now(), []);

  return (
    <iframe
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
