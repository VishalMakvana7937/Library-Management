import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';

const AddEditBook = () => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    genre: '',
    publicationDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/create-book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      if (!response.ok) {
        throw new Error('Failed to create book');
      }
      const data = await response.json();
      console.log('Book created:', data);
      // Optionally clear form or show success message
      setBookData({
        title: '',
        author: '',
        genre: '',
        publicationDate: '',
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add a New Book
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={bookData.title}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Author"
              name="author"
              value={bookData.author}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Genre"
              name="genre"
              value={bookData.genre}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Publication Date"
              name="publicationDate"
              type="date"
              value={bookData.publicationDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Book
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddEditBook;
