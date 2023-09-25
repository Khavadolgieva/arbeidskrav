import React, { useEffect, useState } from 'react';
import { Routes, Route, Outlet, Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Category } from '../components/Category';
import Home from '../components/Home';
import { StartTest } from '../components/StartTest';

export default function App() {
  const [username, setUsername] = useState('');
  const [category, setCategory] = useState('');

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home username={username} setCategory={setCategory} category={category} setUsername={setUsername} />} />
          <Route path="category" element={<Category category={category} setCategory={setCategory} />} />
          {((username && category) || (localStorage.username && localStorage.category)) && (
            <Route path="startTest" element={<StartTest />} />
          )}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.username && localStorage.category) {
      navigate("/startTest");
    }
  }, [navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>404 Not found</h2>
      <p>
        <Link to="/">Gå til hjemmesiden</Link>
      </p>
    </div>
  );
}
