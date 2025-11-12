import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  function handleLogin(e) {
    e.preventDefault();
    axios.post('http://localhost:5001/api/auth/login', { email, password })
      .then(() => {
        props.onLogin();
      })
      .catch(() => {
        setMensaje('Correo o contraseña incorrectos');
      });
  }

  return (
    <div className="login-box">
      <h2>Login Form</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email or Phone"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      {mensaje && <p className="error-message">{mensaje}</p>}

      <p>
        Forgot password? <a href="#">Click here</a>
      </p>
      <p>
        Not a member? <a href="#">Signup now</a>
      </p>
    </div>
  );
}

export default Login;
