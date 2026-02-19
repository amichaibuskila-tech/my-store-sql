'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/app/components/Card/Card.jsx';

export default function SmartPhone() {
    console.log('RENDER')
    const [phones, setPhones] = useState([]);
    const count = useStore((state) => state.count);
    const increment = useStore((state) => state.increment);


    useEffect(
        () => {
        },
        []
    )



    return (
        <div className="smartphone-page page-container">
            <h1>SmartPhone Page</h1>
            <h2>Count: {count} </h2>
            <button className='my-button' onClick={increment}>Increment</button>
            <div className="grid">
                {

                    phones.map(
                        (phone, idx) => {
                            return <Card key={idx} data={phone} />
                        }
                    )
                }
            </div>
        </div>
    );
}