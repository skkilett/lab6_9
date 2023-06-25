import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ShowList() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api')
      .then((res) => res.json())
      .then((data) => setShows(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">TV Show List</h1>
      <Link to="/add" className="btn btn-primary mb-3">
        Add a new show
      </Link>
      {shows.map((show) => (
        <div key={show._id} className="card mb-3">
          <div className="card-body">
            <h2 className="card-title">{show.title}</h2>
            <p className="card-text">{show.description}</p>
            <Link to={`/show/${show.id}`} className="btn btn-info mr-2">
              More details
            </Link>
            <Link to={`/edit/${show.id}`} className="btn btn-warning">
              Edit
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShowList;
