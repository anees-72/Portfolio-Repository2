import axios from "axios";

export const sendContactForm = async (formData) => {
    const response = await axios.post('/api/contact', formData);
    return response.data;
}