import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, setToken, setRole } from '../utils/api.js';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await login(username, password);
      if (data.token) {
        setToken(data.token);
        setRole(data.role);
        if (data.role === 'ROLE_ADMIN') {
          navigate('/admin');
        } else {
          navigate('/user');
        }
      } else {
        setError('Login failed');
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sweet Shop Login</h1>
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
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      <p style={styles.link}>
        <a href="/register" style={styles.anchor}>
          Register
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
  button: {
    padding: '8px',
    fontSize: '14px',
    border: '1px solid black',
    backgroundColor: 'white',
    color: 'black',
    cursor: 'pointer',
  },
  error: {
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

export default Login;
