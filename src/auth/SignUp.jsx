import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Simulate signup: store user in localStorage (frontend only)
    const newUser = { name, email, password };
    localStorage.setItem("demoUser", JSON.stringify(newUser));

    setError("");
    alert("Signup successful! You can now sign in.");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 mt-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-black text-center">Create Account</h2>
        <p className="text-gray-600 text-center mt-2">Join the platform</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-black">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border rounded-xl bg-white text-black border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-black">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-xl bg-white text-black border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-black">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border rounded-xl bg-white text-black border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-black">Re-enter Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              className="w-full px-4 py-3 border rounded-xl bg-white text-black border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition shadow-lg"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <NavLink to="/signin" className="text-blue-600 font-semibold hover:underline">
              Sign In
            </NavLink>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

export default SignUp;