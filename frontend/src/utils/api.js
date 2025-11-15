const API_BASE = 'http://localhost:8080/api';

export const login = async (username, password) => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};

export const register = async (username, password, isAdmin) => {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, isAdmin }),
  });
  return response.json();
};

export const getSweets = async (token) => {
  const response = await fetch(`${API_BASE}/sweets`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
};

export const searchSweets = async (token, name) => {
  const response = await fetch(`${API_BASE}/sweets/search?name=${name}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
};

export const purchaseSweet = async (token, id, quantity = 1) => {
  const response = await fetch(`${API_BASE}/sweets/${id}/purchase?q=${quantity}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
};

export const addSweet = async (token, sweet) => {
  const response = await fetch(`${API_BASE}/sweets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(sweet),
  });
  return response.json();
};

export const updateSweet = async (token, id, sweet) => {
  const response = await fetch(`${API_BASE}/sweets/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(sweet),
  });
  return response.json();
};

export const deleteSweet = async (token, id) => {
  const response = await fetch(`${API_BASE}/sweets/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.ok;
};

export const restockSweet = async (token, id, quantity) => {
  const response = await fetch(`${API_BASE}/sweets/${id}/restock?q=${quantity}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
};

export const getToken = () => localStorage.getItem('token');
export const setToken = (token) => localStorage.setItem('token', token);
export const clearToken = () => localStorage.removeItem('token');
export const getRole = () => localStorage.getItem('role');
export const setRole = (role) => localStorage.setItem('role', role);
export const clearRole = () => localStorage.removeItem('role');
