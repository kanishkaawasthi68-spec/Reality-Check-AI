import { useState } from "react";

function ImageUpload({ darkMode, setResult }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10 MB.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setError("");
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!image) {
      setError("Please upload an image first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();

      formData.append("image", image);

      const response = await fetch(
        "http://localhost:5000/image-verify",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Image verification failed."
        );
      }

      setResult(data);
    } catch (err) {
      console.error("Image Upload Error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview("");
    setError("");
    setResult(null);
  };

  return (
    <div
      id="image-verification"
      className={`rounded-3xl border p-6 md:p-8 shadow-xl ${
        darkMode
          ? "bg-slate-900 border-slate-700"
          : "bg-white border-gray-200"
      }`}
    >
      {/* Heading */}
      <div className="text-center mb-7">
        <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
          AI Image Detection
        </span>

        <h2
          className={`mt-2 text-2xl md:text-3xl font-extrabold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Is This Image AI Generated?
        </h2>

        <p
          className={`mt-3 ${
            darkMode ? "text-slate-400" : "text-gray-600"
          }`}
        >
          Upload an image and let AI analyze whether it is
          likely real or AI generated.
        </p>
      </div>

      {/* Upload Area */}
      {!preview ? (
        <label
          className={`flex flex-col items-center justify-center w-full min-h-64 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
            darkMode
              ? "border-slate-600 bg-slate-800 hover:border-blue-500"
              : "border-gray-300 bg-gray-50 hover:border-blue-500"
          }`}
        >
          <div className="text-5xl mb-4">🖼️</div>

          <p
            className={`text-lg font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Click to upload an image
          </p>

          <p
            className={`mt-2 text-sm ${
              darkMode ? "text-slate-400" : "text-gray-500"
            }`}
          >
            PNG, JPG, JPEG or WEBP • Max 10 MB
          </p>

          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      ) : (
        /* Preview */
        <div className="relative">
          <img
            src={preview}
            alt="Selected"
            className="w-full max-h-[450px] object-contain rounded-2xl bg-slate-100"
          />

          <button
            type="button"
            onClick={removeImage}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-600 text-white font-bold shadow-lg hover:bg-red-700 transition"
          >
            ✕
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          className={`mt-5 px-4 py-3 rounded-xl text-sm font-medium ${
            darkMode
              ? "bg-red-500/10 text-red-400 border border-red-500/20"
              : "bg-red-50 text-red-600 border border-red-100"
          }`}
        >
          ⚠️ {error}
        </div>
      )}

      {/* Analyze Button */}
      <button
        type="button"
        onClick={handleAnalyze}
        disabled={!image || loading}
        className="w-full mt-6 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading
          ? "⏳ Analyzing Image..."
          : "🔍 Analyze Image"}
      </button>

      {/* Info */}
      <p
        className={`mt-4 text-center text-xs ${
          darkMode ? "text-slate-500" : "text-gray-400"
        }`}
      >
        Your image will be analyzed for signs of AI generation.
      </p>
    </div>
  );
}

export default ImageUpload;