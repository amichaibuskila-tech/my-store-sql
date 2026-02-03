import React from 'react';
import styles from "./Card.module.css";

export function Card({ data }) {
    return (
        <div className={styles.cardContainer}>
            <h2>{data.title}</h2>
            <p>Price: {data.price}</p>

        </div>
    );
}