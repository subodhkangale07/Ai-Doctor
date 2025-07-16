from fastapi import APIRouter
import pickle
import numpy as np
import os
from pydantic import BaseModel
from app.schemas.breast_cancer import BreastCancerInput

router = APIRouter()

# Load model and scaler once at startup
model_path = os.path.join(os.path.dirname(__file__), '..', 'ml_model', 'breast_model.pkl')
with open(model_path, "rb") as f:
    model_package = pickle.load(f)
    model = model_package["model"]
    scaler = model_package["scaler"]

@router.post("/breast_predict")
def predict_cancer(data: BreastCancerInput):
    input_data = np.array([[  
        data.smoothness_mean,
        data.symmetry_mean,
        data.fractal_dimension_mean,
        data.texture_se,
        data.area_se,
        data.smoothness_se,
        data.compactness_se,
        data.concavity_se,
        data.concave_points_se,
        data.symmetry_se,
        data.fractal_dimension_se,
        data.texture_worst,
        data.area_worst,
        data.smoothness_worst,
        data.concave_points_worst,
        data.symmetry_worst,
        data.fractal_dimension_worst
    ]])

    # Scale the input data before prediction
    scaled_data = scaler.transform(input_data)

    # Make prediction
    prediction = model.predict(scaled_data)[0]
    result = "Malignant" if prediction == 1 else "Benign"
    return {"prediction": result}
