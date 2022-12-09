import React from 'react';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import Profile from './components/profile/profile';
import UserForm from './components/userForm/userForm';
import Error404 from './components/errors/404';
import './styles/App.scss';

function App() {
  let activeClassName = "active";
  return (
    <div className="App">
    <BrowserRouter><header>
        Dynamic solutions
        <nav>
          <NavLink to="" className={({ isActive }) => isActive ? activeClassName : ""}>Profile</NavLink>
          <NavLink to="edit" className={({ isActive }) => isActive ? activeClassName : ""}>Edit</NavLink>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Profile/>} />
        <Route path="edit" element={<UserForm/>} />
        <Route path="*" element={<Error404/>} />
      </Routes>
      <footer>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
      </footer>
    </BrowserRouter>
    </div>
  );
}

export default App;
