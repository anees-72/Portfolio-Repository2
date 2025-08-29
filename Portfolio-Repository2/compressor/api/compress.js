import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { PDFDocument } from "pdf-lib";

const upload = multer({ dest: "/tmp/" }); 

export const config = {
  api: {
    bodyParser: false, 
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    upload.single("file")(req, res, async (err) => {
      if (err) return res.status(500).json({ success: false, message: "Upload error" });

      const file = req.file;
      if (!file) return res.status(400).json({ success: false, message: "No file uploaded" });

      const ext = path.extname(file.originalname).toLowerCase();
      const inputPath = file.path;
      const outputPath = path.join("/tmp", `compressed-${Date.now()}-${file.originalname}`);

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
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Compression failed" });
  }
}
