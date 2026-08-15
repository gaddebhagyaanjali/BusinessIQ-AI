from fastapi import APIRouter
import pandas as pd
import os

router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"]
)

DATASET_PATH = "uploads/SampleSuperstore.csv"


@router.get("/overview")
async def dashboard_overview():

    # =====================================================
    # 1. CHECK DATASET
    # =====================================================

    if not os.path.exists(DATASET_PATH):
        return {
            "status": "error",
            "message": "SampleSuperstore.csv not found."
        }

    # =====================================================
    # 2. READ DATASET
    # =====================================================

    try:

        df = pd.read_csv(
            DATASET_PATH,
            engine="python",
            encoding="utf-8"
        )

    except UnicodeDecodeError:

        try:

            df = pd.read_csv(
                DATASET_PATH,
                engine="python",
                encoding="latin1"
            )

        except Exception as e:

            return {
                "status": "error",
                "message": f"Unable to read dataset: {str(e)}"
            }

    except Exception as e:

        return {
            "status": "error",
            "message": f"Unable to read dataset: {str(e)}"
        }

    # =====================================================
    # 3. CLEAN COLUMN NAMES
    # =====================================================

    df.columns = (
        df.columns
        .astype(str)
        .str.strip()
    )

    # =====================================================
    # 4. TOTAL ORDERS
    # =====================================================

    total_orders = len(df)

    # =====================================================
    # 5. TOTAL CUSTOMERS
    # =====================================================

    total_customers = 0
    customer_identifier = None

    # Customer ID if available
    if "Customer ID" in df.columns:

        total_customers = (
            df["Customer ID"]
            .dropna()
            .nunique()
        )

        customer_identifier = "Customer ID"

    # Otherwise use City
    elif "City" in df.columns:

        total_customers = (
            df["City"]
            .dropna()
            .nunique()
        )

        customer_identifier = "City"

    # =====================================================
    # 6. TOTAL SALES
    # =====================================================

    total_sales = 0

    if "Sales" in df.columns:

        df["Sales"] = pd.to_numeric(
            df["Sales"],
            errors="coerce"
        )

        total_sales = df["Sales"].sum()

    # =====================================================
    # 7. TOTAL PROFIT
    # =====================================================

    total_profit = 0

    if "Profit" in df.columns:

        df["Profit"] = pd.to_numeric(
            df["Profit"],
            errors="coerce"
        )

        total_profit = df["Profit"].sum()

    # =====================================================
    # 8. SALES BY CATEGORY
    # =====================================================

    sales_by_category = []

    if (
        "Category" in df.columns
        and "Sales" in df.columns
    ):

        category_sales = (
            df.groupby("Category")["Sales"]
            .sum()
            .reset_index()
        )

        for _, row in category_sales.iterrows():

            sales_by_category.append({
                "category": str(row["Category"]),
                "sales": round(
                    float(row["Sales"]),
                    2
                )
            })

    # =====================================================
    # 9. SEGMENT DISTRIBUTION
    # =====================================================

    customer_segments = []

    if "Segment" in df.columns:

        segments = df["Segment"].value_counts()

        total_segment_records = segments.sum()

        for segment, count in segments.items():

            percentage = (
                count / total_segment_records * 100
                if total_segment_records > 0
                else 0
            )

            customer_segments.append({
                "name": str(segment),
                "value": round(
                    float(percentage),
                    2
                )
            })

    # =====================================================
    # 10. SALES BY REGION
    # =====================================================

    sales_by_region = []

    if (
        "Region" in df.columns
        and "Sales" in df.columns
    ):

        region_sales = (
            df.groupby("Region")["Sales"]
            .sum()
            .reset_index()
        )

        for _, row in region_sales.iterrows():

            sales_by_region.append({
                "region": str(row["Region"]),
                "sales": round(
                    float(row["Sales"]),
                    2
                )
            })

    # =====================================================
    # 11. RETURN DASHBOARD DATA
    # =====================================================

    return {

        "status": "success",

        "total_sales": round(
            float(total_sales),
            2
        ),

        "total_orders": int(
            total_orders
        ),

        "total_customers": int(
            total_customers
        ),

        "customer_identifier": (
            customer_identifier
        ),

        "total_profit": round(
            float(total_profit),
            2
        ),

        "sales_by_category": (
            sales_by_category
        ),

        "customer_segments": (
            customer_segments
        ),

        "sales_by_region": (
            sales_by_region
        )
    }