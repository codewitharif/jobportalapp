import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [searchFilter, SetSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearched, SetIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);

  //for recruiter
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

  // const [companyToken, setCompanyToken] = useState(null);
  const [companyToken, setCompanyToken] = useState(() => {
    return localStorage.getItem("companyToken");
  });

  const [companyData, setCompanyData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userApplication, setUserApplication] = useState([]);

  // function to fetch job
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/jobs");
      console.log(data.jobs);

      if (data.success) {
        setJobs(data.jobs);
      }
    } catch (error) {
      console.log(error);
    }
    // setJobs(jobsData);
  };

  //fetch company data
  // const fetchCompanyData = async () => {
  //   try {
  //     const { data } = await axios.get(backendUrl + "/api/company/company", {
  //       headers: { token: companyToken },
  //     });
  //     if (data.success) {
  //       console.log(data);
  //       setCompanyData(data.company);
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  const fetchCompanyData = async () => {
    if (!companyToken) return;

    try {
      const { data } = await axios.get(backendUrl + "/api/company/company", {
        headers: { token: companyToken },
      });

      if (data.success) {
        setCompanyData(data.company);
      } else {
        // ❗Token was present but rejected
        toast.error(data.message);

        // 🚫 Clear bad token
        localStorage.removeItem("companyToken");
        setCompanyToken(null);
      }
    } catch (error) {
      toast.error("Something went wrong while fetching company data");
    }
  };

  //function to fetch userData
  const fetchUserData = async () => {
    try {
      const token = await getToken();
      console.log("Clerk JWT Token:", token);
      const { data } = await axios.get(backendUrl + `/api/users/user`, {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Corrected `headers` spelling too
      });

      console.log("my clerk jwt is ", data);

      if (data.success) {
        setUserData(data.user);
      } else {
        console.log("failed to fetch user data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //funtion too fetch users applied applications data
  const fetchUserApplications = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(backendUrl + "/api/users/applications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserApplication(data.applications);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    const storedCompanyToken = localStorage.getItem("companyToken");
    if (storedCompanyToken) {
      setCompanyToken(storedCompanyToken);
    }
  }, []);

  useEffect(() => {
    fetchCompanyData();
  }, [companyToken]);

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchUserApplications();
    }
  }, [user]);

  useEffect(() => {
    fetchJobs();
    const storedCompanyToken = localStorage.getItem("companyToken");
    if (storedCompanyToken) {
      setCompanyToken(storedCompanyToken);
    }
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

    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,

    backendUrl,

    userData,
    setUserData,
    userApplication,
    setUserApplication,
    fetchUserData,
    fetchUserApplications
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
