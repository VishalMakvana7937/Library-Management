import React, { useState, useEffect } from 'react';
import {
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Typography,
  DialogContentText
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const ViewBook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Fetch books from the backend
  useEffect(() => {
    fetch("http://localhost:5000/get-book")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error(error));
  }, []);

  // Open dialog for editing a book
  const handleEdit = (book) => {
    setSelectedBook(book);
    setIsEditDialogOpen(true);
  };

  // Open delete confirmation dialog
  const handleDelete = (book) => {
    setBookToDelete(book);
    setIsDeleteDialogOpen(true);
  };

  // Confirm and delete book
  const confirmDelete = async () => {
    if (bookToDelete) {
      try {
        const response = await fetch(`http://localhost:5000/delete-book/${bookToDelete._id}`, { method: 'DELETE' });
        if (response.ok) {
          setBooks(books.filter((book) => book._id !== bookToDelete._id));
          setSnackbarMessage('Book deleted successfully.');
        } else {
          const data = await response.json();
          setSnackbarMessage(data.error || 'Failed to delete book.');
        }
      } catch (error) {
        setSnackbarMessage('An error occurred while deleting the book.');
      }
      setIsDeleteDialogOpen(false);
    }
  };

  // Handle form input change for edit
  const handleInputChange = (e) => {
    setSelectedBook({ ...selectedBook, [e.target.name]: e.target.value });
  };

  // Handle updating a book
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/update-book/${selectedBook._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedBook),
      });
      if (response.ok) {
        const updatedBook = await response.json();
        setBooks(books.map((book) => (book._id === updatedBook._id ? updatedBook : book)));
        setSnackbarMessage('Book updated successfully.');
        setIsEditDialogOpen(false);
      } else {
        const data = await response.json();
        setSnackbarMessage(data.error || 'Failed to update book.');
      }
    } catch (error) {
      setSnackbarMessage('An error occurred while updating the book.');
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Book List
      </Typography>
      <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="subtitle1">Title</Typography></TableCell>
              <TableCell><Typography variant="subtitle1">Author</Typography></TableCell>
              <TableCell><Typography variant="subtitle1">Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book._id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(book)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(book)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Book Dialog */}
      {selectedBook && (
        <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
          <DialogTitle>Edit Book</DialogTitle>
          <DialogContent>
            <TextField
              name="title"
              label="Title"
              fullWidth
              margin="normal"
              value={selectedBook.title}
              onChange={handleInputChange}
            />
            <TextField
              name="author"
              label="Author"
              fullWidth
              margin="normal"
              value={selectedBook.author}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsEditDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUpdate} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      {bookToDelete && (
        <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
          <DialogTitle>Delete Book</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete the book titled <strong>{bookToDelete.title}</strong> by {bookToDelete.author}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDeleteDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={6000}
        message={snackbarMessage}
        onClose={() => setSnackbarMessage('')}
      />
    </div>
  );
};

export default ViewBook;
