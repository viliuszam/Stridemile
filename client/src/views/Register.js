import { useOutletContext, Link } from "react-router-dom";
import { useState } from 'react'
import { AlertTypes } from "../styles/modules/AlertStyles";
import axios from 'axios';

export default () => {
  const { setAlert } = useOutletContext(); // from Auth layout

  // User data inputs
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')

  const validate = () => {
    if(!name || !email || !password || !rePassword) {
      setAlert({ text: 'There are empty fields', type: AlertTypes.warning })
      return false
    }

    if(!email.match(/^\S+@\S+\.\S+$/)) {
      setAlert({ text: 'Invalid email address is provided', type: AlertTypes.warning })
      return false
    }

    if(password.length < 5) {
      setAlert({ text: 'Password must be atleast 5 characters', type: AlertTypes.warning })
      return false
    }

    if(password != rePassword) {
      setAlert({ text: 'Password do not match', type: AlertTypes.warning })
      return false
    }

    return true
  }

  const submit = () => {
    if(!validate()) return

    axios.post('localhos/api/register', {
      name: name,
      email: email,
      password: password,
      reRapssword: rePassword
    })
      .then(function (response) {
        setAlert({ text: 'Successful registration', type: AlertTypes.success })
      })
      .catch(function (error) {
        console.log(error)
        setAlert({ text: `An error has occurred (${error.message})`, type: AlertTypes.error })
      }); 
  }

  return (
    <div>
      <h1 className="text-2xl text-center font-medium">Registration</h1>
      <hr className="my-6" />

      <div className="mb-3">
        <div className="text-base mb-2">Name</div>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" className="w-full p-3 border-[1px] border-gray-400 rounded-lg" />
      </div>

      <div className="mb-3">
        <div className="text-base mb-2">Your email address</div>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email address" className="w-full p-3 border-[1px] border-gray-400 rounded-lg" />
      </div>

      <div className="mb-3">
        <div className="text-base mb-2">Password</div>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-3 border-[1px] border-gray-400 rounded-lg" />
      </div>

      <div className="mb-3">
        <div className="text-base mb-2">Reapeat password</div>
        <input value={rePassword} onChange={(e) => setRePassword(e.target.value)} type="password" placeholder="Password" className="w-full p-3 border-[1px] border-gray-400 rounded-lg" />
      </div>

      <hr className="my-6" />

      <button onClick={submit} className="w-full mb-3 p-3 bg-[#61E9B1] border-[1px] border-[#61E9B1] rounded-lg hover:bg-[#4edba1]">
        <i className="fa-solid fa-key"></i> Create an account
      </button>

      <Link to="/login" className="block w-full mb-3 p-3 bg-white text-center border-[1px] border-gray-400 rounded-lg hover:bg-gray-100">
        <i className="fa-solid fa-user-plus"></i> Login
      </Link>

      <button className="w-full p-3 bg-white border-[1px] border-gray-400 rounded-lg hover:bg-gray-100">
      <i className="fa-solid fa-user-injured"></i> Remind password
      </button>
    </div>
  );
};
