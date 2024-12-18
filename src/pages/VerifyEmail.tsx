import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Loading from "react-loading";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [verified, setVerified] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `https://dotbackendexpresswithjs-4cec.vercel.app/api/auth/verify-email?token=${token}`
        );
        toast.success(response.data.message || "Email verified successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        setVerified(true);
        setTimeout(() => navigate("/email-verified"), 1000);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Failed to verify email. Try again.";
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 5000,
        });
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyEmail();
    } else {
      toast.error("Invalid or missing token.", {
        position: "top-center",
        autoClose: 5000,
      });
      setLoading(false);
    }
  }, [token, navigate]);

  const handleResendToken = async () => {
    try {
      if (!email) {
        toast.error("Please enter your email.", {
          position: "top-center",
          autoClose: 3000,
        });
        return;
      }

      setLoading(true);
      const response = await axios.post(
        "https://dotbackendexpresswithjs-4cec.vercel.app/api/auth/resend-verification-email",
        { email }
      );
      toast.success(
        response.data.message || "Verification email resent successfully!",
        { position: "top-center", autoClose: 5000 }
      );
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to resend verification email. Try again.",
        { position: "top-center", autoClose: 5000 }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        {loading ? (
          <div>
            <Loading type="spin" color="#007BFF" height={70} width={70} />
            <p className="text-gray-500 mt-4">Processing your request...</p>
          </div>
        ) : verified ? (
          ""
        ) : (
          <div>
            <p className="text-gray-700 mb-4">
              Failed to verify your email? You can resend the verification email below.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded p-2 w-full mb-4"
            />
            <button
              onClick={handleResendToken}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Resend Verification Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
