import axios from "axios";

export const sendFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post("https://orange-engine-4jg45v6xqw4924r7-3000.app.github.dev/compress", formData,{
    headers: {"Content-Type" : "multipart/form-data"},
    responseType: 'blob'
  })
  if (res.data.type === 'application/json'){
    const error = await res.data.text();
    throw new Error(JSON.parse(error).message || "Compression failed, try again. ");
  }
  return res.data;
};
