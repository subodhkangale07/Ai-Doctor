from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
from app.routes import breast_predict
# from app.routes import pneumonia_predict
from app.routes import diabetes_predict
from app.routes import heart_disease
from app.routes import disease_predict

app = FastAPI() 

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI"}

app.include_router(breast_predict.router)
# app.include_router(pneumonia_predict.router)
app.include_router(diabetes_predict.router)
app.include_router(heart_disease.router)
app.include_router(disease_predict.router)
