import { useState } from "react";
import { Link } from "react-router";
import digefragsLogo from "../assets/digefrags-logo-ai-generated-bg-removed.png";
import { Menu, X, CircleUserRound } from "lucide-react";
import AdminOnly from "../middlewares/AdminOnly";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
export default function Navbar() {
  const { me, loading } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <header>
      <div>
        {/* Logo */}
        <div>
          <img src={digefragsLogo} alt="Logo Digefrags" />
        </div>
        {/* Navigation links */}
        <nav className={isOpen ? "open" : ""}>
          <Link to="/" className="header-link" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link
            to="/products/lists"
            className="header-link"
            onClick={() => setIsOpen(false)}
          >
            List product
          </Link>
          <AdminOnly>
            <Link
              to="/products/create"
              className="header-link"
              onClick={() => setIsOpen(false)}
            >
              Create product
            </Link>
          </AdminOnly>

          {/* User profile di mobile */}
          <div className="mobile-user-profile">
            <CircleUserRound className="CircleUserRound" />
            <div className="user-profile">
              {me ? (
                <Link to="/profile">
                  <h4>{me.name}</h4>
                  <span>{me.role < 1 ? "(client)" : "(admin)"}</span>
                </Link>
              ) : (
                <span style={{ color: "oklch(87.1% 0.006 286.286)" }}>
                  Loading...
                </span>
              )}
            </div>
          </div>
        </nav>

        {/* Right side desktop */}
        <div className="header-right">
          <div className="user-profile">
            {me ? (
              <Link to="/profile">
                <h4>{me.name}</h4>
                <span>{me.role < 1 ? "(client)" : "(admin)"}</span>
              </Link>
            ) : (
              <span style={{ color: "oklch(87.1% 0.006 286.286)" }}>
                Loading...
              </span>
            )}
          </div>
          <button className="hamburger" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
