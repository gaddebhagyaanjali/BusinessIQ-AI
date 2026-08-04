import "./Features.css";

function Features() {
  return (
    <section className="features">

      <h2>Our AI Services</h2>

      <div className="feature-container">

        <div className="card">
          <h3>📈 Sales Prediction</h3>
          <p>Predict future sales using Machine Learning.</p>
        </div>

        <div className="card">
          <h3>🛡 Fraud Detection</h3>
          <p>Detect fraudulent transactions instantly.</p>
        </div>

        <div className="card">
          <h3>😊 Sentiment Analysis</h3>
          <p>Analyze customer reviews and opinions.</p>
        </div>

        <div className="card">
          <h3>👥 Customer Segmentation</h3>
          <p>Group customers based on purchasing behavior.</p>
        </div>

      </div>

    </section>
  );
}

export default Features;