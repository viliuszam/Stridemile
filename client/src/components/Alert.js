import { useEffect } from "react"
import { useLocation } from "react-router-dom";
import { AlertTypes } from "../styles/modules/AlertStyles";

export default ({text, type, setAlert}) => {
    const location = useLocation();
  
    useEffect(() => {
        setAlert({ text: '', type: AlertTypes.info });
    }, [location])

    return (
        <div>
            {text && type ? 
                <div className={`block p-4 mb-4 rounded-lg text-base dark:bg-gray-800 ${type ? type : ''}`}>
                    <div>{text}</div>
                </div> 
            : null}
        </div>
    )
}