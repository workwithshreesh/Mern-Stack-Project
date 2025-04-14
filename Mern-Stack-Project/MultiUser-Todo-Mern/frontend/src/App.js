import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import About from './components/about/About';
import Todo from './components/todo/todo';
import SignUp from './components/signup/signup';
import SignIn from './components/signin/signin';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from './Store';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let user = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');

    if (user && token) {
      user = JSON.parse(user);
      dispatch(authActions.login({ user, token }));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
        <Footer />
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
