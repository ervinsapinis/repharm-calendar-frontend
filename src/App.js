import React, { useState, useEffect } from 'react';
import appointmentService from "./appointmentService";
import DatePickerComponent from "./DatePickerComponent";
import AvailableSlots from "./AvailableSlots";
import AppointmentForm from "./AppointmentForm";
import ServiceTypeSelector from "./ServiceTypeSelector";
import CustomerSelector from "./CustomerSelector";
import {Dialog, DialogTitle, List, ListItem, ListItemText} from "@mui/material";

function App() {
  const [serviceTypes, setServiceTypes] = useState([]);
  const [selectedServiceType, setSelectedServiceType] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    loadServiceTypes();
    loadAppointments();
  }, []);

  const loadServiceTypes = async () => {
    const data = await appointmentService.getServiceTypes();
    setServiceTypes(data);
  };

  const handleCustomerSelect = (customerId) => {
    setSelectedCustomer(customerId);
  };

  const loadAppointments = async () => {
    const data = await appointmentService.getAppointments();
    setAppointments(data);
  };

  const handleSlotSelect = (slot) => {
    console.log('Slot selected:', slot);
    setSelectedSlot(slot);
    setOpenDialog(true);
  };

  const createAppointment = async (serviceId) => {
    const appointmentData = {
      serviceId,
      customerId: selectedCustomer,
      timeSlot: selectedSlot,
      // Add any other necessary data
    };
    await appointmentService.createAppointment(appointmentData);
    loadAppointments();
    reloadAvailableSlots();
  };

  const reloadAvailableSlots = async () => {
    if (selectedServiceType && selectedDate) {
      console.log(selectedDate);
      const formattedDate = selectedDate.toISOString().split('T')[0];
      const data = await appointmentService.getAvailableSlots(selectedServiceType.id, formattedDate);
      setAvailableSlots(data);
    }
  };

  const handleServiceSelect = async (serviceId) => {
    if (!selectedCustomer || !selectedSlot) {
      alert("Please select a customer and a slot first.");
      setOpenDialog(false);
      return;
    }
    setSelectedService(serviceId);
    await createAppointment(serviceId);
    setOpenDialog(false);
  };

  const handleServiceTypeChange = (serviceType) => {
    // Assuming serviceType is the entire service type object including its services
    setSelectedServiceType(serviceType);
    const serviceTypeId = serviceType.id;
    loadAvailableSlots(serviceTypeId);
  };

  const loadAvailableSlots = async (serviceTypeId) => {
    if (serviceTypeId && selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      const data = await appointmentService.getAvailableSlots(serviceTypeId, formattedDate);
      setAvailableSlots(data);
    }
  };

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    console.log(date);
    const formattedDate = selectedDate.toISOString().split('T')[0];
    console.log(formattedDate);

    if (selectedServiceType) {
      const data = await appointmentService.getAvailableSlots(selectedServiceType.id, formattedDate);
      setAvailableSlots(data);
    }
  };

  const handleCreateAppointment = async (appointmentData) => {
    const fullAppointmentData = { ...appointmentData, customerId: selectedCustomer };
    await appointmentService.createAppointment(fullAppointmentData);
    loadAppointments();
  };

  const renderServiceDialog = () => {
    console.log(selectedServiceType)
    if (!selectedServiceType || !selectedServiceType.services) {
      return null;
    }

    return (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Select a Service</DialogTitle>
          <List>
            {selectedServiceType.services.map((service) => (
                <ListItem button key={service.id} onClick={() => handleServiceSelect(service.id)}>
                  <ListItemText primary={`${service.serviceName} - EUR ${service.price}`} />
                </ListItem>
            ))}
          </List>
        </Dialog>
    );
  };

  return (
      <div>
        <CustomerSelector onCustomerSelect={handleCustomerSelect} />
        <ServiceTypeSelector onServiceTypeChange={handleServiceTypeChange} />
        <DatePickerComponent selectedDate={selectedDate} handleDateChange={handleDateChange} />
        {/*<AppointmentForm onCreateAppointment={handleCreateAppointment} />*/}
        <AvailableSlots slots={availableSlots} onSlotClick={handleSlotSelect} />
        {renderServiceDialog()}
      </div>
  );
}

export default App;
