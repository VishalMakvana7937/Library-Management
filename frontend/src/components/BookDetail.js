import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:5000/get-book/${id}`); // Fixing the endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleBorrow = async () => {
    try {
      const response = await fetch(`http://localhost:5000/borrow/${id}`, { method: 'PUT' });
      if (!response.ok) {
        throw new Error('Failed to borrow the book');
      }
      const data = await response.json();
      setBook(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReturn = async () => {
    try {
      const response = await fetch(`http://localhost:5000/return/${id}`, { method: 'PUT' });
      if (!response.ok) {
        throw new Error('Failed to return the book');
      }
      const data = await response.json();
      setBook(data);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!book) return <p>No book found</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>Publication Date: {new Date(book.publicationDate).toLocaleDateString()}</p>
      <p>Status: {book.available ? 'Available' : 'Borrowed'}</p>

      {book.available ? (
        <button onClick={handleBorrow} className="bg-blue-500 text-white px-4 py-2 rounded">Borrow</button>
      ) : (
        <button onClick={handleReturn} className="bg-red-500 text-white px-4 py-2 rounded">Return</button>
      )}
    </div>
  );
};

export default BookDetail;
