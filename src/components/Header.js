import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => (
  <header>
    <Link to="/">
      <img
        src={`${process.env.PUBLIC_URL}/header-logo-tr.svg`}
        alt="Logo"
        className="img-fluid"
      />
    </Link>
    <nav>
      <Link className="nav-link" to="/">
        Home
      </Link>
      <Link className="nav-link" to="/search">
        Search
      </Link>
    </nav>
  </header>
);

export default Header;
