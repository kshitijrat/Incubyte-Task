import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getSweets,
  addSweet,
  updateSweet,
  deleteSweet,
  restockSweet,
  getToken,
  clearToken,
  clearRole,
} from '../utils/api.js';

function AdminDashboard() {
  const [sweets, setSweets] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [editId, setEditId] = useState(null);
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

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addSweet(token, {
        name,
        category,
        price: parseFloat(price),
        quantity: parseInt(quantity),
      });
      setMessage('Sweet added');
      setName('');
      setCategory('');
      setPrice('');
      setQuantity('');
      loadSweets();
    } catch (err) {
      setMessage('Failed to add sweet');
    }
  };

  const handleEdit = (sweet) => {
    setEditId(sweet.id);
    setName(sweet.name);
    setCategory(sweet.category);
    setPrice(sweet.price.toString());
    setQuantity(sweet.quantity.toString());
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateSweet(token, editId, {
        name,
        category,
        price: parseFloat(price),
        quantity: parseInt(quantity),
      });
      setMessage('Sweet updated');
      setEditId(null);
      setName('');
      setCategory('');
      setPrice('');
      setQuantity('');
      loadSweets();
    } catch (err) {
      setMessage('Failed to update sweet');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSweet(token, id);
      setMessage('Sweet deleted');
      loadSweets();
    } catch (err) {
      setMessage('Failed to delete sweet');
    }
  };

  const handleRestock = async (id) => {
    const qty = prompt('Enter quantity to restock:');
    if (qty) {
      try {
        await restockSweet(token, id, parseInt(qty));
        setMessage('Sweet restocked');
        loadSweets();
      } catch (err) {
        setMessage('Failed to restock sweet');
      }
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
        <h1 style={styles.title}>Admin Dashboard</h1>
        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subtitle}>{editId ? 'Edit Sweet' : 'Add Sweet'}</h2>
        <form onSubmit={editId ? handleUpdate : handleAdd} style={styles.form}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="number"
            step="0.01"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={styles.input}
            required
          />
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.button}>
              {editId ? 'Update' : 'Add'}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setName('');
                  setCategory('');
                  setPrice('');
                  setQuantity('');
                }}
                style={styles.button}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {message && <p style={styles.message}>{message}</p>}

      <div style={styles.section}>
        <h2 style={styles.subtitle}>Sweets List</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Quantity</th>
              <th style={styles.th}>Actions</th>
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
                  <button onClick={() => handleEdit(sweet)} style={styles.smallButton}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(sweet.id)} style={styles.smallButton}>
                    Delete
                  </button>
                  <button onClick={() => handleRestock(sweet.id)} style={styles.smallButton}>
                    Restock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
  subtitle: {
    fontSize: '18px',
    color: 'black',
    marginBottom: '10px',
  },
  section: {
    marginBottom: '30px',
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
  buttonGroup: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '8px 16px',
    fontSize: '14px',
    border: '1px solid black',
    backgroundColor: 'white',
    color: 'black',
    cursor: 'pointer',
  },
  smallButton: {
    padding: '4px 8px',
    fontSize: '12px',
    border: '1px solid black',
    backgroundColor: 'white',
    color: 'black',
    cursor: 'pointer',
    marginRight: '5px',
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

export default AdminDashboard;
