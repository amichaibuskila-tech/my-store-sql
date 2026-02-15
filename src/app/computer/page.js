'use client';

import React, { useState, useEffect } from 'react';
import { getComputers } from '@/services/data.js';
import { Card } from '@/app/components/Card/Card.jsx';


export default function Home() {

    useEffect(
        () => {
            fetch('/api/items')
                .then(response  => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('Error fetching items:', error));
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