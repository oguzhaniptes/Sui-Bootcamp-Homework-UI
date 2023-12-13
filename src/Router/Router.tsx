import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import App from "../App";
import DeveloperCard from "../Pages/DeveloperCard";
import Integration from "../Pages/Integration";
import GetCardInfo from "../Pages/GetCardInfo";

const Router: React.FC = () => {
  return (
    <>
      <BrowserRouter basename={"/"}>
        <Routes>
          <Route path="/" index element={<App />} />
          <Route path="/integration" index element={<Integration />} />
          <Route path="/create-developer-card" index element={<DeveloperCard />} />
          <Route path="/get-card-info" index element={<GetCardInfo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
