import React from 'react';
import '../Styles/Register.css';
import { useNavigate } from 'react-router-dom';

const Register_user = async (setOpen, setOpen2) => {
    const name = document.getElementById("name_input").value;
    const email = document.getElementById("email_input").value;
    const password = document.getElementById("password_input").value;
    const username = document.getElementById("username_input").value; // Get username
    
    const registerData = {
        name: name,
        email: email,
        password: password,
        username: username // Include username
    };

    try {
        const response = await fetch('https://nirmaan-yvtd.onrender.com/register', { // Correct endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData),
        });

        const responseText = await response.text(); // First get text
        let data;
        
        try {
            data = JSON.parse(responseText); // Try to parse as JSON
        } catch {
            data = { message: responseText }; // Fallback to text message
        }

        if (!response.ok) {
            console.error('Registration Failed: ', data);
            alert('Registration Failed: ' + (data.message || 'Unknown error'));
        } else {
            console.log('Registration Successful: ', data);
            // If backend sends token in cookie, it will be handled automatically
            alert('Registration Successful. Login to Continue');
            setOpen2(false);
            setOpen(true);
        }
    } catch (error) {
        console.error('Fetch Error: ', error);
        alert('An unexpected error occurred');
    }
};

const Register = ({ setOpen, setOpen2 }) => {
    return (
        <div className="register-Container">
            <div className="register-Wrapper">
                <div className="register-Close" onClick={() => setOpen2(false)}>X</div>
                <h1 className="register-Title">Register</h1>
                <div className="register-Details">
                    <div className="register-InputContainer">
                        <input className="register-Input" type="text" placeholder="Full Name" id='name_input' />
                    </div>
                    <div className="register-InputContainer">
                        <input className="register-Input" type="text" placeholder="Username" id='username_input' />
                    </div>
                    <div className="register-InputContainer">
                        <input className="register-Input" type="email" placeholder="Email" id='email_input' />
                    </div>
                    <div className="register-InputContainer">
                        <input className="register-Input" type="password" placeholder="Password" id='password_input' />
                    </div>
                </div>
                <button onClick={() => Register_user(setOpen, setOpen2)}>Register</button>
            </div>
        </div>
    );
};

export default Register;