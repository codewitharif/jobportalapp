import React, { useContext, useEffect, useState } from "react";
import { assets, viewApplicationsPageData } from "../src/assets/assets";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "../components/Loading";

const ViewApplications = () => {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const { backendUrl, companyToken } = useContext(AppContext);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompanyJobApplicants = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/applicants", {
        headers: { token: companyToken },
      });
      console.log("my data is ", data);
      if (data.success) {
        setApplicants(data.applications);
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //fun. change job application status

  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-status",
        { id, status },
        { headers: { token: companyToken } }
      );
      if (data.success) {
        toast.success(data.message);
        fetchCompanyJobApplicants();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplicants();
    }
  }, [companyToken]);

  if (loading) return <Loading />;
  if (applicants.length === 0)
    return (
      <div className="flex items-start justify-center h-[70vh]">
        <p className="text-xl sm:text-2xl">No Applicants Applied!</p>
      </div>
    );
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 sm:text-sm font-normal">
        Job Applications
      </h2>
      <div className="overflow-x bg-white shadow-md rounded-lg">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Username</th>
              <th className="px-4 py-3">Job Title</th>
              <th className="px-4 py-3 max-sm:hidden">Location</th>
              <th className="px-4 py-3 max-sm:hidden">Resume</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants
              .filter((item) => item.jobId && item.userId)
              .map((applicant, index) => (
                <tr key={index} className="border-t hover:bg-gray-50 relative">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <img
                      src={applicant.userId.image}
                      alt="user"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{applicant.userId.name}</span>
                  </td>
                  <td className="px-4 py-3">{applicant.jobId.title}</td>
                  <td className="px-4 py- max-sm:hidden">
                    {applicant.jobId.location}
                  </td>
                  <td className="px-4 py-3 max-sm:hidden">
                    <a
                      href={applicant.userId.resume || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:underline"
                    >
                      Resume
                      <img
                        src={assets.resume_download_icon}
                        alt="download"
                        className="w-4 h-4"
                      />
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    {applicant.status === "Pending" ? (
                      <div className="relative inline-block text-left">
                        <button
                          onClick={() => toggleMenu(index)}
                          className="text-xl px-2 py-1 rounded hover:bg-gray-200"
                        >
                          ...
                        </button>

                        {openMenuIndex === index && (
                          <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                            <button
                              className="block w-full px-4 py-2 text-sm text-green-600 hover:bg-gray-100"
                              onClick={() =>
                                changeJobApplicationStatus(
                                  applicant._id,
                                  "Accepted"
                                )
                              }
                            >
                              Accept
                            </button>
                            <button
                              className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              onClick={() =>
                                changeJobApplicationStatus(
                                  applicant._id,
                                  "Rejected"
                                )
                              }
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          applicant.status === "Accepted"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {applicant.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
