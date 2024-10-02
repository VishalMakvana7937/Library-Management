import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Ensure this URL is correct

export const getBooks = async () => {
  return await axios.get(`${API_URL}/get-book`);
};

export const createBook = async (book) => {
  return await axios.post(`${API_URL}/create-book`, book);
};

export const updateBook = async (id, book) => {
  return await axios.put(`${API_URL}/update-book/${id}`, book);
};

export const deleteBook = async (id) => {
  return await axios.delete(`${API_URL}/delete-book/${id}`);
};

export const borrowBook = async (id) => {
  return await axios.put(`${API_URL}/borrow/${id}`);
};

export const returnBook = async (id) => {
  return await axios.put(`${API_URL}/return/${id}`);
};
