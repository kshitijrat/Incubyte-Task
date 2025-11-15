import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSweets, searchSweets, purchaseSweet, getToken, clearToken, clearRole } from '../utils/api.js';

function UserDashboard() {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    loadSweets();
  }, [token, navigate]);

  const loadSweets = async () => {
    try {
      const data = await getSweets(token);
      setSweets(data);
    } catch (err) {
      navigate('/login');
    }
  };

  const handleSearch = async () => {
    if (!search) {
      loadSweets();
      return;
    }
    try {
      const data = await searchSweets(token, search);
      setSweets(data);
    } catch (err) {
      setMessage('Search failed');
    }
  };

  const handlePurchase = async (id) => {
    try {
      await purchaseSweet(token, id, 1);
      setMessage('Purchase successful');
      loadSweets();
    } catch (err) {
      setMessage('Purchase failed');
    }
  };

  const handleLogout = () => {
    clearToken();
    clearRole();
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Sweet Shop</h1>
        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
      </div>

      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>
          Search
        </button>
        <button onClick={loadSweets} style={styles.button}>
          Clear
        </button>
      </div>

      {message && <p style={styles.message}>{message}</p>}

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {sweets.map((sweet) => (
            <tr key={sweet.id} style={styles.tr}>
              <td style={styles.td}>{sweet.name}</td>
              <td style={styles.td}>{sweet.category}</td>
              <td style={styles.td}>{sweet.price}</td>
              <td style={styles.td}>{sweet.quantity}</td>
              <td style={styles.td}>
                <button
                  onClick={() => handlePurchase(sweet.id)}
                  disabled={sweet.quantity === 0}
                  style={{
                    ...styles.button,
                    cursor: sweet.quantity === 0 ? 'not-allowed' : 'pointer',
                  }}
                >
                  Purchase
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid black',
    backgroundColor: 'white',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    color: 'black',
  },
  searchBox: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '8px',
    fontSize: '14px',
    border: '1px solid black',
    backgroundColor: 'white',
    color: 'black',
  },
  button: {
    padding: '8px 16px',
    fontSize: '14px',
    border: '1px solid black',
    backgroundColor: 'white',
    color: 'black',
    cursor: 'pointer',
  },
  message: {
    color: 'black',
    marginBottom: '10px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: 'white',
    color: 'black',
  },
  tr: {
    borderBottom: '1px solid black',
  },
  td: {
    border: '1px solid black',
    padding: '8px',
    color: 'black',
  },
};

export default UserDashboard;
