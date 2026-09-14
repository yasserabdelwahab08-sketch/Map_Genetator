import React, { useState } from "react";
import Login from "./components/Login";
import MapView from "./components/MapView";
import MapCreator from "./components/MapCreator";
import HomePage from "./components/HomePage";
import api from "./api/axios"; // أو استخدام axios المباشر حسب إعدادك

import "./App.css";

function App() {
  // حالة المستخدم (تعتمد على جلسة الكوكي بدلاً من local storage)
  const [user, setUser] = useState(null);

  // التحكم في الصفحة الحالية: "home" | "view" | "creator" | "login"
  const [page, setPage] = useState("home");

  const handleLogin = (loggedUser) => {
    setUser(loggedUser);
    setPage("home");
  };

  const handleLogout = async () => {
    try {
      // إرسال طلب للباك إند لمسح الـ HTTP-Only Cookie
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setPage("home");
    }
  };

  // 1. عرض صفحة تسجيل الدخول
  if (page === "login" && !user) {
    return <Login onLogin={handleLogin} onBack={() => setPage("home")} />;
  }

  // 2. عرض صفحة منشئ الخرائط (MapCreator) - يتطلب تسجيل الدخول فقط
  if (page === "creator") {
    if (!user) {
      setPage("login");
      return null;
    }
    return <MapCreator onNavigate={setPage} onBack={() => setPage("home")} />;
  }

  // 3. عرض صفحة استعراض الخرائط (MapView) - متاح للجميع بدون تسجيل دخول
  if (page === "view") {
    return (
      <MapView
        user={user}
        onLogout={handleLogout}
        onNavigate={setPage}
        onBack={() => setPage("home")}
      />
    );
  }

  // 4. الصفحة الرئيسية الافتراضية (HomePage)
  return (
    <HomePage
      user={user}
      onNavigate={(targetPage) => {
        // حظر الوصول لصفحة المنشئ فقط لغير المسجلين، والسماح بالصفحات الأخرى للجميع
        if (targetPage === "creator" && !user) {
          setPage("login");
        } else {
          setPage(targetPage);
        }
      }}
      onLogout={handleLogout}
    />
  );
}

export default App;