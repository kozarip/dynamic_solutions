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
      <input
        name="firstName"
        type="text"
        placeholder='First Name'
        value={firstName}
        required
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        name="lastName"
        type="text"
        placeholder='Last Name'
        value={lastName}
        required
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        name="email"
        type="email"
        placeholder='E-mail'
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        name="phone"
        type="tel"
        placeholder='Phone number'
        value={phone}
        required
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        name="birthday"
        type="date"
        placeholder='Birthday'
        value={birthday}
        required
        onChange={(e) => setBirthday(e.target.value)}
      />
      <textarea
        rows={5}
        placeholder='About'
        value={about}
        required
        onChange={(e) => setAbout(e.target.value)}
      />
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