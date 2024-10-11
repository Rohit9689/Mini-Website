"use client"; 

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/BookInfo">Book Information</a>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item dropdown">
              <a 
                className="nav-link dropdown-toggle" 
                href="#" 
                id="navbarDropdown" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-haspopup="true" 
                aria-expanded="false"
              >
                Add Information
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="/AddBook">Add Book</a></li>
                <li><a className="dropdown-item" href="/AddReviews">Add Reviews</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Dont Touch</a></li>
              </ul>
            </li>
          </ul>
          <div className={styles.trademark}>
            <label className={styles.trademarkLabel}>CHADHUVUKONDI FIRST</label>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
