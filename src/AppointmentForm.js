import React, { useState } from 'react';
import { Button, TextField, FormControl } from '@mui/material';

function AppointmentForm({ onCreateAppointment }) {
    const [appointmentData, setAppointmentData] = useState({
        name: '',
        date: '',
        // Add other fields as necessary
    });

    const handleChange = (e) => {
        setAppointmentData({ ...appointmentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateAppointment(appointmentData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
                <TextField
                    label="Name"
                    name="name"
                    value={appointmentData.name}
                    onChange={handleChange}
                />
                {/* Add other input fields as needed */}
                <Button type="submit" variant="contained" color="primary">
                    Create Appointment
                </Button>
            </FormControl>
        </form>
    );
}

export default AppointmentForm;
