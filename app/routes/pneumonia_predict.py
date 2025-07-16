# from fastapi import APIRouter, File, UploadFile
# from tensorflow.keras.models import load_model
# from PIL import Image
# import numpy as np
# import os
# import io
# # 
# router = APIRouter()

# # Load model at startup
# model_path = os.path.join(os.path.dirname(__file__), '..', 'ml_model', 'pneumonia_model_final.h5')
# model = load_model(model_path)

# IMG_SIZE = (150, 150)

# @router.post("/predict_pneumonia")
# async def predict_pneumonia(file: UploadFile = File(...)):
#     # Read image
#     contents = await file.read()
#     image = Image.open(io.BytesIO(contents)).convert("RGB")
#     image = image.resize(IMG_SIZE)

#     # Preprocess image
#     img_array = np.array(image) / 255.0  # Normalize
#     img_array = np.expand_dims(img_array, axis=0)  # Batch dimension

#     # Predict
#     prediction = model.predict(img_array)[0][0]
    
#     label = "Pneumonia" if prediction > 0.5 else "Normal"
#     confidence = float(prediction) if prediction > 0.5 else 1 - float(prediction)

#     return {
#         "prediction": label,
#         "confidence": round(confidence * 100, 2)
#     }

# @router.get("/pneumonia-predict")
# def predict():
#     return {"status": "success"}
