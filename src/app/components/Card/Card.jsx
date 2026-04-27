import React from 'react';
import styles from "./Card.module.css";
import useItemStore from '@/store/itemstore';

export function Card({ data }) {
    const addItem = useItemStore((state) => state.addItem);

    const AddToCart = () => {
        addItem(data);
    };

    return (
        <div className={styles.cardContainer}>
            <h2>{data.title}</h2>
            <p>Price: {data.price}</p>
            <button className={styles.btn} onClick={AddToCart}>Add</button>
            { <p>{data.title}</p> }
        </div>
    );
}