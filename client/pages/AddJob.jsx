import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { assets, JobCategories, JobLocations } from "../src/assets/assets";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Banglore");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner Level");
  const [salary, setSalary] = useState("");
  const [quill, setQuill] = useState(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && !quill) {
      const quillInstance = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write job description here...",
      });
      setQuill(quillInstance);
    }
  }, [quill]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const description = quill?.root.innerHTML;

    const jobData = {
      title,
      location,
      category,
      level,
      salary,
      description,
    };

    console.log("Submitting Job:", jobData);

    // You can send `jobData` to your backend API here.
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">Job Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded-md outline-blue-500"
            placeholder="e.g. Frontend Developer"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border px-3 py-2 rounded-md outline-blue-500"
            >
              {JobLocations.map((location, index) => (
                <option key={index + 1} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border px-3 py-2 rounded-md outline-blue-500"
            >
              {JobCategories.map((category, index) => (
                <option key={index + 1} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Experience Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full border px-3 py-2 rounded-md outline-blue-500"
            >
              <option>Beginner Level</option>
              <option>Mid Level</option>
              <option>Senior Level</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Salary (₹/month)</label>
            <input
              type="number"
              value={salary}
              min={0}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full border px-3 py-2 rounded-md outline-blue-500"
              placeholder="e.g. 60000"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Job Description</label>
          <div
            ref={editorRef}
            className="bg-white border min-h-[180px] rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;
