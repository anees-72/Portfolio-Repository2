import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

async function compressImage(file, quality = 0.7, maxWidth = 1280) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = Math.min(maxWidth / img.width, 1);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("Image compression failed"));
          resolve(blob);
        },
        file.type,
        quality
      );
    };

    img.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function compressPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer); 
  const compressedBytes = await pdfDoc.save({
    useObjectStreams: true,
    updateFieldAppearances: true,
  });

  return new Blob([compressedBytes], { type: "application/pdf" });
}
export async function compressFile(file) {
  if (file.type.startsWith("image/")) {
    return await compressImage(file);
  } else if (file.type === "application/pdf") {
    return await compressPDF(file);
  } else {
    throw new Error("Unsupported file type");
  }
}
