import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Home";
import BlogDetail from "../pages/Home/BlogDetail";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
    </Routes>
  );
};

export default AppRoutes;
