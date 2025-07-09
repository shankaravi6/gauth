import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

const Home = () => {
  const [state, setState] = useState({
    openAl: false,
    vertical: "top",
    horizontal: "center",
  });
  const [books, setBooks] = useState([]);
  const { vertical, horizontal, openAl } = state;

  const data = localStorage.getItem("userdet");
  const token = localStorage.getItem("google_id_token");
  const userData = JSON.parse(data);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !userData) {
      navigate("/");
    } else {
      fetchBooks();
    }
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(
        `https://gauth-server-u4ww.onrender.com/api/purchased-books?email=${userData?.email}`,
        //`http://localhost:7878/api/purchased-books?email=${userData?.email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBooks(res.data.books || []);
    } catch (err) {
      console.error("Error fetching books", err);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "https://gauth-server-u4ww.onrender.com/api/send",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data === "Email Sent Successfully!") {
        setState({ ...state, openAl: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleAlClose = () => {
    setState({ ...state, openAl: false });
  };

  return (
    <div className="home">
      <div className="card">
        <img src={userData?.picture} width="100%" className="img-box" />
        <h1>
          {userData?.given_name} {userData?.family_name}
        </h1>
        <h2 style={{ color: "gray" }}>{userData?.email}</h2>
        <p style={{ width: "auto", textAlign: "center", padding: "0 3rem" }}>
          <span style={{ fontFamily: "unset !important" }}>&#9432;</span> These
          details are fetched from Google authentication, your data is
          confidential.
        </p>
        <button type="button" className="btn" onClick={handleSubmit}>
          Get Mail
        </button>
        <p className="logout" onClick={logout}>
          Logout
        </p>

        <div
          style={{
            marginTop: "5px",
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h3>📚 Your Purchased Books:</h3>
          <ul style={{ paddingTop: "5px" }}>
            {books.map((book, index) => (
              <li key={index}>{book}</li>
            ))}
          </ul>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openAl}
        autoHideDuration={2000}
        onClose={handleAlClose}
      >
        <Alert
          onClose={handleAlClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Email Sent successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
