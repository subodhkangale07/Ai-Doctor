from fastapi import APIRouter
from app.schemas.heart_disease import HeartDiseaseInput
import numpy as np
import pickle
import os

router = APIRouter()

# Load model and scaler
model_path = os.path.join(os.path.dirname(__file__), '..', 'ml_model', 'heart_disease_model.pkl')
with open(model_path, 'rb') as f:
    package = pickle.load(f)
    model = package['model']
    scaler = package['scaler']

@router.post("/predict_heart_disease")
def predict_heart_disease(data: HeartDiseaseInput):
    input_data = np.array([[
        data.male,
        data.age,
        data.education,
        data.currentSmoker,
        data.cigsPerDay,
        data.prevalentHyp,
        data.totChol,
        data.sysBP,
        data.diaBP,
        data.BMI,
        data.heartRate,
        data.glucose
    ]])

    # Scale input and predict
    scaled_input = scaler.transform(input_data)
    prediction = model.predict(scaled_input)[0]
    
    result = "Heart Disease Detected" if prediction == 1 else "No Heart Disease"

    return {"prediction": result}
