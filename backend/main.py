from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.sales_prediction import router as sales_prediction_router
from routes.fraud_detection import router as fraud_detection_router
from routes.customer_analytics import router as customer_analytics_router
from routes.sentiment_analysis import router as sentiment_analysis_router
from routes.reports import router as reports_router
from routes.dashboard import router as dashboard_router


app = FastAPI(
    title="BusinessIQ AI API",
    description="AI-powered Business Intelligence Platform",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(sales_prediction_router)
app.include_router(fraud_detection_router)
app.include_router(customer_analytics_router)
app.include_router(sentiment_analysis_router)
app.include_router(reports_router)
app.include_router(dashboard_router)


@app.get("/")
def root():
    return {
        "message": "BusinessIQ AI Backend is running",
        "status": "success"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "message": "BusinessIQ AI Backend is working"
    }