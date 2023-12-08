import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import appointmentService from './services/appointmentService';

function ServiceSelector({ serviceTypeId, onServiceSelect }) {
    const [services, setServices] = useState([]);

    useEffect(() => {
        // Replace this with the actual method to fetch services for a given service type
        const fetchServices = async () => {
            const data = await appointmentService.getServicesByType(serviceTypeId);
            setServices(data);
        };
        if (serviceTypeId) {
            fetchServices();
        }
    }, [serviceTypeId]);

    return (
        <FormControl fullWidth>
            <InputLabel id="service-selector-label">Service</InputLabel>
            <Select
                labelId="service-selector-label"
                label="Service"
                onChange={(e) => onServiceSelect(e.target.value)}
            >
                {services.map((service) => (
                    <MenuItem key={service.id} value={service.id}>
                        {service.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default ServiceSelector;
