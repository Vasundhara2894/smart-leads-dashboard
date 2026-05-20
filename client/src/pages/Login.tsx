import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {

      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      toast.success("Login successful");

      navigate("/");

    } catch (error: any) {

      toast.error(
        error.response?.data?.message || "Login failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white p-3 rounded-lg hover:opacity-90"
          >
            {loading ? "Loading..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-4">

          Don't have an account?

          <Link
            to="/register"
            className="text-blue-600 ml-1"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;