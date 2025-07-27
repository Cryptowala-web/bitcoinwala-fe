import React from "react";
import styles from "./CryptoHero.module.css";


const AnimatedSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          src="/bitlogo-hover.png"
          alt="Animated"
          className={`${styles.image} ${styles.secondImage}`}
        />
      </div>
    </div>
  );
};

export default AnimatedSection;
