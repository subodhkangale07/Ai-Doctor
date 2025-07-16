from fastapi import APIRouter
from app.schemas.diabetes import DiabetesInput
import numpy as np
import pandas as pd
import pickle
import os

router = APIRouter()

# Load the model and scaler
model_path = os.path.join(os.path.dirname(__file__), '..', 'ml_model', 'diabetes_model.pkl')
with open(model_path, 'rb') as f:
    package = pickle.load(f)
    model = package["model"]
    scaler = package["scaler"]

@router.post("/predict_diabetes")
def predict_diabetes(data: DiabetesInput):
    # Create DataFrame with exact same structure as training data
    # Based on your training code: X = df.drop(['Outcome','SkinThickness','DiabetesPedigreeFunction'], axis=1)
    # The remaining columns should be in this order:
    feature_names = ['Pregnancies', 'Glucose', 'BloodPressure', 'Insulin', 'BMI', 'Age']
    
    # Create input as DataFrame to ensure correct column order
    input_df = pd.DataFrame({
        'Pregnancies': [data.Pregnancies],
        'Glucose': [data.Glucose],
        'BloodPressure': [data.BloodPressure],
        'Insulin': [data.Insulin],
        'BMI': [data.BMI],
        'Age': [data.Age]
    })
    
    # Ensure columns are in the same order as training
    input_df = input_df[feature_names]
    
    # Scale the input
    scaled_input = scaler.transform(input_df)
    
    # Make prediction
    prediction = model.predict(scaled_input)[0]
    
    result = "Diabetic" if prediction == 1 else "Non-Diabetic"
    
    # Try to get prediction probability for debugging (if available)
    response_data = {
        "prediction": result,
        "debug_info": {
            "scaled_input": scaled_input.tolist(),
            "raw_prediction": int(prediction)
        }
    }
    
    # Check if model supports predict_proba
    if hasattr(model, 'predict_proba') and hasattr(model, 'probability') and model.probability:
        prediction_proba = model.predict_proba(scaled_input)[0]
        response_data["probability_non_diabetic"] = float(prediction_proba[0])
        response_data["probability_diabetic"] = float(prediction_proba[1])
    elif hasattr(model, 'decision_function'):
        # For SVM without probability, use decision function
        decision_score = model.decision_function(scaled_input)[0]
        response_data["decision_score"] = float(decision_score)
        response_data["note"] = "Decision score: positive = diabetic, negative = non-diabetic"
    
    return response_data

# Optional: Add a debug endpoint to check feature order
@router.get("/debug_features")
def debug_features():
    """Debug endpoint to check what features the model expects"""
    try:
        # Try to get feature names from the scaler
        feature_names = ['Pregnancies', 'Glucose', 'BloodPressure', 'Insulin', 'BMI', 'Age']
        return {
            "expected_features": feature_names,
            "model_type": str(type(model)),
            "scaler_type": str(type(scaler))
        }
    except Exception as e:
        return {"error": str(e)}