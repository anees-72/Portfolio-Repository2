import axios from "axios";

export const sendContactForm = async (formData) => {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/contact`, formData);
    return response.data;
}