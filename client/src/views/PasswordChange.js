import { useOutletContext, Link, useParams } from "react-router-dom";
import { useState } from 'react'
import { AlertTypes } from "../styles/modules/AlertStyles";
import axios from 'axios';
import config from "../config";

export default () => {
  const { setAlert } = useOutletContext(); // from Auth layout

  const {token}=useParams();
  // User data inputs
  const [newPassword, setNewPassword] = useState('')
  const [rePassword, setRePassword] = useState('')

  const validate = () => {
    if(!newPassword || !rePassword) {
      setAlert({ text: 'There are empty fields', type: AlertTypes.warning })
      return false
    }

    if(newPassword.length < 5) {
      setAlert({ text: 'Password must be at least 5 characters', type: AlertTypes.warning })
      return false
    }

    if(newPassword != rePassword) {
      setAlert({ text: 'Passwords do not match', type: AlertTypes.warning })
      return false
    }

    return true
  }

  const passwordRecovery = () => {
    if(!validate()) return

    axios.post(`${config.API_URL}/auth/passReset`, {
      newPassword: newPassword,
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(function (response) {
        setAlert({ text: 'Password is changed successfully', type: AlertTypes.success })
      })
      .catch(function (error) {
        console.log(error)
        if(error.response.data.message == "Password could not be updated"){
          setAlert({ text: 'Password could not be updated', type: AlertTypes.error });
        }else if(error.response && error.response.status === 401){
          setAlert({ text: 'Link has expired', type: AlertTypes.error });
        }else{
          setAlert({ text: `An error has occurred (${error.message})`, type: AlertTypes.error })
        }
      });
  }

  return (
    <div>
      <h1 className="text-2xl text-center font-medium">Password recovery</h1>
      <hr className="my-6" />

      <div className="mb-3">
        <div className="text-base mb-2">New password</div>
        <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-3 border-[1px] border-gray-400 rounded-lg" />
      </div>

      <div className="mb-3">
        <div className="text-base mb-2">Repeat password</div>
        <input value={rePassword} onChange={(e) => setRePassword(e.target.value)} type="password" placeholder="Password" className="w-full p-3 border-[1px] border-gray-400 rounded-lg" />
      </div>

      <hr className="my-6" />

      <button onClick={passwordRecovery} className="w-full mb-3 p-3 bg-[#61E9B1] border-[1px] border-[#61E9B1] rounded-lg hover:bg-[#4edba1]">
        <i className="fa-solid fa-key"></i> Change a password
      </button>

      <Link to="/login" className="block w-full mb-3 p-3 bg-white text-center border-[1px] border-gray-400 rounded-lg hover:bg-gray-100">
      <i className="fa-solid fa-user-plus"></i> Log in
      </Link>
    </div>
  );
};
