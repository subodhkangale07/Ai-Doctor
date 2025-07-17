// src/api.js
import axios from "axios";

const BASE_URL = "https://ai-doctor-ho60.onrender.com"; // Replace with your deployed backend URL

export const predictHeartDisease = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/predict_heart_disease`, data);
    return response.data;
  } catch (error) {
    console.error("Prediction API error:", error);
    throw error;
  }
};
export const predictDiabetes = async (data) => {
  try {
    const response = await axios.post(`https://ai-doctor-ho60.onrender.com/predict_diabetes`, data);
    return response.data;
  } catch (error) {
    console.error("Prediction API error:", error);
    throw error;
  }
};
export const predictBreastCancer = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/predict_breast_cancer`, data);
    return response.data;
  } catch (error) {
    console.error("Prediction API error:", error);
    throw error;
  }
};
// export const predictPneumonia = async (formData) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/predict_pneumonia`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data"
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Prediction API error:", error);
//     throw error;
//   }
// };
// Your API function should look something like this:
export const predictDiseaseFromSymptoms = async (symptoms) => {
     try {
    const response = await axios.post(`${BASE_URL}/predict_disease`, data);
    return response.data;
  } catch (error) {
    console.error("Prediction API error:", error);
    throw error;
  }
};
    
  
