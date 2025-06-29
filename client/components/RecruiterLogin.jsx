import React, { useContext, useEffect, useState } from "react";
import { assets } from "../src/assets/assets";
import { AppContext } from "../context/AppContext";
import { RxCross2 } from "react-icons/rx";

const RecruiterLogin = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

  const { setShowRecruiterLogin } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (state === "Signup") {
      if (!isTextDataSubmitted) {
        setIsTextDataSubmitted(true);
      } else {
        // ✅ Final submission logic here (send to backend etc.)
        alert("Signup completed!");
      }
    }

    if (state === "Login") {
      // ✅ Login logic here
      alert("Logged in!");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="relative bg-white w-[90%] max-w-md rounded-xl shadow-xl p-8">
        {/* Close Button */}
        <img
          onClick={() => setShowRecruiterLogin(false)}
          src={assets.cross_icon}
          alt="Close"
          className="w-4 h-4 absolute top-4 right-4 cursor-pointer"
        />

        <h1 className="text-2xl font-bold mb-2 text-center">
          Recruiter {state}
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          {state === "Login"
            ? "Welcome back! Please log in to continue."
            : "Create a new recruiter account."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {state === "Signup" && !isTextDataSubmitted && (
            <>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <img src={assets.person_icon} alt="" className="w-5 h-5 mr-2" />
                <input
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full outline-none"
                  required
                />
              </div>
            </>
          )}

          {!isTextDataSubmitted && (
            <>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <img src={assets.email_icon} alt="" className="w-5 h-5 mr-2" />
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full outline-none"
                  required
                />
              </div>

              <div className="flex items-center border rounded-lg px-3 py-2">
                <img src={assets.lock_icon} alt="" className="w-5 h-5 mr-2" />
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full outline-none"
                  required
                />
              </div>
            </>
          )}

          {/* Upload step */}
          {state === "Signup" && isTextDataSubmitted && (
            <>
              <label className="flex flex-col items-center border border-dashed border-gray-400 py-6 px-4 rounded-lg cursor-pointer">
                <img
                  src={image ? URL.createObjectURL(image) : assets.upload_area}
                  alt="Upload"
                  className="w-24 h-24 object-contain mb-2"
                />
                <p className="text-sm text-gray-500 text-center">
                  Upload Company Logo
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  hidden
                />
              </label>
            </>
          )}

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {state === "Login"
              ? "Login"
              : isTextDataSubmitted
              ? "Complete Signup"
              : "Next"}
          </button>
        </form>

        {/* Switch between login and signup */}
        <p className="text-center mt-4 text-sm text-gray-600">
          {state === "Login" ? (
            <>
              Don’t have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer underline"
                onClick={() => {
                  setState("Signup");
                  setIsTextDataSubmitted(false);
                }}
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer underline"
                onClick={() => {
                  setState("Login");
                  setIsTextDataSubmitted(false);
                }}
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default RecruiterLogin;
