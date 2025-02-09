import React, { useState } from 'react';
import '../Styles/Register.css';

const Register = ({ setOpen, setOpen2 }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleRegister = async () => {
    const { name, username, email, password } = formData;

    // Basic validation
    if (!name || !username || !email || !password) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://nirmaan-yvtd.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseText = await response.text();
      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        data = { message: responseText };
      }

      if (!response.ok) {
        setError(data.message || 'Registration failed. Please try again.');
        console.error('Registration Failed:', data);
      } else {
        alert('Registration Successful. Login to Continue');
        setOpen2(false);
        setOpen(true);
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-Container">
      <div className="register-Wrapper">
        <div className="register-Close" onClick={() => setOpen2(false)}>
          X
        </div>
        <h1 className="register-Title">Register</h1>
        {error && <div className="register-Error">{error}</div>}
        <div className="register-Details">
          <div className="register-InputContainer">
            <input
              className="register-Input"
              type="text"
              placeholder="Full Name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="register-InputContainer">
            <input
              className="register-Input"
              type="text"
              placeholder="Username"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="register-InputContainer">
            <input
              className="register-Input"
              type="email"
              placeholder="Email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="register-InputContainer">
            <input
              className="register-Input"
              type="password"
              placeholder="Password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button onClick={handleRegister} disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </div>
    </div>
  );
};

export default Register;