'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/app/components/Card/Card.jsx';



// export default function SmartWatch() {

    // return (
        
        // <div className="smartwatch-page page-container">
    //         <h1>SmartWatch Page</h1>
    //     </div>  
    // );
// }

export default function SmartWatch() {
    console.log('RENDER')
    const [watch, setWatch]= useState([]);

    useEffect(
        () => {
            fetch('https://fakestoreapi.com/products').then(response => response.json()).then(data => setWatch(data));
        },
        []
    )



    return (
        <div className="smartwatch-page page-container">
            <h1>SmartWatch Page</h1>
            <div className="grid">
                {

                    watch.map(
                        (watch, idx) => {
                            return <Card key={idx} data={watch} />
                        }
                    )
                }
            </div>
        </div>
    );
}