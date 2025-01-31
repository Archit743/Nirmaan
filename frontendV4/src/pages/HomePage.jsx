// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Domains from '../components/Domains';
import About from '../components/About';
import '../Styles/HomePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const HomePage = () => {
  return (
    <div className="container-sm" id="nav">
      <Header/>
      <main>
      <section class="top-grid">
        <About/>
      </section>
      <Domains/>
      </main>
      <Footer/>
    </div>
  );
};

export default HomePage;
