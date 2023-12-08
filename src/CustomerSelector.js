// CustomerSelector.js
import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import appointmentService from './appointmentService';

function CustomerSelector({ onCustomerSelect }) {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            const data = await appointmentService.getCustomers();
            setCustomers(data);
        };
        fetchCustomers();
    }, []);

    return (
        <FormControl fullWidth>
            <InputLabel id="customer-selector-label">Customer</InputLabel>
            <Select
                labelId="customer-selector-label"
                label="Customer"
                onChange={(e) => onCustomerSelect(e.target.value)}
            >
                {customers.map((customer) => (
                    <MenuItem key={customer.id} value={customer.id}>
                        {customer.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default CustomerSelector;
