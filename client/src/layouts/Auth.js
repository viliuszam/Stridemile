import { Outlet, Link } from "react-router-dom";
import { useState } from 'react'
import { AlertTypes } from "../styles/modules/AlertStyles";
import Alert from "../components/Alert";

export default () => {
  const [alert, setAlert] = useState({
    text: '',
    type: AlertTypes.info,
  })

  return (
    <div className="flex min-h-dvh p-5" style={{
      background: "url(https://giffiles.alphacoders.com/220/220213.gif)",
      backgroundSize: "cover",
    }}>

      <div className="m-auto sm:w-[26rem]">

        <Alert text={alert.text} type={alert.type} />

        <div className="mx-auto p-10 bg-white rounded] rounded-lg">
            <Outlet context={{ setAlert }} />
            <Link to="/" className="block text-center mt-3 text-blue-500 hover:text-blue-700">Back to home</Link>
        </div>
      </div>

    </div>
  );
}