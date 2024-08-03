import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
};

export default AppRoutes;
