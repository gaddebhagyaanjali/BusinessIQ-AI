from fastapi import APIRouter, UploadFile, File
import pandas as pd
import os
import uuid

router = APIRouter(
    prefix="/api/customer",
    tags=["Customer Analytics"]
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/analyze")
async def analyze_customers(
    file: UploadFile = File(...)
):

    # -----------------------------------------
    # 1. Check file type
    # -----------------------------------------

    if not file.filename.lower().endswith(".csv"):
        return {
            "status": "error",
            "message": "Only CSV files are supported."
        }

    # -----------------------------------------
    # 2. Create unique file name
    # -----------------------------------------

    unique_filename = f"{uuid.uuid4()}_{file.filename}"

    file_path = os.path.join(
        UPLOAD_DIR,
        unique_filename
    )

    # -----------------------------------------
    # 3. Save uploaded file
    # -----------------------------------------

    contents = await file.read()

    with open(file_path, "wb") as buffer:
        buffer.write(contents)

    # -----------------------------------------
    # 4. Read CSV
    # -----------------------------------------

    try:
        df = pd.read_csv(file_path)

    except Exception as e:
        return {
            "status": "error",
            "message": f"Unable to read CSV file: {str(e)}"
        }

    # -----------------------------------------
    # 5. Check required columns
    # -----------------------------------------

    required_columns = [
        "City",
        "Sales"
    ]

    missing_columns = [
        column
        for column in required_columns
        if column not in df.columns
    ]

    if missing_columns:
        return {
            "status": "error",
            "message": (
                "Required columns are missing: "
                + ", ".join(missing_columns)
            )
        }

    # -----------------------------------------
    # 6. Clean Sales column
    # -----------------------------------------

    df["Sales"] = pd.to_numeric(
        df["Sales"],
        errors="coerce"
    )

    df = df.dropna(
        subset=["City", "Sales"]
    )

    # -----------------------------------------
    # 7. Basic Customer Analytics
    # -----------------------------------------

    total_transactions = len(df)

    # Since Customer ID is not available,
    # City is used as the customer grouping field.
    total_customers = df["City"].nunique()

    total_sales = df["Sales"].sum()

    average_sales_per_customer = (
        total_sales / total_customers
        if total_customers > 0
        else 0
    )

    # -----------------------------------------
    # 8. City-wise Analysis
    # -----------------------------------------

    customer_summary = (
        df.groupby("City")
        .agg(
            total_orders=("City", "count"),
            total_sales=("Sales", "sum"),
            average_order_value=("Sales", "mean")
        )
        .reset_index()
    )

    # -----------------------------------------
    # 9. Sort by Sales
    # -----------------------------------------

    customer_summary = customer_summary.sort_values(
        by="total_sales",
        ascending=False
    )

    # -----------------------------------------
    # 10. Top Customer / City
    # -----------------------------------------

    if len(customer_summary) > 0:

        top_customer = customer_summary.iloc[0]

        top_customer_id = str(
            top_customer["City"]
        )

        top_customer_sales = round(
            float(top_customer["total_sales"]),
            2
        )

    else:

        top_customer_id = None
        top_customer_sales = 0

    # -----------------------------------------
    # 11. Prepare Results
    # -----------------------------------------

    customer_results = []

    for _, row in customer_summary.head(100).iterrows():

        customer_results.append({

            "customer_id": str(
                row["City"]
            ),

            "total_orders": int(
                row["total_orders"]
            ),

            "total_sales": round(
                float(row["total_sales"]),
                2
            ),

            "average_order_value": round(
                float(row["average_order_value"]),
                2
            )
        })

    # -----------------------------------------
    # 12. Return Response
    # -----------------------------------------

    return {

        "status": "success",

        "filename": file.filename,

        "customer_identifier": "City",

        "total_transactions": total_transactions,

        "total_customers": total_customers,

        "total_sales": round(
            float(total_sales),
            2
        ),

        "average_sales_per_customer": round(
            float(average_sales_per_customer),
            2
        ),

        "top_customer": top_customer_id,

        "top_customer_sales": top_customer_sales,

        "results": customer_results
    }