import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import {
  assets,
  JobCategories,
  JobLocations,
  jobsData,
} from "../src/assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
  const { isSearched, searchFilter, SetSearchFilter, jobs } =
    useContext(AppContext);
  // const [showFilter, setShowFilter] = useState(false);
  const [showFilter, setShowFilter] = useState(window.innerWidth >= 1024);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };
  const handleLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((c) => c !== location)
        : [...prev, location]
    );
  };

  // 2. Add a resize listener to handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowFilter(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const matchesCateegory = (job) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category);
    const matchesLocation = (job) =>
      selectedLocations.length === 0 ||
      selectedLocations.includes(job.location);
    const matchesTitle = (job) =>
      searchFilter.title === "" ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

    const matchesSearchLocation = (job) =>
      searchFilter.location === "" ||
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchesCateegory(job) &&
          matchesLocation(job) &&
          matchesTitle(job) &&
          matchesSearchLocation(job)
      );
    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [jobs, selectedCategories, selectedLocations, searchFilter]);

  const jobsPerPage = 6;
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  console.log("i recievd jobs in the component ", jobs);

  return (
    <div className="container 2xl:px-20 mx-auto py-8">
      <div className="lg:flex gap-6">
        {/* Left Filters Sidebar working fine no need to touch it */}

        <aside className="lg:w-72">
          <div className="bg-white shadow p-5 rounded">
            {isSearched && (searchFilter.title || searchFilter.location) && (
              <>
                <h3 className="font-medium text-lg mb-4">Current Search</h3>
                <div className="mb-4 text-gray-600 space-x-2">
                  {searchFilter.title && (
                    <span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">
                      {searchFilter.title}
                      <img
                        className="cursor-pointer"
                        src={assets.cross_icon}
                        alt=""
                        onClick={() =>
                          SetSearchFilter((prev) => ({ ...prev, title: "" }))
                        }
                      />
                    </span>
                  )}
                  {searchFilter.location && (
                    <span className="inline-flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-1.5 rounded">
                      {searchFilter.location}
                      <img
                        className="cursor-pointer"
                        src={assets.cross_icon}
                        alt=""
                        onClick={() =>
                          SetSearchFilter((prev) => ({
                            ...prev,
                            location: "",
                          }))
                        }
                      />
                    </span>
                  )}
                </div>
              </>
            )}

            <button
              onClick={() => setShowFilter(!showFilter)}
              className="lg:hidden px-3 py-2 rounded border border-gray-400 mb-4 w-full"
            >
              {showFilter ? "Hide Filters" : "Show Filters"}
            </button>

            <div className={showFilter ? "block" : "hidden lg:block"}>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-4 sm:gap-8 lg:gap-4">
                <div className="flex-1">
                  <h4 className="font-medium text-lg py-4">
                    Search by Categories
                  </h4>
                  <ul className="space-y-4 text-gray-600">
                    {JobCategories.map((category, index) => (
                      <li className="flex gap-3 items-center" key={index}>
                        <input
                          className="scale-125"
                          type="checkbox"
                          onChange={() => handleCategoryChange(category)}
                          checked={selectedCategories.includes(category)}
                        />
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex-1">
                  <h4 className="font-medium text-lg py-4">
                    Search by Location
                  </h4>
                  <ul className="space-y-4 text-gray-600">
                    {JobLocations.map((location, index) => (
                      <li className="flex gap-3 items-center" key={index}>
                        <input
                          className="scale-125"
                          type="checkbox"
                          onChange={() => handleLocationChange(location)}
                          checked={selectedLocations.includes(location)}
                        />
                        {location}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Cards Section - job listing  */}
        <main className="flex-1">
          <h2 className="font-medium text-3xl py-2 mx-4" id="job-list">
            Latest Jobs
          </h2>
          <p className="mb-4 text-gray-600 mx-4">
            Get your desired job from top companies
          </p>

          <div className="flex flex-wrap justify-start gap-6">
            {paginatedJobs.map((job) => (
              <div className="w-full sm:max-w-[400px] md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]">
                <JobCard key={job._id} job={job} />
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Pagination */}
      {filteredJobs.length > jobsPerPage && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <img src={assets.left_arrow_icon} alt="Previous" />
          </button>

          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white border text-gray-700"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <img src={assets.right_arrow_icon} alt="Next" />
          </button>
        </div>
      )}
    </div>
  );
};

export default JobListing;
