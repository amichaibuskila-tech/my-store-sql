'use client';

import React, { useState, useEffect, use } from 'react';
import { Table } from 'antd';

const columns = [

    {
        title: 'Name',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
    },
];

export default function Admin() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('/api/getAllItems').then(res => res.json()).then(data => setItems(data))
    }, [])

    return (
        <div className='page-container '>
            <h1>Admin Page</h1>
            <Table columns={columns} dataSource={items} rowKey="_id" />
        </div>
    );
}
