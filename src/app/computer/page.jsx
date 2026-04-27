'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/app/components/Card/Card.jsx';
import { getComputers } from '@/services/compProd.js';
import { getItemsByCategory } from '@/services/itemsClient.js';

export default function Home() {
    const [items, setItems] = useState([]);

    useEffect(() => { getItemsByCategory('electric').then(res => setItems(res)) }, [])

    return (
        <div className='page-container'>
            <h1>Electric Page</h1>

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