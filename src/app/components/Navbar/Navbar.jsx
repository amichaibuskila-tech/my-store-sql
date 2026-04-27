import React from 'react';
import styles from "./Navbar.module.css";
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.brand}>
        <Link href="/">My Store</Link>
        <span>Smart gadgets for everyday life</span>
      </div>
      <nav className={styles.links}>
        <Link href="/computer">Electric</Link>
        <Link href="/smartphone">Smartphone</Link>
        <Link href="/smartwatch">Smartwatch</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/login" className={styles.loginButton}>Login</Link>
      </nav>
    </header>
  );
}
