import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import { assets } from "../src/assets/assets";
import kconvert from "k-convert";
import moment from "moment";
import "../src/App.css";
import JobCard from "../components/JobCard";

const ApplyJob = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { jobs } = useContext(AppContext);

  useEffect(() => {
    if (jobs.length > 0) {
      const job = jobs.find((job) => job._id === id);
      setJobData(job || null);
      setLoading(false);
    }
  }, [id, jobs]);

  if (loading) return <Loading />;

  if (!jobData)
    return (
      <div className="text-center text-red-500 py-10">
        <h2>Job not found</h2>
      </div>
    );

  const moreJobs = jobs
    .filter(
      (job) =>
        job._id !== jobData._id && job.companyId._id === jobData.companyId._id
    )
    .slice(0, 4); // Limit to 4 jobs

  return (
    <div className="min-h-screen py-10 container px-4 2xl:px-20 mx-auto">
      <div className="bg-white w-full border border-gray-200 rounded-xl shadow-sm">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-8 px-6 py-10 bg-sky-50 border border-sky-400 rounded-xl">
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

          <div className="text-center md:text-right space-y-2">
            <button className="bg-blue-600 hover:bg-blue-700 transition text-white font-medium px-6 py-2.5 rounded">
              Apply Now
            </button>
            <p className="text-gray-600 text-sm">
              Posted {moment(jobData.date).fromNow()}
            </p>
          </div>
        </div>

        {/* Description and More Jobs */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 items-start mt-10 px-6 pb-10">
          {/* Left: Job Description */}
          <div className="w-full lg:w-2/3">
            <h2 className="font-bold text-2xl mb-4">Job Description</h2>
            <div
              className="rich-text"
              dangerouslySetInnerHTML={{ __html: jobData.description }}
            ></div>
            <button className="bg-blue-600 hover:bg-blue-700 transition text-white font-medium px-6 py-2.5 rounded mt-10">
              Apply Now
            </button>
          </div>

          {/* Right: More Jobs */}
          <div className="w-full lg:w-1/3">
            <h2 className="font-semibold text-xl mb-4">
              More jobs from {jobData.companyId.name}
            </h2>
            <div className="grid gap-4">
              {moreJobs.length > 0 ? (
                moreJobs.map((job, index) => <JobCard key={index} job={job} />)
              ) : (
                <p className="text-gray-500">No other jobs available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
