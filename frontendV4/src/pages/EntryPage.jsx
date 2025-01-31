import React, { useState } from 'react';
import LogIn from '../components/Login';
import Register from '../components/Register';
import '../Styles/EntryPage.css';

const EntryPage = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  return ( 
    <>
    <div className='container'>
      <div className='header'>   
        <div>CampusHub</div>
      </div>
      <section className='body'>   
        <button className='login' onClick={() => setOpen(true)}>
          Login
        </button>
        <button className='register'  onClick={() => setOpen2(true)}>
          Register 
        </button>
      </section>
    </div>
    {open && <LogIn setOpen = {setOpen}/>}
    {open2 && <Register setOpen={setOpen} setOpen2 = {setOpen2}/>}
    </>
  );
};

export default EntryPage;
