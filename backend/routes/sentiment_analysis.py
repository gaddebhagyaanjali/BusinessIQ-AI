from fastapi import APIRouter
from pydantic import BaseModel
from textblob import TextBlob

router = APIRouter(
    prefix="/api/sentiment",
    tags=["Sentiment Analysis"]
)


class SentimentRequest(BaseModel):
    text: str


@router.post("/analyze")
async def analyze_sentiment(request: SentimentRequest):

    text = request.text.strip()

    if not text:
        return {
            "status": "error",
            "message": "Please provide some text."
        }

    # Perform sentiment analysis
    analysis = TextBlob(text)

    polarity = analysis.sentiment.polarity
    subjectivity = analysis.sentiment.subjectivity

    # Determine sentiment
    if polarity > 0.1:
        sentiment = "Positive"

    elif polarity < -0.1:
        sentiment = "Negative"

    else:
        sentiment = "Neutral"

    return {
        "status": "success",
        "text": text,
        "sentiment": sentiment,
        "polarity": round(polarity, 3),
        "subjectivity": round(subjectivity, 3)
    }