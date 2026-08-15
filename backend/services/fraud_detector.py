import pandas as pd


def detect_fraud(file_path):
    """
    Fraud detection service.

    Supports transaction datasets with:
    - Amount
    - Sales
    - TransactionAmount
    - transaction_amount
    - Transaction Amount
    """

    try:

        # =====================================================
        # 1. READ CSV
        # =====================================================

        df = pd.read_csv(file_path)

        if df.empty:
            return {
                "status": "error",
                "message": "The uploaded dataset is empty."
            }

        # Clean column names
        df.columns = df.columns.str.strip()

        # =====================================================
        # 2. FIND AMOUNT COLUMN
        # =====================================================

        possible_amount_columns = [
            "Amount",
            "amount",
            "Sales",
            "sales",
            "TransactionAmount",
            "transaction_amount",
            "Transaction Amount"
        ]

        amount_column = None

        for column in possible_amount_columns:

            if column in df.columns:
                amount_column = column
                break

        # =====================================================
        # 3. AMOUNT COLUMN NOT FOUND
        # =====================================================

        if amount_column is None:

            return {
                "status": "error",
                "message": (
                    "No transaction amount column was found. "
                    "Expected one of: Amount, Sales, "
                    "TransactionAmount, transaction_amount, "
                    "Transaction Amount."
                ),
                "available_columns": df.columns.tolist()
            }

        # =====================================================
        # 4. CONVERT AMOUNT TO NUMERIC
        # =====================================================

        df[amount_column] = pd.to_numeric(
            df[amount_column],
            errors="coerce"
        )

        # Remove invalid amounts
        df = df.dropna(
            subset=[amount_column]
        )

        if df.empty:

            return {
                "status": "error",
                "message": (
                    f"No valid numeric values found "
                    f"in '{amount_column}'."
                )
            }

        # =====================================================
        # 5. CALCULATE STATISTICS
        # =====================================================

        mean_amount = df[amount_column].mean()

        std_amount = df[amount_column].std()

        if pd.isna(std_amount):
            std_amount = 0

        # =====================================================
        # 6. CALCULATE FRAUD THRESHOLD
        # =====================================================

        threshold = (
            mean_amount +
            (2 * std_amount)
        )

        # =====================================================
        # 7. DETECT FRAUD
        # =====================================================

        df["fraud_prediction"] = (
            df[amount_column] > threshold
        )

        # =====================================================
        # 8. CALCULATE COUNTS
        # =====================================================

        total_transactions = len(df)

        fraud_count = int(
            df["fraud_prediction"].sum()
        )

        legitimate_count = (
            total_transactions -
            fraud_count
        )

        fraud_percentage = (
            (fraud_count / total_transactions) * 100
            if total_transactions > 0
            else 0
        )

        # =====================================================
        # 9. PREPARE TRANSACTION RESULTS
        # =====================================================

        results = []

        # Show maximum 100 transactions in UI
        for index, row in df.head(100).iterrows():

            prediction = (
                "Fraud"
                if bool(row["fraud_prediction"])
                else "Legitimate"
            )

            results.append({
                "transaction": int(index + 1),

                "amount": round(
                    float(row[amount_column]),
                    2
                ),

                "prediction": prediction
            })

        # =====================================================
        # 10. FINAL RESPONSE
        # =====================================================

        return {

            "status": "success",

            "amount_column": amount_column,

            "total_transactions": int(
                total_transactions
            ),

            "fraud_transactions": int(
                fraud_count
            ),

            "legitimate_transactions": int(
                legitimate_count
            ),

            "fraud_percentage": round(
                float(fraud_percentage),
                2
            ),

            "threshold": round(
                float(threshold),
                2
            ),

            "results": results
        }

    except Exception as e:

        return {
            "status": "error",
            "message": str(e)
        }