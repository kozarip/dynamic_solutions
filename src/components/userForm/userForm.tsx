import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUploading, { ImageListType }  from 'react-images-uploading';
import { AppContext } from '../../App';
import './userForm.scss'
import { storeUserInBackend } from '../../utils/api';

const UserForm = () => {
  const { user, setUser } = useContext(AppContext)
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState(new Date().toString());
  const [about, setAbout] = useState("");
  const [avatar, setAvatar] = useState<ImageListType>([]);
  const [imageErrorMessage, setImageErrorMessage] = useState("")

  const acceptedImageExtensions = ['jpg', 'png']

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setEmail(user.email)
      setPhone(user.phone)
      setBirthday(user.birthday)
      setAbout(user.about)
      setAvatar(user.avatar)
    }
  }, [])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const modifiedUser = {
      firstName,
      lastName,
      email,
      phone,
      birthday,
      about,
      avatar,
    }
    storeUserInBackend(modifiedUser)
    setUser(modifiedUser)
    navigate("/");
  }

  const handleImageError = (error: any) => {
    if (error.maxFileSize) {
      alert("Your uploaded file must be lower than 3MB!")
    } else if (error.acceptType) {
      alert("Unaccepted file type!")
    }
  }

  return (
    <form id='userForm' onSubmit={handleSubmit}>
      <h3>Your profile</h3>
      <div className='inputRow'>
        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          placeholder='John'
          value={firstName}
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className='inputRow'>
        <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          placeholder='Doe'
          value={lastName}
          required
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className='inputRow'>
        <label htmlFor="email">E-mail:</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder='test@example.com'
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div><div className='inputRow'>
        <label htmlFor="phone">Telephone number:</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder='+36301234567'
          value={phone}
          required
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className='inputRow'>
        <label htmlFor="birthday">Birthday:</label>
        <input
          id="birthday"
          name="birthday"
          type="date"
          placeholder='Birthday'
          value={birthday}
          required
          onChange={(e) => setBirthday(e.target.value)}
        />
      </div>
      <div className='inputRow'>
        <label htmlFor="about">About:</label>
        <textarea
          id="about"
          rows={5}
          placeholder='Write something about yourself!'
          value={about}
          required
          onChange={(e) => setAbout(e.target.value)}
        />
      </div>
      <ImageUploading
        value={avatar}
        onChange={(imageList: ImageListType) => setAvatar(imageList as never[])}
        maxNumber={1}
        dataURLKey="data_url"
        acceptType={acceptedImageExtensions}
        maxFileSize={3145728}
        onError={(e) => handleImageError(e)}
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
        }) => (
          // write your building UI
          <div className="avatarBox">
            {imageList.length === 0 && (
              <button
                onClick={(e: any) => {
                  e.preventDefault();
                  onImageUpload()
                }}
              >
                Upload your Avatar
              </button>
            )}
            {imageList.map((image, index) => (
              <div key={index} className="imageBox">
                <img className='avatar'
                  src={image['data_url']}
                  alt="avatar"
                />
                <div className="avatarImage">
                  <button
                    onClick={(e) => {
                    e.preventDefault();
                    onImageUpdate(index)
                    }}>Update
                  </button>
                </div>
              </div>
            ))}
          <pre>Max file size: 3MB, Accepted extensions: jpg, png</pre>
          </div>
        )}
      </ImageUploading>
      <input
        className='submit'
        type="submit"
        value="Submit"
      />
    </form>
  );
}

export default UserForm;