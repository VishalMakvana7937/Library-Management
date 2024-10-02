import React, { useEffect, useState } from 'react';
import { getBooks, borrowBook, returnBook } from '../api';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import BookDetail from './BookDetail';

const BookListing = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks();
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const handleBorrow = async (id) => {
    try {
      await borrowBook(id);
      setBooks(books.map(book => (book._id === id ? { ...book, available: false } : book)));
    } catch (error) {
      console.error("Error borrowing book:", error);
    }
  };

  const handleReturn = async (id) => {
    try {
      await returnBook(id);
      setBooks(books.map(book => (book._id === id ? { ...book, available: true } : book)));
    } catch (error) {
      console.error("Error returning book:", error);
    }
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
  };

  const handleCloseDetail = () => {
    setSelectedBook(null); // Close the book detail view
  };

  return (
    <div>
      <Grid container spacing={2}>
        {books.map(book => (
          <Grid item xs={12} sm={6} md={4} key={book._id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{book.title}</Typography>
                <Typography color="textSecondary">{book.author}</Typography>
                <Typography>{book.genre}</Typography>
                <Typography>{new Date(book.publicationDate).toLocaleDateString()}</Typography>
                {book.available ? (
                  <Button variant="contained" color="primary" onClick={() => handleBorrow(book._id)}>Borrow</Button>
                ) : (
                  <Button variant="contained" color="secondary" onClick={() => handleReturn(book._id)}>Return</Button>
                )}
                <Button variant="outlined" onClick={() => handleSelectBook(book)}>View Details</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedBook && (
        <BookDetail
          book={selectedBook}
          onBorrow={() => handleBorrow(selectedBook._id)}
          onReturn={() => handleReturn(selectedBook._id)}
          onClose={handleCloseDetail} // Pass a close handler
        />
      )}
    </div>
  );
};

export default BookListing;
