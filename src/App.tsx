import React from 'react';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import Profile from './components/profile/profile';
import UserForm from './components/userForm/userForm';
import Error404 from './components/errors/404';
import { User } from './utils/types';
import './styles/App.scss';

const initUser: User = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDay: "",
  about: "",
  avatar: "",
}
export const AppContext = React.createContext<User>(initUser);

function App() {
  const activeClassName = "active";
  const logo = require("./assets/images/logo.png");

  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <img src={logo} alt="dewises"/>
          <nav>
            <NavLink to="" className={({ isActive }) => isActive ? activeClassName : ""}>Profile</NavLink>
            <NavLink to="edit" className={({ isActive }) => isActive ? activeClassName : ""}>Edit</NavLink>
          </nav>
        </header>
        <AppContext.Provider value={initUser}>
          <main className='contentContainer'>
            <Routes>
              <Route path="/" element={<Profile/>} />
              <Route path="edit" element={<UserForm/>} />
              <Route path="*" element={<Error404/>} />
            </Routes>
          </main>
        </AppContext.Provider>
      <footer>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
      </footer>
    </BrowserRouter>
    </div>
  );
}

export default App;
