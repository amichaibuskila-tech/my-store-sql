

import styles from "./page.module.css";
import React from 'react';

export default function Home() {


  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1>Welcome to My Store</h1>
        <p> Discover our amazing products and offers! </p>
        <div className={styles.imageWrapper}>
          <img
            src="/images/home-page.jpg"
            alt="Home page"
            className={styles.homeImage}
          />
          <p className={styles.imageCaption}>Our store is ready for you.</p>
        </div>
      </div>
    </div>
  );
}

