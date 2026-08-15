from fastapi import APIRouter, UploadFile, File, Form
import os
import uuid

from services.sales_predictor import predict_sales


router = APIRouter(
    prefix="/api/sales-prediction",
    tags=["Sales Prediction"]
)


UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)


@router.post("/predict")
async def sales_prediction(
    file: UploadFile = File(...),
    target_column: str = Form(...),
    algorithm: str = Form(...),
    period: str = Form(...)
):

    # ==========================================
    # 1. CHECK FILE
    # ==========================================

    if not file.filename.lower().endswith(".csv"):

        return {
            "status": "error",
            "message": "Only CSV files are supported."
        }


    # ==========================================
    # 2. CREATE UNIQUE FILE PATH
    # ==========================================

    unique_filename = (
        f"{uuid.uuid4()}_{file.filename}"
    )

    file_path = os.path.join(
        UPLOAD_DIR,
        unique_filename
    )


    try:

        # ======================================
        # 3. SAVE UPLOADED FILE
        # ======================================

        contents = await file.read()

        with open(file_path, "wb") as buffer:
            buffer.write(contents)


        # ======================================
        # 4. RUN SALES PREDICTION
        # ======================================

        result = predict_sales(
            file_path=file_path,
            target_column=target_column,
            algorithm=algorithm,
            period=period
        )


        # ======================================
        # 5. RETURN RESULT
        # ======================================

        return {
            "status": "success",
            "filename": file.filename,
            **result
        }


    except Exception as e:

        return {
            "status": "error",
            "message": str(e)
        }


    finally:

        # ======================================
        # 6. DELETE TEMPORARY FILE
        # ======================================

        if os.path.exists(file_path):

            os.remove(file_path)