import React, { useState } from 'react';
import './userForm.scss'

const UserForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState(new Date().toString());
  const [about, setAbout] = useState("");
  const [avatar, setAvatar] = useState({});

  const handleSubmit = () => {
    
  }

  return (
    <form id='userForm' onSubmit={handleSubmit}>

      <input
        name="firstName"
        type="text"
        placeholder='First Name'
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        name="lastName"
        type="text"
        placeholder='Last Name'
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        name="email"
        type="email"
        placeholder='E-mail'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        name="phone"
        type="tel"
        placeholder='Phone number'
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        name="birthday"
        type="date"
        placeholder='Birthday'
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
      />
      <textarea
        rows={5}
        placeholder='About'
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      />{/* 
      <img
        alt="avatar"
        src={URL.createObjectURL(avatar)}
      />
      <input
        type="file"
        id="img"
        name="img"
        accept="image/*"
        onChange={(e) => setAvatar(e.target.files)}
      /> */}
    </form>
  );
}

export default UserForm;