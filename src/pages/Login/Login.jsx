import { useState } from 'react';
import './Login.scss';
import { GiAngryEyes } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { loginPost } from '../../redux/Login/extraReducer';
import { useNavigate } from 'react-router-dom';
import Main from '../Main/Main';

const Login = () => {
  const [passwordYey, setPasswordYey] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const { login, success, loggedIn, loading } = useSelector(
    state => state.login,
  );
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const sendData = e => {
    e.preventDefault();
    const payload = { id: v4(), ...loginData };
    dispatch(loginPost(payload));
    {
      token ? navigate(<Main />) : navigate(<Login />);
    }
  };

  return (
    <div className='login'>
      <form className='login__form' onSubmit={sendData}>
        <h2>Login page</h2>
        <label htmlFor='email' className='login__form__top'>
          <input
            type='email'
            id='email'
            onChange={e =>
              setLoginData(prev => ({ ...prev, email: e.target.value }))
            }
          />
        </label>
        <label htmlFor='password' className='login__form__bottom'>
          <input
            type={passwordYey ? 'text' : 'password'}
            id='password'
            onChange={e =>
              setLoginData(prev => ({ ...prev, password: e.target.value }))
            }
          />
          <span>
            <GiAngryEyes
              onClick={() => setPasswordYey(!passwordYey)}
              style={{ cursor: 'pointer' }}
              size={40}
            />
          </span>
        </label>
        <button>Send</button>
      </form>
    </div>
  );
};

export default Login;
