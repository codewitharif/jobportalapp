import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import { assets } from "../src/assets/assets";
import kconvert from "k-convert";
import moment from "moment";
import "../src/App.css";
import JobCard from "../components/JobCard";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const ApplyJob = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getToken } = useAuth();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);
  // for effect
  const [applyingJobId, setApplyingJobId] = useState(null);
  const { jobs, backendUrl, userData, userApplication, fetchUserApplications } =
    useContext(AppContext);
  const fetchJob = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/jobs/${id}`);
      if (data.success) {
        setJobData(data.job);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const applyHandler = async () => {
    console.log("my job data is ", jobData);
    try {
      console.log("hey i got user data in apply handler function", userData);
      console.log(userData);
      if (!userData) {
        return toast.error("Login to apply for job");
      }
      if (!userData.resume) {
        navigate("/application");
        return toast.error("Upload resume to apply");
      }

      const token = await getToken();

      console.log(jobData._id);
      const { data } = await axios.post(
        backendUrl + "/api/users/apply",
        { jobId: jobData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success("Job Applied Successfully");
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const checkAlreadyApplied = () => {
    const hasApplied = userApplication.some(
      (item) => item.jobId._id === jobData._id
    );
    setIsAlreadyApplied(hasApplied);
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  useEffect(() => {
    if (userApplication.length > 0 && jobData) {
      checkAlreadyApplied();
    }
  }, [jobData, userApplication, id]);

  // Add this effect to scroll to top when job changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (loading) return <Loading />;

  if (!jobData)
    return (
      <div className="text-center text-red-500 py-10">
        <h2>Job not found</h2>
      </div>
    );

  // const moreJobs = jobs
  //   .filter(
  //     (job) =>
  //       job._id !== jobData._id && job.companyId._id === jobData.companyId._id
  //   )
  //   .slice(0, 4); // Limit to 4 jobs

  // ✅ Insert here
  const moreJobs = jobs
    .filter((job) => {
      const isCurrentJob = job._id === jobData._id;
      const isFromSameCompany = job.companyId._id === jobData.companyId._id;
      const isAlreadyApplied = userApplication.some(
        (app) => app.jobId._id === job._id
      );
      return !isCurrentJob && isFromSameCompany && !isAlreadyApplied;
    })
    .slice(0, 4); // Limit to 4 jobs

  console.log("this job is applied or not", isAlreadyApplied);

  return (
    <div className="min-h-screen py-10 container px-4 2xl:px-20 mx-auto">
      <div className="bg-white w-full border border-gray-200 rounded-xl shadow-sm">
        {/* Top Section - Apply Job Header */}
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-8 px-6 py-10 bg-sky-50 border border-sky-400 rounded-xl">
          {/* Company Info */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              className="h-24 w-24 object-contain bg-white rounded-lg p-4 border"
              src={jobData.companyId?.image}
              alt={jobData.companyId?.name || "Company Logo"}
            />
            <div className="text-center md:text-left text-neutral-700">
              <h1 className="text-2xl sm:text-4xl font-semibold mb-2">
                {jobData.title}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-600 text-sm">
                <span className="flex items-center gap-1">
                  <img src={assets.suitcase_icon} alt="Company" />
                  {jobData.companyId?.name}
                </span>
                <span className="flex items-center gap-1">
                  <img src={assets.location_icon} alt="Location" />
                  {jobData.location}
                </span>
                <span className="flex items-center gap-1">
                  <img src={assets.person_icon} alt="Level" />
                  {jobData.level}
                </span>
                <span className="flex items-center gap-1">
                  <img src={assets.money_icon} alt="Salary" />
                  CTC: {kconvert.convertTo(jobData.salary)}
                </span>
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <div className="text-center md:text-right space-y-2">
            <button
              onClick={applyHandler}
              disabled={isAlreadyApplied}
              className={`px-6 py-2.5 rounded font-medium text-white transition ${
                isAlreadyApplied
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isAlreadyApplied ? "Already Applied" : "Apply Now"}
            </button>
            <p className="text-gray-600 text-sm">
              Posted {moment(Number(jobData.date)).fromNow()}
            </p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-8 px-6 py-8">
          {/* Left Column - Job Description (2/3 width) */}
          <div className="lg:w-2/3">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="font-bold text-2xl mb-6">Job Description</h2>
              <div
                className="prose max-w-none rich-text mb-6"
                dangerouslySetInnerHTML={{ __html: jobData.description }}
              ></div>

              <div className="lg:hidden">
                {" "}
                {/* Show only on mobile */}
                <button
                  onClick={applyHandler}
                  disabled={isAlreadyApplied}
                  className={`w-full px-6 py-3 rounded-lg font-medium text-white transition ${
                    isAlreadyApplied
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isAlreadyApplied ? "Already Applied" : "Apply Now"}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - More Jobs (1/3 width) */}
          {/* <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-4">
              <h2 className="font-semibold text-xl mb-4">
                More jobs from {jobData.companyId.name}
              </h2>

              <div className="space-y-4">
                {moreJobs.length > 0 ? (
                  moreJobs.map((job) => (
                    <div
                      key={job._id}
                      className="border p-4 rounded-lg hover:shadow-md transition cursor-pointer"
                      onClick={() => navigate(`/apply-job/${job._id}`)}
                    >
                      <h3 className="font-medium">{job.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {job.location}
                      </p>
                      <p className="text-sm text-blue-600 mt-1">
                        {kconvert.convertTo(job.salary)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No other jobs available from this company
                  </p>
                )}
              </div>
            </div>
          </div> */}

          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 sticky top-6">
              <h2 className="font-semibold text-2xl mb-6 pb-2 border-b border-gray-200 flex items-center gap-2">
                <img
                  src={assets.suitcase_icon}
                  className="h-6 w-6 opacity-70"
                  alt="Jobs"
                />
                More jobs at {jobData.companyId.name}
              </h2>

              <div className="space-y-4">
                {moreJobs.length > 0 ? (
                  moreJobs.map((job) => (
                    // <div
                    //   key={job._id}
                    //   className="border border-gray-200 p-5 rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer group hover:border-blue-200"
                    //   onClick={() => navigate(`/apply-job/${job._id}`)}
                    // >
                    // Add animation class to the job card
                    <div
                      key={job._id}
                      className={`border border-gray-200 p-5 rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer group hover:border-blue-200 ${
                        applyingJobId === job._id
                          ? "ring-2 ring-blue-500 scale-[1.02]"
                          : ""
                      }`}
                      onClick={() => {
                        setApplyingJobId(job._id);
                        navigate(`/apply-job/${job._id}`);
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={job.companyId?.image || assets.default_company}
                          className="h-10 w-10 object-contain rounded-md border p-1 bg-white"
                          alt={job.companyId?.name}
                        />
                        <div>
                          <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="flex items-center text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
                              <img
                                src={assets.location_icon}
                                className="h-3 w-3 mr-1"
                              />
                              {job.location}
                            </span>
                            <span className="flex items-center text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
                              <img
                                src={assets.money_icon}
                                className="h-3 w-3 mr-1"
                              />
                              {kconvert.convertTo(job.salary)}
                            </span>
                          </div>
                          <div className="mt-3 flex justify-between items-center">
                            <span className="text-xs text-gray-500">
                              {moment(Number(job.date)).fromNow()}
                            </span>
                            {/* <button
                              className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100 transition"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/apply-job/${job._id}`);
                              }}
                            >
                              Quick Apply
                            </button> */}
                            <button
                              className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100 transition"
                              onClick={(e) => {
                                e.stopPropagation();
                                setApplyingJobId(job._id); // Highlight the job being applied to
                                setTimeout(() => {
                                  navigate(`/apply-job/${job._id}`);
                                }, 300); // Small delay for visual feedback
                              }}
                            >
                              Quick Apply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <img
                      src={assets.empty_icon}
                      className="h-16 w-16 mx-auto opacity-50 mb-3"
                      alt="No jobs"
                    />
                    <p className="text-gray-500 font-medium">
                      No other openings currently
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Check back later for new opportunities
                    </p>
                  </div>
                )}
              </div>

              {moreJobs.length > 0 && (
                <button
                  className="w-full mt-6 py-2 text-center text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition"
                  onClick={() => navigate(`/company/${jobData.companyId._id}`)}
                >
                  View all jobs at {jobData.companyId.name} →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
