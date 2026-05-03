'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function LoginPage() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <main className={styles.loginPage}>
      <section className={styles.loginCard}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${isSignIn ? styles.active : ''}`}
            onClick={() => setIsSignIn(true)}
          >
            Sign In
          </button>
          <button
            className={`${styles.tab} ${!isSignIn ? styles.active : ''}`}
            onClick={() => setIsSignIn(false)}
          >
            Sign Up
          </button>
        </div>
        <div className={styles.header}>
          <span className={styles.badge}>Member access</span>
          <h1>{isSignIn ? 'Sign in to your account' : 'Create your account'}</h1>
          <p>{isSignIn ? 'Login to manage your cart, orders, and account details.' : 'Join us to start shopping and managing your account.'}</p>
        </div>

        <form className={styles.form}>
          {!isSignIn && (
            <label className={styles.field}>
              <span>Full Name</span>
              <input type="text" placeholder="Enter your full name" />
            </label>
          )}
          <label className={styles.field}>
            <span>Email address</span>
            <input type="email" placeholder="you@example.com" />
          </label>
          <label className={styles.field}>
            <span>Password</span>
            <input type="password" placeholder="Enter your password" />
          </label>
          {!isSignIn && (
            <label className={styles.field}>
              <span>Confirm Password</span>
              <input type="password" placeholder="Confirm your password" />
            </label>
          )}
          <button type="submit" className={styles.submitButton}>
            {isSignIn ? 'Sign in' : 'Sign up'}
          </button>
        </form>

        <p className={styles.footerText}>
          {isSignIn ? (
            <>New here? <button onClick={() => setIsSignIn(false)} className={styles.linkButton}>Create an account</button></>
          ) : (
            <>Already have an account? <button onClick={() => setIsSignIn(true)} className={styles.linkButton}>Sign in</button></>
          )}
        </p>
      </section>
    </main>
  );
}

