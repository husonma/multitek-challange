import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
const Home = () => (
  <div className="home">
    <h2>Welcome to Multitek Movie App</h2>
    <Link to="/search">
      <button className="btn">Go to Search</button>
    </Link>
  </div>
);

export default Home;
