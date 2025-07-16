from pydantic import BaseModel

class DiabetesInput(BaseModel):
    Pregnancies: int
    Glucose: int
    BloodPressure: int
    Insulin: int
    BMI: float
    Age: int
