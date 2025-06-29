import React, { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import 'quill/dist/quill.snow.css'
const App = () => {
  const { showRecruiterLogin } = useContext(AppContext);

  const location = useLocation();

  // ✅ Detect if we are inside /dashboard route
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <div>
       {!isDashboardRoute && <Navbar />}
      {showRecruiterLogin && <RecruiterLogin />}
      {showRecruiterLogin && <RecruiterLogin />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/application" element={<Application />} />
        <Route path="/apply-jobs" element={<JobListing />} />

        {/* for recruiters */}
        <Route path="/dashboard" element={<Dashboard />}>
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
