import pandas as pd


def validate_sales_dataset(file_path: str):
    """
    Validate a CSV file for the Sales Prediction module.
    """

    try:
        # Read CSV
        df = pd.read_csv(file_path)

        # Basic validation
        if df.empty:
            return {
                "valid": False,
                "message": "The uploaded dataset is empty."
            }

        # Get columns
        columns = list(df.columns)

        # Normalize column names for detection
        normalized_columns = {
            column: column.strip().lower()
            for column in columns
        }

        # Detect sales column
        sales_column = None

        sales_keywords = [
            "sales",
            "sale",
            "revenue",
            "amount",
            "total_sales",
            "total sales"
        ]

        for original, normalized in normalized_columns.items():
            if normalized in sales_keywords:
                sales_column = original
                break

        # Detect date column
        date_column = None

        date_keywords = [
            "date",
            "order date",
            "order_date",
            "sales date",
            "sales_date"
        ]

        for original, normalized in normalized_columns.items():
            if normalized in date_keywords:
                date_column = original
                break

        # Sales column required
        if sales_column is None:
            return {
                "valid": False,
                "rows": len(df),
                "columns": len(columns),
                "column_names": columns,
                "message": (
                    "Sales column could not be detected. "
                    "Please include a column such as Sales, Revenue or Amount."
                )
            }

        # Convert sales column to numeric
        sales_numeric = pd.to_numeric(
            df[sales_column],
            errors="coerce"
        )

        invalid_sales = int(sales_numeric.isna().sum())

        # Missing values
        missing_values = int(df.isna().sum().sum())

        # Detect quantity column
        quantity_column = None

        quantity_keywords = [
            "quantity",
            "qty",
            "units",
            "unit"
        ]

        for original, normalized in normalized_columns.items():
            if normalized in quantity_keywords:
                quantity_column = original
                break

        # Date validation
        valid_dates = None

        if date_column:
            parsed_dates = pd.to_datetime(
                df[date_column],
                errors="coerce"
            )

            valid_dates = int(parsed_dates.notna().sum())

        return {
            "valid": True,
            "rows": len(df),
            "columns": len(columns),
            "column_names": columns,
            "sales_column": sales_column,
            "date_column": date_column,
            "quantity_column": quantity_column,
            "missing_values": missing_values,
            "invalid_sales_values": invalid_sales,
            "valid_dates": valid_dates,
            "message": "Dataset is ready for prediction."
        }

    except Exception as e:

        return {
            "valid": False,
            "message": f"Unable to validate dataset: {str(e)}"
        }