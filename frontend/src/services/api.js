const API_URL = import.meta.env.VITE_API_URL;

async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.detail ||
        data.message ||
        `Request failed with status ${response.status}`
      );
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

export async function getDashboardOverview() {
  return apiRequest("/api/dashboard/overview");
}

export async function generateReport(payload) {
  return apiRequest("/api/reports/generate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function analyzeSentiment(payload) {
  return apiRequest("/api/sentiment/analyze", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function detectFraud(payload) {
  return apiRequest("/api/fraud/detect", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function analyzeCustomers(payload) {
  return apiRequest("/api/customer/analyze", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function predictSales(payload) {
  return apiRequest("/api/sales-prediction/predict", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}