import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import appointmentService from './appointmentService';

function ServiceTypeSelector({ onServiceTypeChange }) {
    const [serviceTypes, setServiceTypes] = useState([]);

    useEffect(() => {
        const fetchServiceTypes = async () => {
            const data = await appointmentService.getServiceTypes();
            setServiceTypes(data);
        };
        fetchServiceTypes();
    }, []);

    return (
        <FormControl fullWidth>
            <InputLabel id="service-type-label">Service Type</InputLabel>
            <Select
                labelId="service-type-label"
                label="Service Type"
                onChange={(e) => {
                    const serviceType = serviceTypes.find(type => type.id === e.target.value);
                    onServiceTypeChange(serviceType);
                }}
            >
                {serviceTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                        {type.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default ServiceTypeSelector;
