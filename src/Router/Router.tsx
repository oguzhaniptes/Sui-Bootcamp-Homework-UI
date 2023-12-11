import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import App from "../App";
import DeveloperCard from "../Pages/DeveloperCard";

const Router: React.FC = () => {
  return (
    <>
      <BrowserRouter basename={"/"}>
        <Routes>
          <Route path="/" index element={<App />} />
          <Route path="/integration" index element={<DeveloperCard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
