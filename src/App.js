import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const { login, loggedIn } = useSelector(state => state.login);
  const token = localStorage.getItem('token');

  return (
    <div className='App container'>
      <Routes>
        {loggedIn ? (
          <>
            <Route path='/' element={<Main />} />
          </>
        ) : (
          <Route path='/login' element={<Login />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
