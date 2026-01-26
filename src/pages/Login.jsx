import { useState } from "react";
import { apiFetch } from "../helpers";
import { Link, useNavigate } from "react-router";
import InputForm from "../components/InputForm.jsx";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Signing in...");
    try {
      const data = await apiFetch("/users/login", {
        method: "POST",
        body: JSON.stringify(form),
      });
      localStorage.setItem("token", data.token);

      toast.dismiss();
      toast.success("Successfully logged in!");
      setMsg(data.message);
      navigate("/");
    } catch (err) {
      toast.dismiss();
      toast.error(err?.error || err?.message || "Login failed");
      setMsg(err?.error || "Login failed");
    }
  };
  return (
    <section className="auth-page">
      <Toaster />
      <div className="auth-card">
        <h2>Login</h2>
        {msg && <span className="error-message alert">{msg}</span>}
        <form onSubmit={onSubmit}>
          <InputForm
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            label="Email"
            type="email"
            required={true}
          />
          <InputForm
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            label="Password"
            type="password"
            required={true}
          />
          <button className="btn primary" type="submit">
            Login
          </button>
          <span className="auth-switch">
            Don’t have an account? <Link to="/register">Sign up</Link>
          </span>
        </form>
      </div>
    </section>
  );
}
