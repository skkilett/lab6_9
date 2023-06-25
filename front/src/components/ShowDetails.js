import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ShowDetails() {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/${id}`)
      .then((res) => res.json())
      .then((data) => setShow(data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="container mt-5">
      {show ? (
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">{show.title}</h1>
            <h2 className="card-subtitle mb-2 text-muted">{show.genre}</h2>
            <h3 className="card-text">{new Date(show.time).toLocaleString()}</h3>
            <p className="card-text">{show.description}</p>
          </div>
        </div>
      ) : (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
}

export default ShowDetails;
