import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/login_component";
import SignUp from "./components/signup_component";
import UserDetails from "./components/userDetails";
import Navbar from "./components/Navbar";
import AdminHome from "./components/adminHome";
import About from "./components/about";
import ProtectedRoute from "./components/ProtectedRoute";
import BookListing from "./components/BookListing";
import AddEditBook from "./components/AddEditBook";
import BookDetail from "./components/BookDetail";
import ViewBook from "./components/ViewBook";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn"); // Check if logged in
  const userType = window.localStorage.getItem("userType");

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} userType={userType} />

        <Routes>
          {/* unauthorized route */}
          {!isLoggedIn && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/" element={<Login />} />
            </>
          )}

          {/* ProtectedRoutes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
            {userType != "Admin" ? (
              <>
                <Route path="/" element={<Navigate to="/userDetails" />} />
                <Route path="/userDetails" element={<UserDetails />} />
                <Route path="/userDetails" element={<Navigate to="/" />} />
                <Route path="/booklisting" element={<BookListing />} />
                <Route path="/addeditbook" element={<AddEditBook />} />
                <Route path="/bookdetail" element={<BookDetail />} />
                <Route path="/viewbook" element={<ViewBook />} />
                <Route path="/admin-dashboard" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/admin-dashboard" />} />
                

                <Route path="/booklisting" element={<Navigate to="/" />} />
                <Route path="/addeditbook" element={<Navigate to="/" />} />
                <Route path="/bookdetail" element={<Navigate to="/" />} />
                <Route path="/viewbook" element={<Navigate to="/" />} />
                <Route path="/admin-dashboard" element={<AdminHome />} />
              </>
            )}
          </Route>

          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
