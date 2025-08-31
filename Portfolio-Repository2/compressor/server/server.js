import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>MRA Compressor</title>
        <style>
          body {
            margin: 0;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f9fafb;
            color: #1e293b; 
            font-family: Arial, sans-serif;
            text-align: center;
          }
          a {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #4f46e5; 
            color: white;
            text-decoration: none;
            border-radius: 8px;
            transition: background 0.3s;
          }
          a:hover {
            background-color: #4338ca;
          }
        </style>
      </head>
      <body>
        <div>
          <h1>Oh! Hello there!</h1>
          <p>Oops! You’ve reached the wrong place. Head over to the website to compress your files quickly and securely.</p>
          <a href="https://mracompressor.vercel.app">Go to MRA Compressor</a>
        </div>
      </body>
    </html>
  `);
});

app.post("/contact", (req,res) => {
    const {name, email, message} = req.body;
    if(!name || !email || !message) {
        return res.status(400).json({success: false, message: "All fields are required"});
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!regex.test(email)) {
        return res.status(400).json({success: false, message: "Invalid email format"});
    }
    return res.status(200).json({success: true, message: "Ready to send"});
})
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
