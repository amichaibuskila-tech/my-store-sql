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
            {data.image && <img src={data.image} alt={data.title} className={styles.image} />}
            <h2>{data.title}</h2>
            <p>Price: ${data.price}</p>
            <button className={styles.btn} onClick={AddToCart}>Add to Cart</button>
        </div>
    );
}