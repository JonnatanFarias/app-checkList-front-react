import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Principal from './pages/Principal';
import Terceira from './pages/Terceira';
import { useState } from 'react';
import './App.css'

function App() {
   const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setAuth={setIsAuthenticated} />} />
        <Route
          path="/principal"
          element={
            isAuthenticated ? <Principal /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/terceira"
          element={
            isAuthenticated ? <Terceira /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
