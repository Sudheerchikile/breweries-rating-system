import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import DetailBrewery from './components/DetailBrewery';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

function App() {
  const { loading } = useSelector(state => state.alerts);

  return (
    <div className="App">
      {loading && (
        <div className="loader-parent">
          <div className="spinner-border" role="status">
            
          </div>
        </div>
      )}

      <Router>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/detail-brewery/:id" element={<ProtectedRoute><DetailBrewery /></ProtectedRoute>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
