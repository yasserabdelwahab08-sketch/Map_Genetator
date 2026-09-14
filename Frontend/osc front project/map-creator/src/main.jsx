import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import "./index.css";
import App from "./App.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";

// إعداد خيارات axios لإرسال الكوكيز تلقائياً مع وتحديد مسار الـ API الرئيسي
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:5000/api";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
);