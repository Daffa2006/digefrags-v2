import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
export default function Profile() {
  const { me, loading } = useContext(UserContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    toast.info("Logging out...");
    navigate("/login");
  };
  return (
    <div className="profile-page">
      <Toaster />
      <h2>Profile</h2>
      {loading ? (
        <Loader2 />
      ) : (
        <div className="profile-table">
          <div className="row">
            <span className="label">Name</span>
            <span className="value">{me.name}</span>
          </div>
          <div className="row">
            <span className="label">Email</span>
            <span className="value">{me.email}</span>
          </div>
          <div className="row">
            <span className="label">Role</span>
            <span className="value">{me.role < 1 ? "Client" : "Admin"}</span>
          </div>
        </div>
      )}

      <button className="btn delete" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
