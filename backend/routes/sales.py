from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
import io

router = APIRouter(
    prefix="/sales",
    tags=["Sales Prediction"]
)


@router.post("/upload")
async def upload_sales_dataset(
    file: UploadFile = File(...)
):
    # Check file type
    if not file.filename.lower().endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Only CSV files are allowed."
        )

    try:
        # Read uploaded file
        contents = await file.read()

        # Convert CSV into DataFrame
        df = pd.read_csv(io.BytesIO(contents))

        # Check empty dataset
        if df.empty:
            raise HTTPException(
                status_code=400,
                detail="The uploaded CSV file is empty."
            )

        # Convert preview data to JSON-compatible format
        preview = df.head(10).fillna("").to_dict(orient="records")

        return {
            "message": "Dataset uploaded successfully.",
            "filename": file.filename,
            "rows": len(df),
            "columns": len(df.columns),
            "column_names": df.columns.tolist(),
            "preview": preview
        }

    except pd.errors.EmptyDataError:
        raise HTTPException(
            status_code=400,
            detail="The uploaded CSV file is empty."
        )

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Unable to process CSV file: {str(e)}"
        )