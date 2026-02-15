'use client';

import React, { useState, useEffect } from 'react';
// import { getComputers } from '@/services/data.js';
import { Card } from '@/app/components/Card/Card.jsx';


export default function Home() {
    const [items, setItems] = useState([]);

    useEffect(
        () => {
            fetch('/api/items')
                .then(res => res.json())
                .then(data => setItems(data))
                .catch(err => console.error(err));
        },
        []
    )


    return (
        <div className='page-container '>
            <h1>Computer Page</h1>

            <div className="grid">

                {/* {
                    getComputers().map(
                        (computer, idx) => {
                            return <Card key={idx} data={computer} />
                        }
                    )
                } */}

            </div>

        </div>
    );
}