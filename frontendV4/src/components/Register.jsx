import React from 'react';
import '../Styles/Register.css';
import { useNavigate } from 'react-router-dom';

const Register_user = async (setOpen,setOpen2) => {
    const name = document.getElementById("name_input").value;
    const email = document.getElementById("email_input").value;
    const password = document.getElementById("password_input").value;
    const loginData = {
        name: name,
        email: email,
        password: password,
    };
  
    try {
        const response = await fetch('https://bandartype-backend.onrender.com/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });
  
        if (!response.ok) {
            const data = await response.json();
            console.error('Registration Failed: ', data);
            alert('Registration Failed: ' + (data.message || 'Unknown error'));
        } else {
            const data = await response.json();
            console.log('Registration Successful: ', data);
            localStorage.setItem('jwt', data.token);
            alert('Registration Successful. Login to Continue');
            setOpen2(false);
            setOpen(true);
        }
    } catch (error) {
        console.error('Fetch Error: ', error);
        alert('An unexpected error occurred');
    }
  };

const Register = ({ setOpen,setOpen2 }) => {
    return (
        <div className="register-Container">
            <div className="register-Wrapper">
                <div className="register-Close" onClick={() => setOpen2(false)}>X</div>
                <h1 className="register-Title">Register</h1>
                <div className="register-Details">
                    <div className="register-InputContainer">
                        <input className="register-Input" type="text" placeholder="Enter your Name" id='name_input' />
                    </div>
                    <div className="register-InputContainer">
                        <input className="register-Input" type="text" placeholder="Enter your email ID" id='email_input' />
                    </div>
                    <div className="register-InputContainer">
                        <input className="register-Input" type="password" placeholder="Enter your password" id='password_input' />
                    </div>
                </div>
                <button onClick={() => Register_user(setOpen,setOpen2)}>Submit</button>
            </div>
        </div>
    );
};

export default Register;
