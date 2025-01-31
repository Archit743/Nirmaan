// src/components/Header.js
import LogIn from './Login';
import Register from './Register';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  return (
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <div className="col-md-3 mb-2 mb-md-0">
        <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
          CampusHub
        </a>
      </div>
      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
      <li><Link to="/home" className="nav-link px-2">Home</Link></li>
        <li><Link to="/parking" className="nav-link px-2">Parking</Link></li>
        <li><Link to="/print" className="nav-link px-2">Print</Link></li>
        <li><Link to="/canteen" className="nav-link px-2">Canteen</Link></li>
      </ul>
      <div className="col-md-3 text-end">
        <button type="button" className="btn btn-outline-primary me-2 w-auto inline grid" onClick={() => setOpen(true)}>Login</button>
        <button type="button" className="btn btn-primary w-auto inline grid" onClick={() => setOpen2(true)}>Register</button>
      </div>
      {open && <LogIn setOpen = {setOpen}/>}
    {open2 && <Register setOpen={setOpen} setOpen2 = {setOpen2}/>} 
    </header>
  );
};

export default Header;
