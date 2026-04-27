import Link from 'next/link';
import styles from './Footer.module.css';
import { FaLinkedin } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.topRow}>
                <div className={styles.brand}>
                    <h3>My KSP Store</h3>
                    <p>Created by Amichai Buskila</p>
                </div>
                <div className={styles.links}>
                
                <div className={styles.links}>
                    <a 
                        href="https://www.linkedin.com/in/amichai-buskila-2a4a98397/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                    >
                        <FaLinkedin size={28} />
                    </a>
            </div>
                </div>
            </div>
            <div className={styles.bottomRow}>
                <p>© {new Date().getFullYear()} KSP.</p>
                <p>Built for great shopping experiences.</p>
            </div>
        </footer>
    );
}
