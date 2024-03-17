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
      <div className='container pt-14'>
        <Alert text={alert.text} type={alert.type} />
        <Outlet context={{ setAlert }} />
      </div>
      <div className="pt-12">
      <Footer/>
      </div>
    </div>
  );
}