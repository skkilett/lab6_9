import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";  // import Form from react-bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

function ShowList() {
  const [shows, setShows] = useState([]);
  const adminPassword = "qwerty";
  const getInitialAdminState = () => localStorage.getItem("isAdmin") === "true";
  const [isAdmin, setAdmin] = useState(getInitialAdminState);
  useEffect(() => {
    fetch("http://localhost:3000/api")
      .then((res) => res.json())
      .then((data) => setShows(data))
      .catch((err) => console.log(err));
  }, []);

  const deleteShow = (id) => {
    fetch(`http://localhost:3000/api/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setShows(shows.filter((show) => show.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const handleAdminToggle = (e) => {
    if (e.target.checked && !isAdmin) {
      const password = prompt("Enter admin password");
      if (password === adminPassword) {
        setAdmin(true);
        localStorage.setItem("isAdmin", "true");
      } else {
        alert("Wrong password!");
        e.target.checked = false;
      }
    } else {
      setAdmin(false);
      localStorage.setItem("isAdmin", "false");
    }
  };

  const sortShowsByName = () => {
    const sortedShows = [...shows].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setShows(sortedShows);
  };
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };
  const sortShowsByTime = () => {
    console.log("Sorting shows by time...");
    const sortedShows = [...shows].sort(
      (a, b) => new Date(a.time) - new Date(b.time)
    );
    setShows(sortedShows);
  };

  return (
    <div className="container mt-5">
      <Form>
        <Form.Check 
          type="switch"
          id="admin-switch"
          label={isAdmin ? "Admin Mode" : "User Mode"}
          onChange={handleAdminToggle}
          className="float-right"
          style={{ fontSize: "1.5rem" }}
          checked={isAdmin}
        />
      </Form>
      <h1 className="mb-4">TV Show List</h1>
      <select
        value={selectedGenre}
        onChange={handleGenreChange}
        className="form-control mb-3"
        style={{ maxWidth: "200px" }} // Limit the width of the select box
      >
        <option value="">-- Select a genre --</option>
        <option value="news">News</option>
        <option value="movie">Movie</option>
        <option value="sport">Sport</option>
        {/* add other genres if necessary */}
      </select>
      <button onClick={sortShowsByTime} className="btn btn-secondary mb-3">
        Sort by time
      </button>
      <button onClick={sortShowsByName} className="btn btn-secondary mb-3 ml-3">
        Sort by name
      </button>
      {isAdmin && (
        <Link to="/add" className="btn btn-primary mb-3 ml-3">
          Add a new show
        </Link>
      )}
      {shows
        .filter((show) => !selectedGenre || show.genre === selectedGenre)
        .map((show, index) => (
          <div key={index} className="card mb-3">
            <div className="card-body">
              <h2 className="card-title">{show.title}</h2>
              <p className="card-text">{show.description}</p>
              <h3 className="card-text">
                {new Date(show.time).toISOString().split(".")[0]}
              </h3>
              <Link to={`/show/${show.id}`} className="btn btn-info mr-2">
                More details
              </Link>
              {isAdmin && (
                <>
                  <Link
                    to={`/edit/${show.id}`}
                    className="btn btn-warning mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteShow(show.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

export default ShowList;
