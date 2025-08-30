import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import os from "os";
import multer from "multer";
import sharp from "sharp";
import { PDFDocument } from "pdf-lib";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;
const upload = multer({ dest: os.tmpdir() });

app.post("/compress", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const ext = path.extname(file.originalname).toLowerCase();
    const inputPath = file.path;
    const outputPath = path.join(os.tmpdir(), `compressed-${Date.now()}-${file.originalname}`);

    if ([".jpg", ".jpeg", ".png"].includes(ext)) {
      await sharp(inputPath).jpeg({ quality: 60, mozjpeg: true }).toFile(outputPath);
    } else if (ext === ".pdf") {
      const pdfBytes = fs.readFileSync(inputPath);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      pdfDoc.setTitle("");
      const compressedPdf = await pdfDoc.save();
      fs.writeFileSync(outputPath, compressedPdf);
    } else {
      return res.status(400).json({ success: false, message: "Unsupported file type" });
    }

    res.setHeader("Content-Disposition", `attachment; filename=compressed-${file.originalname}`);
    res.send(fs.readFileSync(outputPath));

    
    res.on("finish", () => {
      try {
        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);
      } catch (err) {
        console.error("Cleanup error:", err);
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Compression failed" });
  }
});


app.get("/", (req, res) => {
    res.send("Oh! Hello there! You reached the wrong place : Visit https://mracompressor.vercel.app for the website");
})
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
