"use client";

import { useEffect } from 'react';
import styles from "./Navbar.module.css";
import Link from 'next/link';
import useUserStore from '@/store/userStore';

export default function Navbar() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    if (!user && typeof window !== 'undefined') {
      const stored = localStorage.getItem('user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    }
  }, [user, setUser]);

  const handleLogout = () => {
    clearUser();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  };

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
        {user ? (
          <>
            <span className={styles.userLabel}>
              Hi, {user.name ? user.name.split(' ')[0] : user.email}
            </span>
            <button type="button" onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className={styles.loginButton}>Login</Link>
        )}
      </nav>
    </header>
  );
}
