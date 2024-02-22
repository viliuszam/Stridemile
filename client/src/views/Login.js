import { useOutletContext, Link } from "react-router-dom";
import { useState } from 'react'
import { AlertTypes } from "../styles/modules/AlertStyles";
import axios from 'axios';

export default () => {
  const { setAlert } = useOutletContext(); // from Auth layout

  // User data inputs
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const validate = () => {
    if(!username || !password) {
      setAlert({ text: 'There are empty fields', type: AlertTypes.warning })
      return false
    }

    return true
  }

  const login = () => {
    if(!validate()) return

    axios.post('http://localhost:3333/auth/signin', {
      username: username,
      password: password,
    })
      .then(function (response) {
        const { access_token } = response.data
        localStorage.setItem('accessToken', access_token)
        setAlert({ text: 'Successful login', type: AlertTypes.success })
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status === 403) {
            if(error.response.data.message == "Incorrect credentials"){
              setAlert({ text: 'Incorrect credentials', type: AlertTypes.error });
            }
        } else {
            setAlert({ text: `An error has occurred (${error.message})`, type: AlertTypes.error });
        }
    }); 
  }

  return (
    <div>
      <h1 className="text-2xl text-center font-medium">Log in</h1>
      <hr className="my-6" />

      <div className="mb-3">
        <div className="text-base mb-2">Username</div>
        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" className="w-full p-3 border-[1px] border-gray-400 rounded-lg" />
      </div>

      <div className="mb-3">
        <div className="text-base mb-2">Password</div>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-3 border-[1px] border-gray-400 rounded-lg" />
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
  );
};
