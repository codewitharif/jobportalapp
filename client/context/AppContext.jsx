import { createContext, useEffect, useState } from "react";
import { jobsData } from "../src/assets/assets";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [searchFilter, SetSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearched, SetIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);

  //for recruiter
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

  // function to fetch job
  const fetchJobs = async () => {
    setJobs(jobsData);
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  const value = {
    SetSearchFilter,
    searchFilter,
    isSearched,
    SetIsSearched,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
