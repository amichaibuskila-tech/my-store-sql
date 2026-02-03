'use client';

import React, { useState, useEffect } from 'react';
import { getPhones } from '@/services/data';
import { Card } from '@/app/components/Card/Card.jsx';


export default function SmartPhone() {
    console.log('RENDER')
    const [phones, setPhones] = useState([]);

    useEffect(
        () => {
            fetch('https://fakestoreapi.com/products').then(response => response.json()).then(data => setPhones(data));
        },
        []
    )



    return (
        <div className="smartphone-page page-container">
            <h1>SmartPhone Page</h1>
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