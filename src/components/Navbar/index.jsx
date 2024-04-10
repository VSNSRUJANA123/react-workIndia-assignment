import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";

import "./index.css";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menu, setMenu] = useState(true);
  const navigate = useNavigate();
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm.toLowerCase()}`); // Route to search results
    setSearchTerm("");
  };

  const clickMenu = () => {
    setMenu(!menu);
  };

  return (
    <nav className="nav-container">
      <Link to="/" className="link-style">
        <h1>MovieDb</h1>
      </Link>
      <div className="menu-small" onClick={clickMenu}>
        <IoMdMenu />
      </div>
      <div
        className={menu ? "nav-list-container active-ul" : "nav-list-container"}
      >
        <ul className=" ul-container">
          <NavLink
            onClick={clickMenu}
            to="/"
            className={({ isActive }) => (isActive ? "active" : "link-style")}
          >
            <li>Popular</li>
          </NavLink>
          <NavLink
            onClick={clickMenu}
            to="/top-rated"
            className={({ isActive }) => (isActive ? "active" : "link-style")}
          >
            <li>TopRated</li>
          </NavLink>
          <NavLink
            onClick={clickMenu}
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
