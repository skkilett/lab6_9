import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function ShowForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState({ title: "", genre: "", time: "" });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/api/${id}`)
        .then((res) => res.json())
        .then((data) => setShow(data))
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleChange = (e) => {
    setShow({ ...show, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? "PUT" : "POST";
    const url = id
      ? `http://localhost:3000/api/${id}`
      : `http://localhost:3000/api`;

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(show),
    })
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h1 className="my-3">{id ? "Edit Show" : "Add Show"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            className="form-control"
            name="title"
            value={show.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Genre:</label>
          <input
            className="form-control"
            name="genre"
            value={show.genre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Time:</label>
          <input
            className="form-control"
            type="datetime-local"
            name="time"
            value={show.time}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          {id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}

export default ShowForm;
