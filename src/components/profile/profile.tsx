import React, {useContext, useEffect} from 'react';
import { AppContext } from '../../App';
import './profile.scss'

const Profile = () => {
  const { user } = useContext(AppContext);
  if (!user) {
    return <p>Please edit your profile!</p>
  }
  return (
    <div id="profileContainer">
      <p>Name: {user.firstName} {user.lastName}</p>
      <p>E-mail: {user.email}</p>
      <p>Phone number: {user.phone}</p>
      <p>BirthDay: {user.birthDay}</p>
      <p>About: {user.about}</p>
      <img alt="avatar" src={user.avatar} />
    </div>
  );
}

export default Profile;