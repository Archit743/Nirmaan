import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css';

const LogIn = ({ setOpen, userType }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const endpoint = userType === 'student' ? '/login' : '/admin/login';
            
            const response = await fetch(`https://nirmaan-yvtd.onrender.com${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Store authentication data
            localStorage.setItem('jwt', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Redirect based on user type
            if (userType === 'student') {
                navigate('/home');
            } else {
                navigate('/admin');
            }

        } catch (error) {
            setError(error.message || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-Container">
            <div className="login-Wrapper">
                <div className="login-Close" onClick={() => setOpen(false)}>×</div>
                <h1 className="login-Title">{userType === 'student' ? 'Student Login' : 'Admin Login'}</h1>
                
                {error && <div className="login-Error">{error}</div>}

                <form onSubmit={handleLogin} className="login-Details">
                    <div className="login-InputContainer">
                        <input
                            type="email"
                            placeholder="Enter your email ID"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            className="login-Input"
                            required
                        />
                    </div>

                    <div className="login-InputContainer">
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            className="login-Input"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="login-SubmitButton"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LogIn;