from fastapi import APIRouter
from app.schemas.disease_input import SymptomInput
import pandas as pd
import numpy as np
import pickle
import os

router = APIRouter()

# Load the model
model_path = os.path.join(os.path.dirname(__file__), '..', 'ml_model', 'diseases_model.pkl')
with open(model_path, 'rb') as f:
    model = pickle.load(f)

# Load symptom list
symptom_file = os.path.join(os.path.dirname(__file__), '..', 'ml_model', 'archive', 'symptoms_list.csv')
symptoms_df = pd.read_csv(symptom_file)
all_symptoms = list(symptoms_df['Symptom'].str.strip())  # Stripped to avoid space issues

# Load other CSVs
base_path = os.path.join(os.path.dirname(__file__), '..', 'ml_model', 'archive')
desc_df = pd.read_csv(os.path.join(base_path, 'description.csv'))
diet_df = pd.read_csv(os.path.join(base_path, 'diets.csv'))
med_df = pd.read_csv(os.path.join(base_path, 'medications.csv'))
precaution_df = pd.read_csv(os.path.join(base_path, 'precautions_df.csv'))
workout_df = pd.read_csv(os.path.join(base_path, 'workout_df.csv'))
disease_mapping_df = pd.read_csv(os.path.join(base_path, 'disease_mapping.csv'))

# Create disease mapping dictionary for easier lookup
disease_mapping = dict(zip(disease_mapping_df.index, disease_mapping_df['Disease'].str.strip()))
print("Loaded disease mapping:", disease_mapping)  # Debugging line

@router.post("/predict_disease")
def predict_disease(input: SymptomInput):
    try:
        # Create input vector
        input_vector = [1 if symptom.strip() in input.symptoms else 0 for symptom in all_symptoms]
        input_vector = np.array(input_vector).reshape(1, -1)

        # Predict probabilities for all diseases
        probabilities = model.predict_proba(input_vector)[0]
        
        # Get top 3 diseases with highest probabilities
        top_indices = probabilities.argsort()[-3:][::-1]
        
        results = []

        for i, disease_idx in enumerate(top_indices):
            # Get disease name from mapping
            disease_str = disease_mapping.get(disease_idx, f"Unknown Disease {disease_idx}")
            
            info = {
                "disease": disease_str,
                "confidence": round(float(probabilities[disease_idx]), 3),
                "percentage": round(float(probabilities[disease_idx]) * 100, 2),
                "description": get_info_from_df(desc_df, disease_str, 'Description', "No description available"),
                "diet": get_info_from_df(diet_df, disease_str, 'Diet', "No diet information available"),
                "medication": get_info_from_df(med_df, disease_str, 'Medication', "No medication information available"),
                "precautions": get_precautions(precaution_df, disease_str),
                "workout": get_info_from_df(workout_df, disease_str, 'workout', "No workout information available", 'disease')
            }
            results.append(info)

        return {"predictions": results}
    
    except Exception as e:
        print(f"Error in predict_disease: {str(e)}")
        return {"error": f"Prediction failed: {str(e)}"}

def get_info_from_df(df, disease_name, column, default_value, disease_column='Disease'):
    """Helper function to safely get information from dataframe"""
    try:
        filtered_df = df[df[disease_column].str.strip() == disease_name]
        if not filtered_df.empty:
            return filtered_df[column].values[0]
        else:
            return default_value
    except Exception as e:
        print(f"Error getting {column} for {disease_name}: {str(e)}")
        return default_value

def get_precautions(precaution_df, disease_name):
    """Helper function to get precautions list"""
    try:
        filtered_df = precaution_df[precaution_df['Disease'].str.strip() == disease_name]
        if not filtered_df.empty:
            precautions = []
            for i in range(1, 5):  # Precaution_1 to Precaution_4
                col_name = f'Precaution_{i}'
                if col_name in filtered_df.columns:
                    precaution = filtered_df[col_name].values[0]
                    # Only add non-empty precautions
                    if pd.notna(precaution) and str(precaution).strip():
                        precautions.append(str(precaution).strip())
            return precautions if precautions else ["No precautions available"]
        else:
            return ["No precautions available"]
    except Exception as e:
        print(f"Error getting precautions for {disease_name}: {str(e)}")
        return ["No precautions available"]