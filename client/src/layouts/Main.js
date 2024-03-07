import { Outlet, Link } from "react-router-dom";
import { useState } from 'react'
import { AlertTypes } from "../styles/modules/AlertStyles";
import Alert from "../components/Alert";
import NavBar from "../components/NavBar";

export default () => {
  const [alert, setAlert] = useState({
    text: '',
    type: AlertTypes.info,
  })

  return (
    <div>
      <NavBar />
      <div className='pt-14'>
        <Alert text={alert.text} type={alert.type} />
        <Outlet context={{ setAlert }} />
      </div>
    </div>
  );
}