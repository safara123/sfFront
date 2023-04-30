import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/loginPage/loginPage";
import DashboardSupperPage from "./pages/dashboardPages/dashboardSupperPage/dashboardSupperPage";
import SingleUserAccess from "./pages/dashboardPages/dashboardSupperPage/singleUserAccess/singleUserAccess";
import DeleteSingleUserAccessPage from "./pages/dashboardPages/dashboardSupperPage/deleteSingleUserAccess/deleteSingleUserAccess";

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route exact path="/dashboardSupperPage" element={<DashboardSupperPage />} />
      <Route exact path="/singleUserAccess" element={<SingleUserAccess />} />
      <Route exact path="/deleteSingleUserAccess" element={<DeleteSingleUserAccessPage />} />
deleteSingleUserAccess
      {/* <Route exact path="/dashboardEmployeePage" element={<DashboardEmployeePage />} /> */}
      {/* <Route exact path="/dashboardSupperPage/createFolders" element={<CreateFolderPage />} />
      <Route exact path="/dashboardSupperPage/createFiles" element={<CreateFilePage />} /> */}
      <Route path="/404" element={<div>page not found</div>}/>
      </Routes>
    </Router>
  );
}

export default App;
