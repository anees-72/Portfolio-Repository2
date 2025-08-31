import { useState, useRef } from "react";
import { Upload, File } from "lucide-react";
import { sendFile } from "../api/compress";

export default function Home() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [compressedSize, setCompressedSize] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [error, setError] = useState(null);

  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setCompressedSize(null);
    setDownloadUrl(null);
    setError(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      setCompressedSize(null);
      setDownloadUrl(null);
      setError(null);
    }
  };

  const handleUploadClick = () => fileInputRef.current.click();

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    setProgress(0);
    setError(null);
    const sizeInMB = file.size / (1024*1024);
    let widthInterval = 300;
    if (sizeInMB > 3.5)  widthInterval=500;
    else if (sizeInMB < 2.5) widthInterval =250;
    else if (sizeInMB > 6) widthInterval=600;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, widthInterval);


    try {
      const blob = await sendFile(file);
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setCompressedSize((blob.size / 1024).toFixed(2));
      setShowModal(true);
    } catch (err) {
      console.error(err);
      if(err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      }else
      setError(err.message || "Compression failed, try again.");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12 bg-gray-50">
      <h2 className="text-4xl font-extrabold text-slate-800 mb-4">
        Compress Images & Files Instantly
      </h2>
      <p className="text-slate-600 mb-6 max-w-xl">
        Fast, secure, and free file compression. Save storage space and share files quicker — developed by{" "}
        <span className="text-indigo-600 font-semibold">Malik Anees</span>.
      </p>

      
      <div
        className={`cursor-pointer flex flex-col items-center justify-center w-80 h-40 border-2 border-dashed rounded-2xl bg-white shadow-md transition ${
          isDragging ? "border-indigo-600 bg-indigo-50" : "border-indigo-400"
        }`}
        onClick={handleUploadClick}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {loading ? (
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-indigo-600 transition-all duration-100"
              style={{ width: `${progress}%` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-slate-600 font-semibold">
              {progress}%
            </div>
          </div>
        ) : (
          <>
            <Upload className="w-10 h-10 text-indigo-500 mb-2" />
            <span className="text-slate-700 font-medium">Drag & Drop or Click to Upload</span>
          </>
        )}

        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      
      <p className="text-slate-500 text-sm mt-2">
        Supported file types: <span className="font-medium">JPG, PNG, PDF</span>
      </p>

      
      {error && (
        <div className="mt-4 text-red-600 font-medium">
          ⚠️ {error}
        </div>
      )}

      {file && !loading && (
  <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl shadow-sm max-w-md flex items-center space-x-3">
    <File className="w-6 h-6 text-emerald-600" />
    <div className="text-left flex flex-col">
      <p className="text-emerald-700 font-medium">{file.name}</p>
      <p className="text-slate-600 text-sm">
        Original Size: {(file.size / 1024).toFixed(2)} KB
      </p>
      {compressedSize && (
        <p className="text-slate-600 text-sm">
          Compressed Size: {compressedSize} KB
        </p>
      )}
      {downloadUrl && (
        <a
          href={downloadUrl}
          download={`compressed-${file.name}`}
          className="px-3 py-1 mt-2 bg-indigo-600 text-white text-sm rounded-lg shadow hover:bg-indigo-700 transition w-fit"
        >
          Download File
        </a>
      )}
    </div>
  </div>
)}

      {file && !loading && !downloadUrl &&(
        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
        >
          Compress File
        </button>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-96 text-center">
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Compression Successful 
            </h3>
            <p className="text-slate-600 mb-4">
              Your file has been compressed successfully.
            </p>
            {downloadUrl && (
              <a
                href={downloadUrl}
                download={`compressed-${file.name}`}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
              >
                Download File
              </a>
            )}
            <button
              onClick={() => setShowModal(false)}
              className="mt-3 block mx-auto text-slate-500 hover:text-slate-700 text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
