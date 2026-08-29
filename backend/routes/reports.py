from fastapi import APIRouter, UploadFile, File
import pandas as pd
import os
import uuid

from services.fraud_detector import detect_fraud


router = APIRouter(
    prefix="/api/reports",
    tags=["Reports"]
)


UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)


@router.post("/generate")
async def generate_report(
    file: UploadFile = File(...)
):

    # =========================================
    # 1. Check file type
    # =========================================

    if not file.filename.lower().endswith(".csv"):

        return {
            "status": "error",
            "message": "Only CSV files are supported."
        }


    # =========================================
    # 2. Read uploaded file
    # =========================================

    try:

        contents = await file.read()

        from io import BytesIO

        df = pd.read_csv(
            BytesIO(contents)
        )

    except Exception as e:

        return {
            "status": "error",
            "message": f"Unable to read CSV file: {str(e)}"
        }


    # =========================================
    # 3. Basic Dataset Information
    # =========================================

    total_rows = len(df)

    total_columns = len(df.columns)


    # =========================================
    # 4. Calculate Sales
    # =========================================

    total_sales = 0

    average_sales = 0

    if "Sales" in df.columns:

        df["Sales"] = pd.to_numeric(
            df["Sales"],
            errors="coerce"
        )

        total_sales = df["Sales"].sum()

        average_sales = df["Sales"].mean()


    # =========================================
    # 5. Calculate Customers
    # =========================================

    total_customers = 0

    customer_identifier = None


    # If Customer ID exists
    if "Customer ID" in df.columns:

        total_customers = (
            df["Customer ID"]
            .dropna()
            .nunique()
        )

        customer_identifier = "Customer ID"


    # Superstore dataset uses City
    elif "City" in df.columns:

        total_customers = (
            df["City"]
            .dropna()
            .nunique()
        )

        customer_identifier = "City"


    # =========================================
    # 6. Save temporary file for fraud service
    # =========================================

    unique_filename = (
        f"{uuid.uuid4()}_{file.filename}"
    )

    file_path = os.path.join(
        UPLOAD_DIR,
        unique_filename
    )


    try:

        df.to_csv(
            file_path,
            index=False
        )


        # =====================================
        # 7. Run SAME Fraud Detection Service
        # =====================================

        fraud_result = detect_fraud(
            file_path
        )


    except Exception as e:

        fraud_result = {
            "status": "error",
            "message": str(e)
        }


    finally:

        # Remove temporary file
        if os.path.exists(file_path):

            os.remove(file_path)


    # =========================================
    # 8. Extract Fraud Information
    # =========================================

    fraud_transactions = 0

    fraud_percentage = 0

    fraud_threshold = 0

    amount_column = None


    if fraud_result.get("status") == "success":

        fraud_transactions = int(
            fraud_result.get(
                "fraud_transactions",
                0
            )
        )

        fraud_percentage = float(
            fraud_result.get(
                "fraud_percentage",
                0
            )
        )

        fraud_threshold = float(
            fraud_result.get(
                "threshold",
                0
            )
        )

        amount_column = fraud_result.get(
            "amount_column"
        )


    # =========================================
    # 9. Dataset Status
    # =========================================

    dataset_status = "Ready"

    if total_rows == 0:

        dataset_status = "Empty"


    # =========================================
    # 10. Final Report Response
    # =========================================

    return {

        "status": "success",

        "filename": file.filename,

        "total_rows": total_rows,

        "total_columns": total_columns,

        "total_sales": round(
            float(total_sales),
            2
        ),

        "average_sales": round(
            float(average_sales),
            2
        ),

        "total_customers": int(
            total_customers
        ),

        "customer_identifier":
            customer_identifier,

        "fraud_transactions": int(
            fraud_transactions
        ),

        "fraud_percentage": round(
            fraud_percentage,
            2
        ),

        "fraud_threshold": round(
            fraud_threshold,
            2
        ),

        "amount_column":
            amount_column,

        "dataset_status":
            dataset_status,

        "columns":
            list(df.columns)
    }