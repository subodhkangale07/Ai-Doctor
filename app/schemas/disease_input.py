from pydantic import BaseModel
from typing import List

class SymptomInput(BaseModel):
    symptoms: List[str]  # e.g., ["fever", "cough", "headache"]
