import React from "react";
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
            <a href="https://github.com/Harinathlee/upoint-query-builder/blob/master/README.md" className="">
              <p className="link_name">AboutMe</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="https://github.com/Harinathlee/upoint-query-builder/blob/678f35bb8f91dcfab4d33a01082a66a85871846b/src/Documents/tutorial.pdf" className="">
              <p className="link_name">Tutorial</p>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TopBar;
