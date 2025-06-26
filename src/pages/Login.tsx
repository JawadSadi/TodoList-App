import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");

  const login = useAuthStore((s) => s.login);
  const signup = useAuthStore((s) => s.signup);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const ok = isSignup
      ? signup(username, password)
      : login(username, password);
    if (!ok) {
      setError(isSignup ? "Username already exists" : "Invalid credentials");
    } else {
      navigate("/"); // برو به اپ اصلی
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-80 space-y-4">
        <h2 className="text-2xl font-bold text-center">
          {isSignup ? "Sign Up" : "Sign In"}
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          className="w-full px-4 py-2 border rounded dark:bg-gray-700"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="w-full px-4 py-2 border rounded dark:bg-gray-700"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          onClick={handleSubmit}
        >
          {isSignup ? "Sign Up" : "Sign In"}
        </button>
        <p
          className="text-sm text-center cursor-pointer text-blue-500 hover:underline"
          onClick={() => {
            setIsSignup(!isSignup);
            setError("");
          }}
        >
          {isSignup
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
}
