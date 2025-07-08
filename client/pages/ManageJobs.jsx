import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import Loading from "../components/Loading";

const ManageJobs = () => {
  const navigate = useNavigate();
  const { backendUrl, companyToken } = useContext(AppContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/list-jobs", {
        headers: { token: companyToken },
      });
      if (data.success) {
        setJobs(data.jobData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // Toggle visibility
  const toggleVisibility = async (id) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-visiblity",
        { id },
        {
          headers: { token: companyToken },
        }
      );

      if (data.success) {
        // Update local state after toggling
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === id ? { ...job, visible: data.job.visible } : job
          )
        );
      }
    } catch (error) {
      console.error("Error toggling visibility:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) return <Loading />;
  if (jobs.length === 0)
    return (
      <div className="flex items-start justify-center h-[70vh]">
        <p className="text-xl sm:text-2xl">No Jobs Available or Posted</p>
      </div>
    );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Posted Jobs</h2>
        <button
          onClick={() => navigate("/dashboard/add-job")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add New Job
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Job Title</th>
              <th className="px-4 py-3 max-sm:hidden">Posted On</th>
              <th className="px-4 py-3 max-sm:hidden">Location</th>
              <th className="px-4 py-3">Applicants</th>
              <th className="px-4 py-3">Visible</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={job._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{job.title}</td>
                <td className="px-4 py-3 max-sm:hidden">
                  {moment(Number(job.date)).format("ll")}
                </td>
                <td className="px-4 py-3 max-sm:hidden">{job.location}</td>
                <td className="px-4 py-3">{job.applicants}</td>
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={job.visible}
                    onChange={() => toggleVisibility(job._id)}
                    className="w-4 h-4"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageJobs;
