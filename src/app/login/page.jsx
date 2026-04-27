import Link from 'next/link';
import styles from './page.module.css';

export default function LoginPage() {
  return (
    <main className={styles.loginPage}>
      <section className={styles.loginCard}>
        <div className={styles.header}>
          <span className={styles.badge}>Member access</span>
          <h1>Sign in to your account</h1>
          <p>Login to manage your cart, orders, and account details.</p>
        </div>

        <form className={styles.form}>
          <label className={styles.field}>
            <span>Email address</span>
            <input type="email" placeholder="you@example.com" />
          </label>
          <label className={styles.field}>
            <span>Password</span>
            <input type="password" placeholder="Enter your password" />
          </label>
          <button type="submit" className={styles.submitButton}>
            Sign in
          </button>
        </form>

        <p className={styles.footerText}>
          New here? <Link href="/">Explore the store</Link>
        </p>
      </section>
    </main>
  );
}
