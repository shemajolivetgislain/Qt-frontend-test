import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Home";
import BlogDetail from "../pages/Home/BlogDetail";
import LoginPage from "../pages/Authentication/LoginPage";
import RegisterPage from "../pages/Authentication/RegisterPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default AppRoutes;
