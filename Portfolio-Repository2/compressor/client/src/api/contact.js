import api from './api';

export const sendContactForm = async (formData) => {
    const response = await api.post('/api/contact', formData);
    return response.data;
}