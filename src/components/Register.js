import { useState, React } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
  const emptyUser = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm_password: '',
    username: ''
  };
  const [user, setUser] = useState(emptyUser);
  const [errMessage, setErrMessage] = useState('');
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  const url = 'http://localhost:5000';

  const handleRegister = async (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    };
    fetch(`${url}/user/register`, options)
      .then((res) => res.json())
      .then((res) => {
        if (!res.ok && res.error) {
          if (res.error === '"confirm_password" must be [ref:password]') {
            console.log('Confirm the password please');
            setErrMessage('Confirm the password please');
            setPopup(true);
          } else {
            setErrMessage(res.error);
            setPopup(true);
          }
        } else {
          navigate('/login');
        }
      })
      .catch((e) => {
        console.log('error', e);
      });
  };

  return (
    <div className='registration-page'>
      
      <form className='signup-form' onSubmit={handleRegister}>
        <input
          type='text'
          placeholder='Username'
          onChange={handleChange}
          name='username'
          value={user.username}
          autoComplete='off'
        />
        <input
          type='email'
          placeholder='Email'
          onChange={handleChange}
          name='email'
          value={user.email}
          autoComplete='off'
        />
        <input
          type='text'
          placeholder='First name'
          onChange={handleChange}
          name='firstname'
          value={user.firstname}
          autoComplete='off'
        />
        <input
          type='text'
          placeholder='Last name'
          onChange={handleChange}
          name='lastname'
          value={user.lastname}
          autoComplete='off'
        />
        <input
          type='password'
          placeholder='Password'
          onChange={handleChange}
          name='password'
          value={user.password}
          autoComplete='off'
        />
        <input
          type='password'
          placeholder='Confirm password'
          onChange={handleChange}
          name='confirm_password'
          value={user.confirm_password}
          autoComplete='off'
        />
        <button className='submit'>Sign up</button>
      </form>
    </div>
  );
};

export default Register;
