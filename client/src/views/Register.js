import { useOutletContext } from "react-router-dom";
import { useState } from 'react'
import { AlertTypes } from "../styles/modules/AlertStyles";

export default () => {
  const { setAlert } = useOutletContext(); // from Auth layout

  // User data inputs
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')

  const validate = () => {
    if(!email || !password || !rePassword) {
      setAlert({ text: 'Yra tuščių laukų', type: AlertTypes.warning })
      return false
    }
  }

  const login = () => {
    if(!validate()) return

    setAlert({ text: 'Sėkminga registracija', type: AlertTypes.success })
  }

  return (
    <div>
      <h1 className="text-2xl text-center font-medium">Registracija</h1>
      <hr className="my-6" />

      <div className="mb-3">
        <div className="text-base mb-2">Vardas</div>
        <input type="text" placeholder="Vardas" className="w-full p-3 border-[1px] border-gray-400 rounded-lg" />
      </div>

      <div className="mb-3">
        <div className="text-base mb-2">Jūsų el. paštas</div>
        <input value={email} type="text" placeholder="El. paštas" className="w-full p-3 border-[1px] border-gray-400 rounded-lg" />
      </div>

      <div className="mb-3">
        <div className="text-base mb-2">Slaptažodis</div>
        <input value={password} type="password" placeholder="Slaptažodis" className="w-full p-3 border-[1px] border-gray-400 rounded-lg" />
      </div>

      <div className="mb-3">
        <div className="text-base mb-2">Pakartokite slaptažodį</div>
        <input value={rePassword} type="password" placeholder="Slaptažodis" className="w-full p-3 border-[1px] border-gray-400 rounded-lg" />
      </div>

      <hr className="my-6" />

      <button onClick={login} className="w-full mb-3 p-3 bg-[#61E9B1] border-[1px] border-[#61E9B1] rounded-lg hover:bg-[#4edba1]">
        <i className="fa-solid fa-key"></i> Prisijungti
      </button>

      <button className="w-full mb-3 p-3 bg-white border-[1px] border-gray-400 rounded-lg hover:bg-gray-100">
      <i className="fa-solid fa-user-plus"></i> Sukurti paskyrą
      </button>

      <button className="w-full p-3 bg-white border-[1px] border-gray-400 rounded-lg hover:bg-gray-100">
      <i className="fa-solid fa-user-injured"></i> Slaptažodžio priminimas
      </button>
    </div>
  );
};
