import React, { useState } from 'react';
import LogIn from '../components/Login';
import Register from '../components/Register';
import '../Styles/EntryPage.css';

const EntryPage = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [userType, setUserType] = useState('student'); // 'student' or 'admin'

  const handleSliderChange = () => {
    setUserType(prev => prev === 'student' ? 'admin' : 'student');
  };

  return ( 
    <div className={`container ${userType}`}>
      <div className='header'>   
        <div>CampusHub</div>
      </div>
      
      {/* User Type Slider */}
      <div className="user-type-selector">
        <span className="type-label">Student</span>
        <label className="switch">
          <input 
            type="checkbox" 
            checked={userType === 'admin'}
            onChange={handleSliderChange}
          />
          <span className="slider"></span>
        </label>
        <span className="type-label">Admin</span>
      </div>

      <section className='body'>   
        <button className='login' onClick={() => setOpen(true)}>
          Login
        </button>
        
        {/* Only show register button for students */}
        {userType === 'student' && (
          <button className='register' onClick={() => setOpen2(true)}>
            Register 
          </button>
        )}
      </section>
    
      {open && <LogIn setOpen={setOpen} userType={userType} />}
      {open2 && <Register setOpen={setOpen} setOpen2={setOpen2} userType={userType} />}
    </div>
  );
};

export default EntryPage;