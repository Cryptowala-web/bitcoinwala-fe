import React, { useState, useEffect, useRef } from "react";

const JelloText = () => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mouseInitialY, setMouseInitialY] = useState(0);
  const [charIndexSelected, setCharIndexSelected] = useState(0);
  const [dragYScale, setDragYScale] = useState(0);
  const [chars, setChars] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const text = "A mission driven by bitcoin, driven by vision";
  const weightInit = 600;
  const weightTarget = 400;
  const weightDiff = weightInit - weightTarget;
  const stretchInit = 150;
  const stretchTarget = 80;
  const stretchDiff = stretchInit - stretchTarget;
  const maxYScale = 1.8; // reduce to control distortion
  const elasticDropOff = 0.6; // faster dispersion

  // Explosion config
  const emitterSize = 100;
  const dotQuantity = 35;
  const dotSizeMax = 25;
  const dotSizeMin = 8;
  const speed = 1;
  const gravity = 1;

  useEffect(() => {
    const charArray = text.split("").map((char, index) => ({
      char,
      index,
      y: -200,
      fontWeight: weightInit,
      fontStretch: stretchInit,
      scaleY: 1,
      isAnimating: false,
      fallDelay: index * 0.05,
    }));
    setChars(charArray);
    setTimeout(() => {
      setHasLoaded(true);
      setChars((prevChars) =>
        prevChars.map((char) => ({
          ...char,
          y: 0,
          isAnimating: true,
        }))
      );
    }, 100);
  }, []);

  const calcDist = (mouseY) => {
    const charH = textRef.current ? textRef.current.offsetHeight : 100;
    const maxYDragDist = charH * (maxYScale - 1);
    const distY = mouseInitialY - mouseY;
    let newDragYScale = distY / maxYDragDist;
    newDragYScale = Math.max(Math.min(newDragYScale, maxYScale - 1), -0.5);
    setDragYScale(newDragYScale);
    return newDragYScale;
  };

  const calcFracDispersion = (index, dragScale) => {
    const dispersion =
      1 - Math.abs(index - charIndexSelected) / (chars.length * elasticDropOff);
    return Math.max(0, dispersion) * dragScale;
  };

  const updateCharDimensions = (dragScale) => {
    setChars((prevChars) =>
      prevChars.map((char, index) => {
        const fracDispersion = calcFracDispersion(index, dragScale);
        const elasticY = fracDispersion * -80;
        const elasticScaleY = Math.max(0.3, 1 + fracDispersion * 1.5);
        const elasticWeight = Math.max(
          100,
          weightInit - fracDispersion * weightDiff * 1.2
        );
        const elasticStretch = Math.max(
          50,
          stretchInit - fracDispersion * stretchDiff * 1.2
        );
        return {
          ...char,
          y: elasticY,
          fontWeight: elasticWeight,
          fontStretch: elasticStretch,
          scaleY: elasticScaleY,
          isAnimating: false,
        };
      })
    );
  };

  const snapBackText = () => {
    setChars((prevChars) =>
      prevChars.map((char) => ({
        ...char,
        y: 0,
        fontWeight: weightInit,
        fontStretch: stretchInit,
        scaleY: 1,
        isAnimating: true,
      }))
    );
  };

  const handleMouseDown = (e, index) => {
    e.preventDefault();
    setMouseInitialY(e.clientY);
    setCharIndexSelected(index);
    setIsMouseDown(true);
  };

  const handleMouseMove = (e) => {
    if (isMouseDown) {
      const dragScale = calcDist(e.clientY);
      updateCharDimensions(dragScale);
    }
  };

  const handleMouseUp = () => {
    if (isMouseDown) {
      setIsMouseDown(false);
      snapBackText();
    }
  };

  const handleMouseLeave = (e) => {
    if (
      e.clientY <= 0 ||
      e.clientX <= 0 ||
      e.clientX >= window.innerWidth ||
      e.clientY >= window.innerHeight
    ) {
      if (isMouseDown) {
        snapBackText();
        setIsMouseDown(false);
      }
    }
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();
    if (isMouseDown) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isMouseDown, mouseInitialY, charIndexSelected]);

  // Explosion utilities
  const setElementProps = (element, props) => {
    Object.keys(props).forEach((prop) => {
      if (prop === "x" || prop === "y") {
        const currentTransform = element.style.transform || "";
        const otherProp = prop === "x" ? "y" : "x";
        const otherMatch = currentTransform.match(
          otherProp === "x" ? /translateX\(([^)]+)\)/ : /translateY\(([^)]+)\)/
        );
        const otherValue = otherMatch ? otherMatch[1] : "0px";
        if (prop === "x") {
          element.style.transform = `translateX(${props[prop]}px) translateY(${otherValue})`;
        } else {
          element.style.transform = `translateX(${otherValue}) translateY(${props[prop]}px)`;
        }
      } else if (prop === "width" || prop === "height") {
        element.style[prop] = `${props[prop]}px`;
      } else if (prop === "opacity") {
        element.style[prop] = props[prop];
      }
    });
  };

  const animateElement = (
    element,
    props,
    duration,
    delay = 0,
    ease = "ease-out"
  ) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const startTime = performance.now();
        const startProps = {};
        Object.keys(props).forEach((prop) => {
          if (prop === "x" || prop === "y") {
            const transform = element.style.transform || "";
            const match = transform.match(
              prop === "x" ? /translateX\(([^)]+)\)/ : /translateY\(([^)]+)\)/
            );
            startProps[prop] = match ? parseFloat(match[1]) : 0;
          } else if (prop === "opacity") {
            startProps[prop] = parseFloat(element.style.opacity || 1);
          }
        });

        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / (duration * 1000), 1);
          const easeProgress =
            ease === "ease-out" ? 1 - Math.pow(1 - progress, 3) : progress;

          Object.keys(props).forEach((prop) => {
            const start = startProps[prop];
            const end = props[prop];
            const current = start + (end - start) * easeProgress;
            if (prop === "x" || prop === "y") {
              const currentTransform = element.style.transform || "";
              const otherProp = prop === "x" ? "y" : "x";
              const otherMatch = currentTransform.match(
                otherProp === "x"
                  ? /translateX\(([^)]+)\)/
                  : /translateY\(([^)]+)\)/
              );
              const otherValue = otherMatch ? otherMatch[1] : "0px";
              if (prop === "x") {
                element.style.transform = `translateX(${current}px) translateY(${otherValue})`;
              } else {
                element.style.transform = `translateX(${otherValue}) translateY(${current}px)`;
              }
            } else if (prop === "opacity") {
              element.style.opacity = current;
            }
          });

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            resolve();
          }
        };

        requestAnimationFrame(animate);
      }, delay * 1000);
    });
  };

  const createExplosion = (x, y) => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";
    container.style.left = `${x}px`;
    container.style.top = `${y}px`;

    const dots = [];
    for (let i = 0; i < dotQuantity; i++) {
      const dot = document.createElement("div");
      dot.className = "absolute rounded-full pointer-events-none";
      dot.style.background = "#f59e0b";
      const size = dotSizeMin + Math.random() * (dotSizeMax - dotSizeMin);
      const angle = Math.random() * Math.PI * 2;
      const length = Math.random() * (emitterSize / 3 - size / 2);
      container.appendChild(dot);
      setElementProps(dot, {
        x: Math.cos(angle) * length,
        y: Math.sin(angle) * length,
        width: size,
        height: size,
        opacity: 1,
      });

      const velocity = (100 + Math.random() * 250) * speed;
      const endX = Math.cos(angle) * velocity * 0.8;
      const endY = Math.sin(angle) * velocity * 0.8 + 500 * gravity * 0.3;

      dots.push({ dot, endX, endY });
    }

    dots.forEach(({ dot, endX, endY }) => {
      const duration = 1 + Math.random();
      animateElement(dot, { x: endX, y: endY }, duration);
      setTimeout(() => {
        animateElement(dot, { opacity: 0 }, 0.4);
      }, 700);
      setTimeout(() => {
        if (dot.parentNode) dot.parentNode.removeChild(dot);
      }, (duration + 0.4) * 1000);
    });
  };

  const handleExplosionTrigger = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    createExplosion(x, y);
  };

  return (
    <div
      onClick={handleExplosionTrigger}
      onMouseLeave={handleMouseLeave}
      style={{
        width: "100vw",
        maxHeight: "300px",
        height: "100vh",
        background: "black",
        fontFamily: '"Orbitron", sans-serif',
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Explosion Container */}
      <div
        ref={containerRef}
        className="absolute z-40 pointer-events-none"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* Centered Text */}
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          ref={textRef}
          style={{
            margin: 0,
            fontWeight: 400,
            fontStretch: "150%",
            userSelect: "none",
            textAlign: "center",
            fontSize: "5.5vw", // smaller to accommodate length
            lineHeight: 1.1, // for better vertical spacing
            letterSpacing: "0.15vw", // tighter for lowercase
          }}
        >
          {chars.map((charData, index) => {
            const transitionDuration = charData.isAnimating
              ? hasLoaded && charData.y === 0 && charData.scaleY === 1
                ? `${0.8 + charData.fallDelay}s`
                : "0.6s"
              : "none";

            const transitionTimingFunction = charData.isAnimating
              ? hasLoaded && charData.y === 0 && charData.scaleY === 1
                ? "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
                : "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              : "none";

            return (
              <span
                key={index}
                style={{
                  transform: `translateY(${charData.y}px) scaleY(${charData.scaleY})`,
                  fontWeight: charData.fontWeight,
                  fontStretch: `${charData.fontStretch}%`,
                  transition: `all ${transitionDuration} ${transitionTimingFunction}`,
                  transitionDelay: hasLoaded ? `${charData.fallDelay}s` : "0s",
                  transformOrigin: "center bottom",
                  display: "inline-block",
                  paddingTop: "1.08vw",
                }}
                onMouseDown={(e) => handleMouseDown(e, index)}
              >
                {charData.char}
              </span>
            );
          })}
        </h1>
      </div>
    </div>
  );
};

export default JelloText;
