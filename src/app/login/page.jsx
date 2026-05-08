'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/services/firebase';
import useUserStore from '@/store/userStore';
import styles from './page.module.css';

export default function LoginPage() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    if (!user && typeof window !== 'undefined') {
      const stored = localStorage.getItem('user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    }
  }, [user, setUser]);

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!isSignIn && formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const endpoint = isSignIn ? '/api/auth/login' : '/api/auth/register';
      const payload = isSignIn
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);

        if (isSignIn) {
          const loggedInUser = data.user || {
            uid: data.uid || '',
            name: data.name || '',
            email: formData.email,
            photoURL: data.photoURL || '',
          };
          setUser(loggedInUser);
          if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(loggedInUser));
          }
          router.push('/');
        } else {
          setIsSignIn(true);
          setFormData({ ...formData, name: '', confirmPassword: '' });
        }
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setMessage('');

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userData = {
        uid: user.uid,
        name: user.displayName || '',
        email: user.email || '',
        photoURL: user.photoURL || '',
      };

      setUser(userData);
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(userData));
      }

      console.log('Google user:', userData);
      setMessage(`Signed in as ${userData.name || userData.email}`);
      router.push('/');
    } catch (error) {
      console.error('Google sign-in failed:', error);
      setMessage(error.message || 'Google sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

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
            <button
              type="button"
              className={styles.googleButton}
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              {loading ? 'Opening Google…' : 'Continue with Google'}
            </button>
      </section>
    </main>
  );
}

