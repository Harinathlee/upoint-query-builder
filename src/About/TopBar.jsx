import React from "react";
import { Link } from "react-router-dom";
import './Topbar.scss';
import logo from "../Documents/logo192.png"
const TopBar = () => {
  return (
    <div className="nav-main">
      <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand" href="https://github.com/Harinathlee/upoint-query-builder">
       
          <h2 className="main-title"> <img src={logo} alt='logo' className='logo'></img>Upoint-Query-Replicator</h2> 
        </a>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/About" className="">
              <p className="link_name">AboutMe</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Tutorial" className="">
              <p className="link_name">Tutorial</p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TopBar;
