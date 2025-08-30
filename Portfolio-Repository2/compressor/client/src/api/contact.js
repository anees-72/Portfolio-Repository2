import axios from "axios";

export const sendContactForm = async (formData) => {
    const response = await axios.post('https://orange-engine-4jg45v6xqw4924r7-3000.app.github.dev/contact', formData);
    return response.data;
}