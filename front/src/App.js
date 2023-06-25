import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowList from './components/ShowList';
import ShowDetails from './components/ShowDetails';
import ShowForm from './components/ShowForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShowList />} />
        <Route path="/show/:id" element={<ShowDetails />} />
        <Route path="/edit/:id" element={<ShowForm />} />
        <Route path="/add" element={<ShowForm />} />
      </Routes>
    </Router>
  );
}

export default App;
