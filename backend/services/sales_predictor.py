import pandas as pd
import numpy as np

from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor


def predict_sales(
    file_path: str,
    target_column: str,
    algorithm: str,
    period: str
):
    # =====================================================
    # READ CSV
    # =====================================================

    df = pd.read_csv(file_path)

    # =====================================================
    # CHECK TARGET COLUMN
    # =====================================================

    if target_column not in df.columns:
        raise ValueError(
            f"Target column '{target_column}' was not found in the dataset."
        )

    # =====================================================
    # CONVERT TARGET COLUMN TO NUMERIC
    # =====================================================

    target = pd.to_numeric(
        df[target_column],
        errors="coerce"
    )

    # Remove invalid values
    target = target.dropna()

    if len(target) < 10:
        raise ValueError(
            "Not enough numeric data available for prediction. "
            "At least 10 valid numeric records are required."
        )

    # =====================================================
    # NORMALIZE PERIOD
    # =====================================================

    # Handles:
    # 7 Days
    # 7 days
    # 30 Days
    # 30 days
    # 90 Days
    # 90 days

    normalized_period = period.strip().lower()

    period_mapping = {
        "7 days": 7,
        "30 days": 30,
        "90 days": 90
    }

    if normalized_period not in period_mapping:
        raise ValueError(
            "Invalid prediction period. "
            "Choose 7 Days, 30 Days, or 90 Days."
        )

    future_days = period_mapping[normalized_period]

    # =====================================================
    # CREATE TIME / INDEX FEATURE
    # =====================================================

    X = np.arange(
        len(target)
    ).reshape(-1, 1)

    y = target.values

    # =====================================================
    # SELECT ALGORITHM
    # =====================================================

    if algorithm.strip().lower() == "linear regression":

        model = LinearRegression()

    elif algorithm.strip().lower() == "random forest":

        model = RandomForestRegressor(
            n_estimators=100,
            random_state=42
        )

    elif algorithm.strip().lower() == "xgboost":

        try:

            from xgboost import XGBRegressor

            model = XGBRegressor(
                n_estimators=100,
                max_depth=5,
                learning_rate=0.05,
                random_state=42
            )

        except ImportError:

            raise ValueError(
                "XGBoost is not installed. "
                "Run: pip install xgboost"
            )

    else:

        raise ValueError(
            f"Unsupported algorithm: {algorithm}. "
            "Choose Linear Regression, Random Forest, or XGBoost."
        )

    # =====================================================
    # TRAIN MODEL
    # =====================================================

    model.fit(
        X,
        y
    )

    # =====================================================
    # GENERATE FUTURE INDEXES
    # =====================================================

    last_index = len(target)

    future_X = np.arange(
        last_index,
        last_index + future_days
    ).reshape(-1, 1)

    # =====================================================
    # GENERATE PREDICTIONS
    # =====================================================

    predictions = model.predict(
        future_X
    )

    # =====================================================
    # PREVENT NEGATIVE SALES
    # =====================================================

    predictions = np.maximum(
        predictions,
        0
    )

    # =====================================================
    # PREPARE PREDICTION LIST
    # =====================================================

    prediction_list = []

    for i, prediction in enumerate(predictions):

        prediction_list.append({
            "day": i + 1,
            "predicted_sales": round(
                float(prediction),
                2
            )
        })

    # =====================================================
    # CALCULATE SUMMARY
    # =====================================================

    average_prediction = float(
        np.mean(predictions)
    )

    total_prediction = float(
        np.sum(predictions)
    )

    minimum_prediction = float(
        np.min(predictions)
    )

    maximum_prediction = float(
        np.max(predictions)
    )

    # =====================================================
    # FINAL RESPONSE
    # =====================================================

    return {

        "target_column": target_column,

        "algorithm": algorithm,

        # Return the original period format
        "period": period,

        "forecast_days": future_days,

        "predictions": prediction_list,

        "summary": {

            "average_prediction": round(
                average_prediction,
                2
            ),

            "total_prediction": round(
                total_prediction,
                2
            ),

            "minimum_prediction": round(
                minimum_prediction,
                2
            ),

            "maximum_prediction": round(
                maximum_prediction,
                2
            )
        }
    }