import { useState } from "react";
import { apiFetch } from "../helpers";
import { Link, useNavigate } from "react-router";
import InputForm from "../components/InputForm.jsx";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Creating account...");

    try {
      const data = await apiFetch("/users/register", {
        method: "POST",
        body: JSON.stringify(form),
      });

      toast.dismiss();
      toast.success("Account created! Please login.");
      setMsg(data.message); // optional tampilkan message dari backend

      navigate("/login"); // redirect ke login
    } catch (err) {
      toast.dismiss();
      toast.error(err?.error || err?.message || "Register failed");
      setMsg(err?.error || "Register failed");
    }
  };

  return (
    <section className="auth-page">
      <Toaster />
      <div className="auth-card">
        <h2>Register</h2>
        {msg && <span className="error-message alert">{msg}</span>}
        <form onSubmit={onSubmit}>
          <InputForm
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            label="Name"
            required={true}
          />
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
            Register
          </button>
          <span className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </span>
        </form>
      </div>
    </section>
  );
}
