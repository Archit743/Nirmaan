import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css';

const LogIn = ({ setOpen }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const Verify_Credentials = async (navigate) => {
        const email = document.getElementById("email_input").value;
        const password = document.getElementById("password_input").value;

        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        setLoading(true);

        const loginData = {
            email: email,
            password: password,
        };

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                const data = await response.json();
                console.error('Login Failed: ', data);
                alert('Login Failed: ' + (data.message || 'Unknown error'));
            } else {
                const data = await response.json();
                console.log('Login Successful: ', data);
                localStorage.setItem('jwt', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                alert('Login Successful');
                navigate('/home');
            }
        } catch (error) {
            console.error('Fetch Error: ', error);
            alert('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-Container">
            <div className="login-Wrapper">
                <div className="login-Close" onClick={() => setOpen(false)}>X</div>
                <h1 className="login-Title">LogIn</h1>
                <div className="login-Details">
                    <div className="login-InputContainer">
                        <input className="login-Input" type="email" placeholder="Enter your email ID" id='email_input' />
                    </div>
                    <div className="login-InputContainer">
                        <input className="login-Input" type="password" placeholder="Enter your password" id='password_input' />
                    </div>
                </div>
                <button onClick={() => Verify_Credentials(navigate)} disabled={loading}>
                    {loading ? 'Logging in...' : 'Submit'}
                </button>
            </div>
        </div>
    );
};

export default LogIn;