import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/loginPage/loginPage";
import DashboardSupperPage from "./pages/dashboardPages/dashboardSupperPage/dashboardSupperPage";

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route exact path="/dashboardSupperPage" element={<DashboardSupperPage />} />
      {/* <Route exact path="/dashboardEmployeePage" element={<DashboardEmployeePage />} /> */}
      {/* <Route exact path="/dashboardSupperPage/createFolders" element={<CreateFolderPage />} />
      <Route exact path="/dashboardSupperPage/createFiles" element={<CreateFilePage />} /> */}
      <Route path="/404" element={<div>page not found</div>}/>
      </Routes>
    </Router>
  );
}

export default App;
