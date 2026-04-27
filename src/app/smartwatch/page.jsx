'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/app/components/Card/Card.jsx';
import { getItemsByCategory } from '@/services/itemsClient.js';


export default function SmartWatch() {
    const [items, setItems] = useState([]);

    useEffect(() => { getItemsByCategory('watches').then(res => setItems(res)) }, [])

    return (
        <div className="smartwatch-page page-container">
            <h1>SmartWatch Page</h1>

            <div className="grid">
                {items.map(
                    (item, idx) => {
                        return <Card key={idx} data={item} />
                    }
                )}
            </div>
        </div>
    );
}