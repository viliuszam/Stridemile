import { useOutletContext, Link } from "react-router-dom";
import { useState, useRef } from 'react'
import { AlertTypes } from "../styles/modules/AlertStyles";
import axios from 'axios';
import { isLoggedIn, login as authLogin } from "../classes/Auth";
import { Navigate, useNavigate } from "react-router-dom";
import config from "../config";

export default () => {
  const { setAlert } = useOutletContext(); // from Auth layout
  const navigate = useNavigate();

  // User data inputs
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const passwordInputRef = useRef(null);

  const validate = () => {
    if(!username || !password) {
      setAlert({ text: 'There are empty fields', type: AlertTypes.warning })
      return false
    }

    return true
  }

  const login = async () => {
    if(!validate()) return

    axios.post(`${config.API_URL}/auth/signin`, {
      username: username,
      password: password,
    })
      .then(function (response) {
        const { access_token } = response.data
        setAlert({ text: 'Successful login', type: AlertTypes.success })
        setTimeout(async ()=> { 
          await authLogin(access_token) 
          navigate('/dashboard')
        }, 2000)
      })
      .catch(function (error) {
        if (error.response.status === 403) {
            if(error.response.data.message == "Incorrect credentials"){
              setAlert({ text: 'Incorrect credentials', type: AlertTypes.error });
            }
        } else {
            setAlert({ text: `An error has occurred (${error.message})`, type: AlertTypes.error });
        }
    }); 
  }

  const handleUsernameKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      passwordInputRef.current.focus();
    }
  };

  const handlePasswordKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      login();
    }
  };


  return !isLoggedIn() ? (
    <div>
      <h1 className="text-2xl text-center font-medium">Log in</h1>
      <hr className="my-6" />

      <div className="mb-3">
        <div className="text-base mb-2">Username</div>
        <input value={username} onChange={(e) => setUsername(e.target.value)} onKeyPress={handleUsernameKeyPress} type="text" placeholder="Username" className="w-full p-3 border-[1px] border-gray-400 rounded-lg" />
      </div>

      <div className="mb-3">
        <div className="text-base mb-2">Password</div>
        <input ref={passwordInputRef} value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={handlePasswordKeyPress} type="password" placeholder="Password" className="w-full p-3 border-[1px] border-gray-400 rounded-lg" />
      </div>

      <hr className="my-6" />

      <button onClick={login} className="w-full mb-3 p-3 bg-[#61E9B1] border-[1px] border-[#61E9B1] rounded-lg hover:bg-[#4edba1]">
        <i className="fa-solid fa-key"></i> Log in
      </button>

      <Link to="/register" className="block w-full mb-3 p-3 bg-white text-center border-[1px] border-gray-400 rounded-lg hover:bg-gray-100">
      <i className="fa-solid fa-user-plus"></i> Create a new account
      </Link>

      <Link to="/password-recovery" className="block w-full mb-3 p-3 bg-white text-center border-[1px] border-gray-400 rounded-lg hover:bg-gray-100">
      <i className="fa-solid fa-user-injured"></i> Recover a password
      </Link>
    </div>
  ) : (
    <Navigate to='/' />
  );
};
