import { useState, React } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

const Login = () => {
    const emptyUser = { username: '', password: '' };
    const [user, setUser] = useState({ emptyUser });
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

    const handleLogin = async (event) => {
        event.preventDefault();

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        };

        fetch('http://localhost:4000/user/login', options)
            .then((res) => {
                if (!res.ok) throw Error('incorrect password/username ');
                return res.json();
            })
            .then((res) => {
                localStorage.setItem('jwt', res.token);
                localStorage.setItem('isLoggedIn', true);
                console.log('logged in', res);
                navigate('/home');

            })
            .catch((err) => alert(err.message));
    };
    console.log("user checked:", user)

    return (
        <div className='login-page'>

            <header className='my-diary-div'><i className="fa-light fa-face-awesome"></i>
                <h1 className='diary-font'>MY DIARY...</h1>
            </header>
            <form className='login-form' onSubmit={handleLogin}>
                <p>Login here:</p>
                <input
                    type='text'
                    placeholder='Username'
                    onChange={handleChange}
                    name='username'
                    value={user.username}
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
                <button className='submit'>Login</button>


                <Link to='/register'>Sign up</Link>
            </form>
        </div>
    );
};

export default Login;