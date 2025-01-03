import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useToast } from "../hooks/use-toast";
import axios from "axios";

interface FormData {
  username: string;
  email: string;
  password: string;
  profilePicture: string;
}

const MyForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    // base_url = "https://dotbackendexpresswithjs.vercel.app"
    username: "",
    email: "",
    password: "",
    profilePicture: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        "https://dotbackendexpresswithjs-4cec.vercel.app/api/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);

      // Redirect to the registration success page
      if (response.status === 201) {
        toast({
          title: "Success",
          description: "Registration successful!",
        });
        navigate("/registration-success");
      } else {
        toast({
          title: "Error",
          description: "Failed to register. Please try again.",
        });
      }
    } catch (error: any) {
      console.error("Error details:", error);
      setLoading(false);
      if (error.response) {
        toast({
          title: "Error",
          description: error.response.data.message || "An error occurred",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to register. Please try again.",
        });
      }
    }
  };

  return (
    <div className=" flex items-center justify-center h-screen bg-black w-full ">
      <div className="flex max-w-7xl h-auto w-full bg-transparent rounded-lg shadow-xl overflow-hidden border-green-400 border-2">
        {/* Form Section */}
        <div className="w-1/3  flex flex-col justify-center space-y-6 bg-trnsparent p-4">
          <h2 className="text-3xl font-bold text-gray-100 text-center">
            Create an Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border bg-transparent border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border bg-transparent border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border bg-transparent  border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "registering..." : "SignUp"}
            </button>
          </form>
          {/* Google Signup Button */}
          <a
            href="http://localhost:5001/api/auth/google"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow hover:bg-gray-100"
          >
            <img
              src="/google-icon-logo-svgrepo-com.svg"
              alt="Google Logo"
              className="w-5 h-5"
            />
            Signup with Google
          </a>
          <p className="text-sm text-center text-gray-700">
            Alread have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              login here
            </Link>
          </p>
        </div>

        {/* Illustration Section */}
        <div className="w-1/2 p-6 flex flex-col justify-center items-center bg-cover bg-center">
          <h3 className="text-4xl font-bold text-white text-center">
            Welcome to Gym Tracker
          </h3>
          <p className="text-lg text-white mt-4 text-center">
            Track your workouts, monitor progress, and achieve your fitness
            goals. Let’s build strength together!
          </p>
          <div className="mt-6">
            <span role="img" aria-label="muscle" className="text-6xl">
              💪
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyForm;
