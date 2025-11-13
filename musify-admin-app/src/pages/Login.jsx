import { Lock, Mail } from "lucide-react";
import { assets } from "../../../musify-app/src/assets/assets";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated, loading: authLoading } = useAuth();

  //redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated()) {
      navigate("/add-song", { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
        </div>
      </div>
    );
  }

  if (isAuthenticated()) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true); // ensure loading starts before API call
      const result = await login(email, password);
      if (result?.success) {
        toast.success("Admin logged in successfully!");
        navigate("/add-song");
      } else {
        // fallback message in case result.message is undefined or empty
        toast.error(result?.message || "Login failed. Please try again.");
      }
    } catch (e) {
      // prevent crashing if e.message is undefined (rare, but safe)
      toast.error(e?.message || "Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/*Header*/}
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center mb-6">
              <img src={assets.logo} alt="logo" className="w-12 h-12" />
              <h1 className="ml-3 text-3xl font-bold text-white">Musify</h1>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Admin Panel</h2>
          <p className="text-gray-300">Sign in to manage music library</p>
        </div>
      </div>

      {/*Login Form*/}
      <div className="bg-white/10 backdrop-blug-lg rounded-2xl p-8 shadow-2xl border border-gray-700">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/*Email field*/}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 tegray400'" />
              </div>
              <input
                type="text"
                name="email"
                id="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 tegray400'" />
              </div>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {/*Login butom*/}
          <button
            disabled={loading}
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r bg-green-500 to-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Signing in...
              </div>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
