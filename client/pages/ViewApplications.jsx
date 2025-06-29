import React, { useState } from "react";
import { assets, viewApplicationsPageData } from "../src/assets/assets";

const ViewApplications = () => {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Job Applications</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Username</th>
              <th className="px-4 py-3">Job Title</th>
              <th className="px-4 py-3 max-sm:hidden">Location</th>
              <th className="px-4 py-3">Resume</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {viewApplicationsPageData.map((applicant, index) => (
              <tr key={index} className="border-t hover:bg-gray-50 relative">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <img
                    src={applicant.imgSrc}
                    alt="user"
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{applicant.name}</span>
                </td>
                <td className="px-4 py-3">{applicant.jobTitle}</td>
                <td className="px-4 py- max-sm:hidden">{applicant.location}</td>
                <td className="px-4 py-3">
                  <a
                    href={applicant.resumeLink || "#"}
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
                          onClick={() => {
                            alert("Accepted");
                            setOpenMenuIndex(null);
                          }}
                        >
                          Accept
                        </button>
                        <button
                          className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          onClick={() => {
                            alert("Rejected");
                            setOpenMenuIndex(null);
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
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
