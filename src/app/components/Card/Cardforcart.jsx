import React from 'react';
import styles from "./Card.module.css";
import useItemStore from '@/store/itemstore';

export function Card({ data }) {
    const addItem = useItemStore((state) => state.removeItem);

    const RemovefromCart = () => {
        removeItem(data);
    };

    return (
        <div className={styles.cardContainer}>
            <h2>{data.title}</h2>
            <p>Price: {data.price}</p>
            <button onClick={RemovefromCart}>Remove</button>
        </div>
    );
}