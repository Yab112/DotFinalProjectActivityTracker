import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface FormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let valid = true;
    const errors: { email?: string; password?: string } = {};

    if (!formData.email) {
      valid = false;
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      valid = false;
      errors.email = "Invalid email format.";
    }

    if (!formData.password) {
      valid = false;
      errors.password = "Password is required.";
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true); // Set loading to true

    try {
      const response = await axios.post(
        "https://dotbackendexpresswithjs-4cec.vercel.app/api/auth/login",
        formData
      );
      const { userDetails } = response.data;
      console.log("Backend Response: ", response.data);

      if (userDetails && userDetails.token) {
        localStorage.setItem("token", userDetails.token);
        localStorage.setItem("name", userDetails.username);
        localStorage.setItem("id", userDetails.id);
        toast({
          title: "Authorized",
          description: `Welcome back, ${userDetails.username}!`,
        });

        console.log("Navigating to /home...");
        setTimeout(() => navigate("/home"), 0);
      } else {
        toast({
          title: "Unauthorized",
          description: "Login failed. Invalid credentials.",
        });
      }
    } catch (error) {
      console.error("Failed to login", error);
      toast({
        title: "Unauthorized",
        description: "Failed to login. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto p-4 h-screen flex items-center justify-center bg-black">
      <div className="flex max-w-7xl w-full h-96 bg-transparent rounded-lg shadow-xl overflow-hidden border-green-500 border-2">
      <div className="w-1/2 p-6 flex flex-col justify-center items-center bg-cover bg-center">
          <h3 className="text-4xl font-bold text-green-400 text-center">
            Welcome Back to Gym Tracker
          </h3>
          <p className="text-lg text-gray-300 mt-4 text-center">
            Log in to track your workouts, monitor progress, and crush your
            fitness goals. Your journey starts here!
          </p>
          <div className="mt-6">
            <span role="img" aria-label="muscle" className="text-6xl">
              💪
            </span>
          </div>
        </div>
        {/* Form Section */}
        <div className="w-1/3  p-6 flex flex-col items-center justify-center space-y-6 bg-trnansparent">
          <h2 className="text-3xl font-semibold text-white">Login</h2>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col space-y-4"
          >
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } bg-transparent text-slate-300 focus:outline-none focus:border-green-500`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } bg-transparent text-slate-300 focus:outline-none focus:border-green-500`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading} // Disable button when loading
              className={`w-full py-2 rounded-lg text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <a
              href="http://localhost:5001/api/auth/google"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow hover:bg-gray-100"
            >
              <img
                src="/google-icon-logo-svgrepo-com.svg"
                alt="Google Logo"
                className="w-5 h-5"
              />
              Login with Google
            </a>
            <p className="text-sm text-center text-gray-700">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>

        {/* Illustration Section */}
       
      </div>
    </div>
  );
};

export default LoginPage;
