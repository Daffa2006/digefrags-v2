import { useEffect, useState } from "react";
import { apiFetch } from "../helpers";
import { Link, useNavigate } from "react-router";
import InputForm from "../components/InputForm.jsx";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    Swal.fire({
      title: "Google Analytics Report",
      position: "top",
      customClass: {
        title: "swal-text-small",
        htmlContainer: "swal-text-small",
        confirmButton: "swal-text-small",
      },
      html: `
               <p>You can view the latest website analytics report here:</p>
               <a
                 href="https://analytics.google.com/analytics/web/?hl=id#/a381828701p521431195/realtime/pages?params=_u..nav%3Dmaui"
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 Open Google Analytics
               </a>
             `,
      confirmButtonText: "Got it",
    });
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Signing you in...");
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
