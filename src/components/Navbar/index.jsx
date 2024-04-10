import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./index.css";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm.toLowerCase()}`); // Route to search results
    setSearchTerm("");
  };

  return (
    <nav className="nav-container">
      <Link to="/" className="link-style">
        <h1>MovieDb</h1>
      </Link>
      <div className="nav-list-container">
        <ul>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "link-style")}
          >
            <li>Popular</li>
          </NavLink>
          <NavLink
            to="/top-rated"
            className={({ isActive }) => (isActive ? "active" : "link-style")}
          >
            <li>TopRated</li>
          </NavLink>
          <NavLink
            to="/up-coming"
            className={({ isActive }) => (isActive ? "active" : "link-style")}
          >
            <li>UpComing</li>
          </NavLink>
        </ul>
        <form onSubmit={handleSubmit} className="search-button-container">
          <input
            className="search"
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="search movies..."
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
