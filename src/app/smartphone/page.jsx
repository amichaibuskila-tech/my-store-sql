'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/app/components/Card/Card.jsx';
import { getItemsByCategory } from '@/services/itemsClient.js';
import { useCustomHook } from '@/hooks/useMyState.js';

export default function SmartPhone() {
    const [items, setItems] = useState([]);

    useEffect(() => { getItemsByCategory('smartphone').then(res => setItems(res)) }, [])

    return (
        <div className="smartphone-page page-container">
            <h1>SmartPhone Page</h1>
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