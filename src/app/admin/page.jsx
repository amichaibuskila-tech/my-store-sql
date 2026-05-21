'use client';

import React, { useState, useEffect } from 'react';
import { Table, Form, Input, InputNumber, Button, Modal, message, Tabs } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default function Admin() {
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    const handleDelete = async (id) => {
        console.log(id);
        await fetch(`api/items?id=${id}`, {
            method: "DELETE"
        })

        setItems(prevItems => prevItems.filter(item => item._id !== id))
    }

    const handleDeleteUser = async (id) => {
        try {
            const res = await fetch(`/api/users?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setUsers(prev => prev.filter(u => String(u._id) !== String(id)));
                message.success('User deleted');
            } else {
                const err = await res.json();
                message.error(err.error || 'Failed to delete user');
            }
        } catch (err) {
            console.error(err);
            message.error('Failed to delete user');
        }
    }

    const handleAddItem = async (values) => {
        setLoading(true);
        try {
            const response = await fetch('/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            
            if (response.ok) {
                const data = await response.json();
                message.success('Item added successfully!');
                form.resetFields();
                setIsModalOpen(false);
                // Refresh items list
                fetch('/api/getAllItems').then(res => res.json()).then(data => setItems(data));
            } else {
                const error = await response.json();
                message.error(error.error || 'Failed to add item');
            }
        } catch (error) {
            console.error(error);
            message.error('Error adding item');
        } finally {
            setLoading(false);
        }
    }

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
        {
            title: 'removeItem',
            key: 'removeItem',
            render: (_, record) => (
                <button onClick={() => handleDelete(record._id)}>Delete</button>
            )
        }
    ];

    const userColumns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Provider', dataIndex: 'provider', key: 'provider' },
        { title: 'Photo', dataIndex: 'photoURL', key: 'photoURL', render: (url) => url ? <img src={url} alt="avatar" style={{ width: 40, height: 40, borderRadius: 20 }} /> : null },
        { title: 'Created', dataIndex: 'createdAt', key: 'createdAt', render: (v) => v ? new Date(v).toLocaleString() : '' },
        { title: 'Actions', key: 'actions', render: (_, record) => (<button onClick={() => handleDeleteUser(record._id)}>Delete</button>) }
    ];



    useEffect(() => {
        fetch('/api/getAllItems').then(res => res.json()).then(data => setItems(data))
        fetch('/api/users').then(res => res.json()).then(data => setUsers(data))
    }, [])

    return (
        <div className='page-container '>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Admin Page</h1>
                <Button 
                    type="primary" 
                    icon={<PlusOutlined />} 
                    onClick={() => setIsModalOpen(true)}
                >
                    Add New Item
                </Button>
            </div>
            <Tabs
                defaultActiveKey="items"
                items={[
                    {
                        key: 'items',
                        label: 'Items',
                        children: <Table columns={columns} dataSource={items} rowKey="_id" />,
                    },
                    {
                        key: 'users',
                        label: 'Users',
                        children: <Table columns={userColumns} dataSource={users} rowKey="_id" />,
                    }
                ]}
            />
            
            <Modal
                title="Add New Item"
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                    form.resetFields();
                }}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleAddItem}
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please enter item title' }]}
                    >
                        <Input placeholder="Item title" />
                    </Form.Item>
                    
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please enter item price' }]}
                    >
                        <InputNumber placeholder="Item price" min={0} precision={2} />
                    </Form.Item>
                    
                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[{ required: true, message: 'Please enter item category' }]}
                    >
                        <Input placeholder="e.g. smartphone, computer, smartwatch" />
                    </Form.Item>
                    
                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <Input.TextArea placeholder="Item description" rows={3} />
                    </Form.Item>
                    
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Add Item
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
