import { useState } from 'react';
import { register } from '../utils/api.js';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await register(username, password, isAdmin);
      setMessage('Registration successful');
      setUsername('');
      setPassword('');
      setIsAdmin(false);
    } catch (err) {
      setMessage('Registration failed');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sweet Shop Register</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <label style={styles.label}>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          Admin
        </label>
        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
      <p style={styles.link}>
        <a href="/login" style={styles.anchor}>
          Login
        </a>
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid black',
    backgroundColor: 'white',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: 'black',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '8px',
    fontSize: '14px',
    border: '1px solid black',
    backgroundColor: 'white',
    color: 'black',
  },
  label: {
    color: 'black',
    fontSize: '14px',
  },
  button: {
    padding: '8px',
    fontSize: '14px',
    border: '1px solid black',
    backgroundColor: 'white',
    color: 'black',
    cursor: 'pointer',
  },
  message: {
    color: 'black',
    marginTop: '10px',
  },
  link: {
    marginTop: '20px',
    color: 'black',
  },
  anchor: {
    color: 'black',
  },
};

export default Register;
