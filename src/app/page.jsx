
import Chat from "@/app/components/ChatBot/ChatBot.jsx";

import styles from "./page.module.css";
import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.pageContainer}>
      <section className={styles.hero}>
        <div>
          <span className={styles.badge}>New collection</span>
          <h1>Shop smarter with premium electronics.</h1>
          <p>Find the latest gadgets, wearable tech, and smart home essentials in one place.</p>
          <div className={styles.ctaRow}>
            <Link href="/smartphone" className={styles.ctaButton}>Explore devices</Link>
            <Link href="/login" className={styles.secondaryButton}>Sign in</Link>
          </div>
        </div>
        <div className={styles.heroImageWrapper}>
          <img src="/images/home-page.jpg" alt="Premium gadgets" className={styles.heroImage} />
        </div>
      </section>

      <Chat />

      <section className={styles.features}>
        <article className={styles.featureCard}>
          <h2>Best sellers</h2>
          <p>Top-rated selections curated for speed, style, and everyday use.</p>
        </article>
        <article className={styles.featureCard}>
          <h2>Fast delivery</h2>
          <p>Order today and get your gear delivered quickly with trusted shipping.</p>
        </article>
        <article className={styles.featureCard}>
          <h2>Easy support</h2>
          <p>Reach out anytime for help, product advice, or order updates.</p>
        </article>
      </section>

    </main>
  );
}

