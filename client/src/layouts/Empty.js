import { Outlet, Link } from "react-router-dom";
import { useState } from 'react'
import { AlertTypes } from "../styles/modules/AlertStyles";
import Alert from "../components/Alert";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default () => {
  const [alert, setAlert] = useState({
    text: '',
    type: AlertTypes.info,
  })

  return (
    <div>
      <NavBar />
        <Alert text={alert.text} type={alert.type} setAlert={setAlert} />
        <Outlet context={{ setAlert }} />
      <Footer/>
    </div>
  );
}