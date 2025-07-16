from pydantic import BaseModel

class HeartDiseaseInput(BaseModel):
    male: int
    age: int
    education: float
    currentSmoker: int
    cigsPerDay: float
    prevalentHyp: int
    totChol: float
    sysBP: float
    diaBP: float
    BMI: float
    heartRate: float
    glucose: float
