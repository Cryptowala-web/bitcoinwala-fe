import React from "react";
import styles from "./CryptoHero.module.css";

const textLines = ["Bit coin", "to", "the", " moon"];

const AnimatedSection = () => {
  return (
    <div className={styles.container}>
      {/* <div className={styles.left}>
        {textLines.map((line, lineIndex) => (
          <div key={lineIndex} className={styles.line}>
            {line.split('').map((letter, letterIndex) => (
              <span
                key={letterIndex}
                className={styles.letter}
                style={{
                  animationDelay: `${(letterIndex + lineIndex * 3) * 0.1}s`,
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        ))}
      </div> */}
      {/* <div className={styles.right}> */}
      <div className={styles.imageContainer}>
        {/* <img src="/bitlogo.png" alt="Animated" className={`${styles.image} ${styles.firstImage}`} /> */}
        <img
          src="/bitlogo-hover.png"
          alt="Animated"
          className={`${styles.image} ${styles.secondImage}`}
        />
      </div>
      {/* </div> */}
    </div>
  );
};

export default AnimatedSection;
