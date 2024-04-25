import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Handles form input changes and updates the state
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Handles form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make an HTTP POST request to the backend
      const response = await axios.post('http://localhost:5001/api/register', formData, {
        withCredentials: true  // If using cookies for session management, include this
      });
      console.log('Registration successful', response.data);
      alert('Registration successful');
    } catch (error) {
      console.error('Registration failed', error.response);
      alert('Registration failed: ' + error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  );
}

export default Register;
