// AvailableSlots.js
import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

function AvailableSlots({ slots, onSlotClick }) {
    return (
        <List>
            {slots.map((slot, index) => (
                <ListItem button key={index} onClick={() => onSlotClick(slot)}>
                    <ListItemText primary={slot} />
                </ListItem>
            ))}
        </List>
    );
}

export default AvailableSlots;
