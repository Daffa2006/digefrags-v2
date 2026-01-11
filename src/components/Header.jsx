import { useState } from "react";
import { Link } from "react-router";
import digefragsLogo from "../assets/digefrags-logo-ai-generated-bg-removed.png";
import { Menu, X, CircleUserRound } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header>
      {/* Logo */}
      <div className="header-left">
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
        <Link
          to="/products/create"
          className="header-link"
          onClick={() => setIsOpen(false)}
        >
          Create product
        </Link>

        {/* User profile di mobile */}
        <div className="mobile-user-profile">
          <CircleUserRound className="CircleUserRound"/>
          <div className="user-info">
            <h4>Daffa Anaqi Farid</h4>
            <span>(admin)</span>
          </div>
        </div>
      </nav>

      {/* Right side desktop */}
      <div className="header-right">
        <div className="user-profile">
          <h4>Daffa Anaqi Farid</h4> <span>(admin)</span>
        </div>
        <button className="hamburger" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
