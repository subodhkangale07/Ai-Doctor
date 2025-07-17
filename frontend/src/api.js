// src/api.js
import axios from "axios";

// ✅ Replace with your deployed backend URL
const BASE_URL = "https://ai-doctor-ho60.onrender.com";

// ✅ Heart Disease Prediction
export const predictHeartDisease = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/predict_heart_disease`, data);
    return response.data;
  } catch (error) {
    console.error("Heart Disease Prediction API error:", error);
    throw error;
  }
};

// ✅ Diabetes Prediction
export const predictDiabetes = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/predict_diabetes`, data);
    return response.data;
  } catch (error) {
    console.error("Diabetes Prediction API error:", error);
    throw error;
  }
};

// ✅ Breast Cancer Prediction
export const predictBreastCancer = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/predict_breast_cancer`, data);
    return response.data;
  } catch (error) {
    console.error("Breast Cancer Prediction API error:", error);
    throw error;
  }
};

// // ✅ Pneumonia Prediction (Image Upload)
// export const predictPneumonia = async (formData) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/predict_pneumonia`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data"
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Pneumonia Prediction API error:", error);
//     throw error;
//   }
// };

// ✅ Disease Prediction from Symptoms
export const predictDiseaseFromSymptoms = async (symptoms) => {
  try {
    const response = await axios.post(`${BASE_URL}/predict_disease`, { symptoms });
    return response.data;
  } catch (error) {
    console.error("Disease From Symptoms Prediction API error:", error);
    throw error;
  }
};
