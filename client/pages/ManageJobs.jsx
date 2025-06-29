import React from "react";
import { manageJobsData } from "../src/assets/assets";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const ManageJobs = () => {
  const navigate = useNavigate();

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
            {manageJobsData.map((job, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{job.title}</td>
                <td className="px-4 py-3 max-sm:hidden">
                  {moment(job.date).format("ll")}
                </td>
                <td className="px-4 py-3 max-sm:hidden">{job.location}</td>
                <td className="px-4 py-3">{job.applicants}</td>
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    defaultChecked={job.visible}
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
