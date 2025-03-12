import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const MachineData = () => {
    const [components, setComponents] = useState([]);
    const [editingComponent, setEditingComponent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchComponents();
    }, []);

    const fetchComponents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/components');
            setComponents(response.data);
            console.log(response.data)
        } catch (error) {
            message.error('Failed to fetch components');
        }
    };

    const handleAdd = async (values) => {
        try {
            await axios.post('http://localhost:5000/api/components', values);
            message.success('Component added successfully');
            fetchComponents();
            setIsModalOpen(false);
        } catch (error) {
            message.error('Failed to add component');
        }
    };

    const handleEdit = async (values) => {
        try {
            await axios.put(`http://localhost:5000/api/components/${editingComponent._id}`, values);
            message.success('Component updated successfully');
            fetchComponents();
            setEditingComponent(null);
            setIsModalOpen(false);
        } catch (error) {
            message.error('Failed to update component');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/components/${id}`);
            message.success('Component deleted successfully');
            fetchComponents();
        } catch (error) {
            message.error('Failed to delete component');
        }
    };

    const openModal = (component = null) => {
        setEditingComponent(component);
        setIsModalOpen(true);
        if (component) {
            form.setFieldsValue(component);
        } else {
            form.resetFields();
        }
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    // Data for charts
    const pieData = components.map((component) => ({
        name: component.component_name,
        value: component.quantity,
    }));

    const barData = components.map((component) => ({
        name: component.size,
        quantity: component.quantity,
    }));

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Machine Components Dashboard</h1>

            <Button type="primary" onClick={() => openModal()} className="mb-4">
                Add Component
            </Button>

            <Table
                dataSource={components}
                rowKey="_id"
                columns={[
                    { title: 'Component Name', dataIndex: 'component_name', key: 'component_name' },
                    { title: 'Size', dataIndex: 'size', key: 'size' },
                    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
                    {
                        title: 'Actions',
                        render: (_, record) => (
                            <>
                                <Button
                                    type="link"
                                    onClick={() => openModal(record)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    type="link"
                                    danger
                                    onClick={() => handleDelete(record._id)}
                                >
                                    Delete
                                </Button>
                            </>
                        ),
                    },
                ]}
            />

            <Modal
                title={editingComponent ? 'Edit Component' : 'Add Component'}
                visible={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            editingComponent ? handleEdit(values) : handleAdd(values);
                        })
                        .catch((info) => {
                            message.error('Validation failed');
                        });
                }}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="component_name"
                        label="Component Name"
                        rules={[{ required: true, message: 'Please enter the component name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="size"
                        label="Size"
                        rules={[{ required: true, message: 'Please enter the size' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="quantity"
                        label="Quantity"
                        rules={[{ required: true, message: 'Please enter the quantity' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                </Form>
            </Modal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="p-4 bg-white shadow rounded">
                    <h2 className="text-lg font-bold mb-4">Quantity Distribution (Pie Chart)</h2>
                    <PieChart width={400} height={300}>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </div>

                <div className="p-4 bg-white shadow rounded">
                    <h2 className="text-lg font-bold mb-4">Quantity by Size (Bar Chart)</h2>
                    <BarChart width={400} height={300} data={barData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="quantity" fill="#82ca9d" />
                    </BarChart>
                </div>
            </div>
        </div>
    );
};

export default MachineData;
