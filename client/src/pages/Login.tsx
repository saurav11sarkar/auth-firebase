/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { EyeClosed, EyeIcon, Github, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { auth } from "../firebase/firebase.init";

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState({
    google: false,
    github: false,
    email: false,
  });
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleLogin = async () => {
    try {
      setLoading((prev) => ({ ...prev, google: true }));
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userData = {
        name: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
        ways: "google",
      };

      const res = await fetch("http://localhost:5000/api/user/create/social", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        throw new Error("Failed to authenticate with Google");
      }

      const resultData = await res.json();
      localStorage.setItem("accessToken", resultData.data.accessToken);
      navigate("/");
      alert("Google login successful");
    } catch (error: any) {
      alert(error.message || "Google login failed");
    } finally {
      setLoading((prev) => ({ ...prev, google: false }));
    }
  };

  const handleGithubLogin = async () => {
    try {
      setLoading((prev) => ({ ...prev, github: true }));
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;

      const userData = {
        name: user.displayName || "GitHub User",
        email: user.email || "sarkarsaurav11@outlook.com",
        photoURL: user.photoURL || "",
        ways: "github",
      };

      const res = await fetch("http://localhost:5000/api/user/create/social", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        throw new Error("Failed to authenticate with GitHub");
      }

      const resultData = await res.json();
      localStorage.setItem("accessToken", resultData.data.accessToken);
      navigate("/");
      alert("GitHub login successful");
    } catch (error: any) {
      alert(error.message || "GitHub login failed");
      console.error("GitHub login error:", error);
    } finally {
      setLoading((prev) => ({ ...prev, github: false }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading((prev) => ({ ...prev, email: true }));
      // TODO: Implement email/password login
      console.log(formValues);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Email login would be implemented here");
    } catch (error: any) {
      alert(error.message || "Email login failed");
    } finally {
      setLoading((prev) => ({ ...prev, email: false }));
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col justify-center items-center px-4">
      <div className="w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Welcome Back
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                id="password"
                name="password"
                required
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                placeholder="••••••••"
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
              >
                {showPass ? <EyeClosed size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading.email}
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              loading.email ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading.email ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={handleGithubLogin}
              disabled={loading.github}
              type="button"
              className={`w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                loading.github ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              <Github className="w-5 h-5 mr-2" />
              {loading.github ? "Processing..." : "GitHub"}
            </button>
            <button
              onClick={handleGoogleLogin}
              disabled={loading.google}
              type="button"
              className={`w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                loading.google ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              <Mail className="w-5 h-5 mr-2" />
              {loading.google ? "Processing..." : "Google"}
            </button>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
