import axios from "axios";

export const sendFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/compress`, formData,{
    headers: {"Content-Type" : "multipart/form-data"},
    responseType: 'blob'
  })
  
  return res.data;
};
