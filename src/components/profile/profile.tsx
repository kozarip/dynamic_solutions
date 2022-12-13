import React, {useContext, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../App';
import './profile.scss'

const Profile = () => {
  const { user } = useContext(AppContext);
  if (!user) {
    return <div className='fill'>
      <p>Please fill your profile!</p>
      <NavLink to="edit">Go to the settings</NavLink>
    </div>
  }
  return (
    <div id="profileContainer">
      <p>Name: {user.firstName} {user.lastName}</p>
      <p>E-mail: {user.email}</p>
      <p>Phone number: {user.phone}</p>
      <p>BirthDay: {user.birthday}</p>
      <p>About: {user.about}</p>
      {user.avatar.length > 0 && (
        <img
          alt="avatar"
          className='avatar'
          src={user.avatar[0].data_url}
        />
      )}
    </div>
  );
}

export default Profile;