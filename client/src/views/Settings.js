import { useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { isLoggedIn } from '../classes/Auth';
import Footer from '../components/Footer';
import { AlertTypes } from "../styles/modules/AlertStyles";

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { setAlert } = useOutletContext();
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [name, setName] = useState('');

  const validate = () => {
    if(!currentPassword || !password || !rePassword) {
      setAlert({ text: 'There are empty fields', type: AlertTypes.warning })
      return false;
    }

    if(password.length < 5) {
      setAlert({ text: 'Password must be at least 5 characters', type: AlertTypes.warning })
      return false;
    }

    if(password != rePassword) {
      setAlert({ text: 'Passwords do not match', type: AlertTypes.warning })
      return false;
    }

    return true;
  }

  const submit = () => {
    if(!validate()) return

    axios.post('http://localhost:3333/auth/', {
      password: password,
    })
      .then(function (response) {
        setAlert({ text: 'Successful password change', type: AlertTypes.success })
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status === 403) {
            if(error.response.data.message == "Username is already taken"){
              setAlert({ text: 'Username is already taken', type: AlertTypes.error });
            }
        } else {
            setAlert({ text: `An error has occurred (${error.message})`, type: AlertTypes.error });
        }
    });  
  }

  const validateName = () => {
    if(!name) {
      setAlert({ text: 'There are empty fields', type: AlertTypes.warning })
      return false;
    }

    return true;
  }

  const submitName = () => {
    if(!validateName()) return

    axios.post('http://localhost:3333/auth/', {
      name: name,
    })
      .then(function (response) {
        setAlert({ text: 'Successful name change', type: AlertTypes.success })
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status === 403) {
            if(error.response.data.message == "Username is already taken"){
              setAlert({ text: 'Username is already taken', type: AlertTypes.error });
            }
        } else {
            setAlert({ text: `An error has occurred (${error.message})`, type: AlertTypes.error });
        }
    });  
  }

  return (
    <div>
      {!isLoggedIn() && (
        <div className="container bg-white pt-12 pb-8 px-2">
          <Box sx={{ width: '100%' }}>
            <div className="text-[#61E9B1]">
              <h2 className="text-center text-2xl">Settings</h2>
            </div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value} onChange={handleChange}  
                textColor="#61E9B1"
              indicatorColor="#61E9B1"
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#61E9B1"
                  }
                }} 
              
                >
                <Tab label="Password" {...a11yProps(0)} />
                <Tab label="Name" {...a11yProps(1)} />
                <Tab label="Customization" {...a11yProps(2)} />
              </Tabs>
            </Box>

      <CustomTabPanel value={value} index={0}>
        <div className='flex'>
          <div className="w-3/6 sm:mr-8 mx-auto">
          <h1 className="text-lg text-center font-medium pt-1">Password change</h1>
              <hr className="my-4" />
              <div className="mb-3">
                <div className="text-base mb-2">Current password</div>
                <input value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} type="password" placeholder="Current password" className="w-full p-3 border-[1px] border-gray-400 rounded-lg hover:border-[#61E9B1]" />
              </div>

              <div className="mb-3">
                <div className="text-base mb-2">New password</div>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-3 border-[1px] border-gray-400 rounded-lg hover:border-[#61E9B1]" />
              </div>

              <div className="mb-3">
                <div className="text-base mb-2">Repeat password</div>
                <input value={rePassword} onChange={(e) => setRePassword(e.target.value)} type="password" placeholder="Password" className="w-full p-3 border-[1px] border-gray-400 rounded-lg hover:border-[#61E9B1]" />
              </div>
              
              <hr className="my-6" />

              <button onClick={submit} className="w-full mb-3 p-3 bg-[#61E9B1] border-[1px] border-[#61E9B1] rounded-lg hover:bg-[#4edba1]">
                <i className="fa-solid fa-key"></i> Change a password
              </button>
            </div>
            <div className="w-3/6 sm:ml-8 mx-auto">
              <h2 className="pb-3 pt-1 font-semibold text-xl">How often is it recommended to change the password?</h2>
              <p>Cybersecurity experts recommend changing your password every three months.
              </p>
              <h2 className="pb-3 pt-6 font-semibold text-xl">What length of a password is it recommended for a safe password?</h2>
              <p>It is recommended that a safe password consist of at least 16 characters. Among those symbols there should uppercase and 
                lowercase letters, numbers and other symbols.
              </p>
            </div>
          </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <div className='flex'>
          <div className="w-3/6 sm:mr-8 mx-auto">
          <h1 className="text-lg text-center font-medium pt-1">Name change</h1>
              <hr className="my-4" />
              <div className="mb-3">
                <div className="text-base mb-2">New name</div>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" className="w-full p-3 border-[1px] border-gray-400 rounded-lg" />
              </div>
              
              <hr className="my-6" />

              <button onClick={submitName} className="w-full mb-3 p-3 bg-[#61E9B1] border-[1px] border-[#61E9B1] rounded-lg hover:bg-[#4edba1]">
              <i class="fa-solid fa-signature"></i> Change a name
              </button>
            </div>
            <div className="w-3/6 sm:ml-8 mx-auto">
              <h2 className="pb-3 pt-1 font-semibold text-xl">What name you cannot choose?</h2>
              <p>The one that is already taken.
              </p>
            </div>
          </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Customization
      </CustomTabPanel>
    </Box>
    </div>
      )}
    </div>
  );
}