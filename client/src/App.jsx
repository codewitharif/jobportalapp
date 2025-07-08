import React, { useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import ApplyJob from "../pages/ApplyJob";
import Application from "../pages/Application";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import JobListing from "../components/JobListing";
import AppDownload from "../components/AppDownload";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import RecruiterLogin from "../components/RecruiterLogin";
import Dashboard from "../pages/Dashboard";
import AddJob from "../pages/AddJob";
import ManageJobs from "../pages/ManageJobs";
import ViewApplications from "../pages/ViewApplications";
import "quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";
import ErrorPage from "../pages/ErrorPage";

const App = () => {
  const { showRecruiterLogin, companyToken, userData } = useContext(AppContext);
  const location = useLocation();

  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <div>
      {!isDashboardRoute && <Navbar />}
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer />

      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route
          path="/application"
          element={userData ? <Application /> : <Navigate to="/" replace />}
        />
        <Route path="/apply-jobs" element={<JobListing />} />
        <Route path="*" element={<ErrorPage />} />

        {/* Recruiter Protected Routes */}
        <Route
          path="/dashboard"
          element={companyToken ? <Dashboard /> : <Navigate to="/" replace />}
        >
          <Route index element={<AddJob />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="manage-jobs" element={<ManageJobs />} />
          <Route path="view-applications" element={<ViewApplications />} />
        </Route>
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
