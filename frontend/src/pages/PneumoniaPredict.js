import React, { useState } from 'react';
import axios from 'axios';

const PneumoniaPredict = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a chest X-ray image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const response = await axios.post(
        "https://<your-backend-url>.onrender.com/predict_pneumonia",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      setResult(response.data);
    } catch (error) {
      console.error("Error predicting pneumonia:", error);
      setResult({ prediction: "Error", confidence: 0 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Pneumonia Prediction</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 w-full"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
      >
        {loading ? "Predicting..." : "Predict from X-ray"}
      </button>

      {result && (
        <div className="mt-6 text-center">
          <p className="text-lg font-semibold text-blue-700">
            Prediction: {result.prediction}
          </p>
          <p className="text-sm text-gray-600">
            Confidence: {result.confidence}%
          </p>
        </div>
      )}
    </div>
  );
};

export default PneumoniaPredict;
