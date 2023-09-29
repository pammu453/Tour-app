import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { setUser } from './redux/features/authSlice';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Headerr';
import AddEditTour from './pages/AddEditTour';
import SingleTour from './pages/SingleTour';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import TagTours from './pages/TagTours';
import { ToastContainer } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import NotFound from './components/NotFound';
import LogOut from './components/LogOut';

function App() {

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(setUser(user))
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tours/search' element={<Home />} />
          <Route path='/tours/tag/:tag' element={<TagTours />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/addtour' element={<PrivateRoute><AddEditTour /></PrivateRoute>} />
          <Route path='/editTour/:id' element={<PrivateRoute><AddEditTour /></PrivateRoute>} />
          <Route path='/tour/:id' element={<SingleTour />} />
          <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path='/logout' element={<LogOut />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
