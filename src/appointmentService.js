import http from "./http";

const appointmentService = {
    getAppointments: async () => {
        const response = await http.get('/Appointment');
        return response.data;
    },

    getAvailableSlots: async (serviceTypeId, date) => {
        const response = await http.get(`/Appointment/available-slots?serviceTypeId=${serviceTypeId}&date=${date}`);
        return response.data;
    },

    getCustomers: async () => {
        const response = await http.get('/Appointment/customers');
        return response.data;
    },

    getServiceTypes: async () => {
        const response = await http.get('/Appointment/service-types');
        return response.data;
    },

    createAppointment: async (appointmentData) => {
        const response = await http.post('/Appointment', appointmentData);
        return response.data;
    }
};

export default appointmentService;
