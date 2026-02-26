'use client';

import React, { useState } from 'react';
import  useItemStore  from '@/store/itemstore.js';
import { Card } from '@/app/components/Card/Cardforcart.jsx';

export default function Cart() {

    const items = useItemStore((state) => state.items);
    console.log("cart");
    return (

        <div className='page-container'>

            <div className="grid">
                {

                    items.map(
                        (items, idx) => {
                            return <Card key={idx} data={items} />
                        }
                    )
                }
            </div>
        </div>
    );
}