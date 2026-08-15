from fastapi import APIRouter, UploadFile, File
import os
import uuid

from services.fraud_detector import detect_fraud


router = APIRouter(
    prefix="/api/fraud",
    tags=["Fraud Detection"]
)


UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)


@router.post("/detect")
async def fraud_detection(
    file: UploadFile = File(...)
):

    # =====================================================
    # 1. CHECK FILE
    # =====================================================

    if not file.filename:

        return {
            "status": "error",
            "message": "No file was selected."
        }

    if not file.filename.lower().endswith(".csv"):

        return {
            "status": "error",
            "message": "Only CSV files are supported."
        }

    # =====================================================
    # 2. CREATE UNIQUE FILE NAME
    # =====================================================

    unique_filename = (
        f"{uuid.uuid4()}_{file.filename}"
    )

    file_path = os.path.join(
        UPLOAD_DIR,
        unique_filename
    )

    try:

        # =================================================
        # 3. SAVE UPLOADED FILE
        # =================================================

        contents = await file.read()

        with open(file_path, "wb") as buffer:

            buffer.write(contents)

        # =================================================
        # 4. RUN FRAUD DETECTION
        # =================================================

        result = detect_fraud(
            file_path
        )

        # =================================================
        # 5. ADD ORIGINAL FILE NAME
        # =================================================

        result["filename"] = file.filename

        return result

    except Exception as e:

        return {
            "status": "error",
            "message": str(e)
        }

    finally:

        # =================================================
        # 6. DELETE TEMPORARY FILE
        # =================================================

        if os.path.exists(file_path):

            os.remove(file_path)