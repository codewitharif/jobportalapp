import React, { useState } from "react";
import { assets, jobsApplied } from "../src/assets/assets";
import moment from "moment";

const Application = () => {
  const [isEdit, setEdit] = useState(false);
  const [resume, setResume] = useState(null);
  return (
    <>
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-xl font-semibold">Your Resume</h2>
        <div className="flex gap-2 mb-6 mt-3">
          {isEdit ? (
            <>
              <label className="flex items-center" htmlFor="resumeUpload">
                <p className=" bg-blue-100 text-black px-4 py-2 rounded-lg mr-2">
                  Select Resume
                </p>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setResume(e.target.files[0])}
                  id="resumeUpload"
                  hidden
                />
                <img src={assets.profile_upload_icon} alt="" />
              </label>
              <button
                onClick={() => setEdit(false)}
                className=" bg-green-100 border border-green-400 rounded-lg px-4 py-2"
              >
                Save
              </button>
            </>
          ) : (
            <div className=" flex gap-2">
              {" "}
              <a
                className=" bg-blue-100 text-black border-gray-300 rounded-lg px-4 py-2"
                href=""
              >
                Resume
              </a>{" "}
              <button
                onClick={() => setEdit(true)}
                className="text-gray-500 border border-gray-300 rounded-lg px-4 py-2"
              >
                Edit
              </button>{" "}
            </div>
          )}
        </div>
        <h2 className="text-xl font-semibold mb-4">Jobs Applied</h2>
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-left">Company</th>
              <th className="py-3 px-4 border-b text-left">Job Title</th>
              <th className="py-3 px-4 border-b text-left max-sm:hidden">
                Location
              </th>
              <th className="py-3 px-4 border-b text-left max-sm:hidden">
                Date
              </th>
              <th className="py-3 px-4 border-b text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {jobsApplied.map((job, index) =>
              true ? (
                <tr>
                  <td className="py-3 px-4 flex items-center gap-2 border-b">
                    <img className="w-8 h-8" src={job.logo} alt="" />
                    {job.company}
                  </td>
                  <td>{job.title}</td>
                  <td className="max-sm:hidden">{job.location}</td>
                  <td className="max-sm:hidden">
                    {moment(job.date).format("ll")}
                  </td>
                  <td>
                    <span
                      className={`${
                        job.status === "Accepted"
                          ? "bg-green-100"
                          : job.status === "Rejected"
                          ? "bg-red-100"
                          : "bg-blue-100"
                      } px-4 py-1.5 rounded`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Application;
