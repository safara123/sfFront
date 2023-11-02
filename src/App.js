import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/loginPage/loginPage";
import DashboardSupperPage from "./pages/dashboardPages/dashboardSupperPage/dashboardSupperPage";
import SingleUserAccess from "./pages/dashboardPages/dashboardSupperPage/singleUserAccess/singleUserAccess";
import DeleteSingleUserAccessPage from "./pages/dashboardPages/dashboardSupperPage/deleteSingleUserAccess/deleteSingleUserAccess";
import { ViewAllFoldersPage } from "./pages/dashboardPages/viewAllFolders/viewAllFolders";
import { ViewAllFilesPage } from "./pages/dashboardPages/viewAllFiles/viewAllFiles";

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route exact path="/dashboardSupperPage" element={<DashboardSupperPage />} />
      <Route exact path="/singleUserAccess" element={<SingleUserAccess />} />
      <Route exact path="/deleteSingleUserAccess" element={<DeleteSingleUserAccessPage />} />
      <Route exact path="/viewAllFolders" element={<ViewAllFoldersPage />} />
      <Route exact path="/viewAllFiles" element={<ViewAllFilesPage />} />
      {/* <Route exact path="/dashboardEmployeePage" element={<DashboardEmployeePage />} /> */}
      {/* <Route exact path="/dashboardSupperPage/createFolders" element={<CreateFolderPage />} />
      <Route exact path="/dashboardSupperPage/createFiles" element={<CreateFilePage />} /> */}
      <Route path="/404" element={<div>page not found</div>}/>
      </Routes>
    </Router>
  );
}

export default App;
