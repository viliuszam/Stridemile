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
import { MuiColorInput } from 'mui-color-input'
import { getUser, updateUser } from '../classes/User';

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
          <Typography component={'div'}>{children}</Typography>
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

export default function Settings() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { setAlert } = useOutletContext();
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [name, setName] = useState('');
  const [hexColor, setHexColor] = useState(getUser().colourHex)
  const [unlockedHexColours, setUnlockedHexColours] = useState([]);

  const validatePassword = () => {
    if (!currentPassword || !password || !rePassword) {
      setAlert({ text: 'There are empty fields', type: AlertTypes.warning })
      return false;
    }
  
    if (password.length < 5) {
      setAlert({ text: 'Password must be at least 5 characters', type: AlertTypes.warning })
      return false;
    }
  
    if (password !== rePassword) {
      setAlert({ text: 'Passwords do not match', type: AlertTypes.warning })
      return false;
    }
  
    return true;
  }

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    axios.get('http://localhost:3333/rewards/unlockedColours', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
      .then(response => {
        setUnlockedHexColours(response.data);
      })
      .catch(error => {
        console.error('Error fetching unlocked colours: ', error);
      });
  }, []);

  const submitPassword = () => {
    if (!validatePassword()) return;
  
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    }
  
    axios.post('http://localhost:3333/auth/passChange', {
      oldPassword: currentPassword,
      newPassword: password,
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      setAlert({ text: 'Successful password change', type: AlertTypes.success });
    })
    .catch(function (error) {
      console.log(error);
      if (error.response && error.response.status === 403) {
        setAlert({ text: 'Password change failed. Please check your old password.', type: AlertTypes.error });
      } else {
        setAlert({ text: `An error has occurred (${error.message})`, type: AlertTypes.error });
      }
    });
  }

  const validateName = () => {
    if (!name) {
      setAlert({ text: 'The username field is empty', type: AlertTypes.warning })
      return false;
    }

    return true;
  }

  const submitCustomization = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    }

    axios.post('http://localhost:3333/rewards/applyCustomisation', { hexColour: hexColor }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        setAlert({ text: 'Successfuly applied customisation', type: AlertTypes.success })
        updateUser(response.data);
      })
      .catch(function (error) {
        console.error('Error updating customisation: ', error);
      });

  }


  const submitName = () => {
    if (!validateName()) return;
  
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    }
  
    const newName = name;
  
    axios.post('http://localhost:3333/users/change-username', { username: newName }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        console.log(response);
        setAlert({ text: 'Successful name change', type: AlertTypes.success })
      })
      .catch(function (error) {
        console.log(error);
        if (error.response && error.response.status === 400) {
          if (error.response.data.message === "Username is already taken") {
            setAlert({ text: 'Username is already taken', type: AlertTypes.error });
          }
        } else {
          setAlert({ text: `An error has occurred (${error.message})`, type: AlertTypes.error });
        }
      });
  }
  

  const profileEmojies = [
    '🏃',
    '🚴',
    '🏀',
    '⚽',
    '⚾',
    '🎳',
    '🎣',
    '🎾',
  ]

  return (
    <div>
      {isLoggedIn() && (
        <div className="container bg-white pt-12 pb-8 px-2">
          <Box sx={{ width: '100%' }}>
            <div className="text-[#61E9B1]">
              <h2 className="text-center text-2xl">Settings</h2>
            </div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value} onChange={handleChange}
                textColor="inherit"
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

                  <button onClick={submitPassword} className="w-full mb-3 p-3 bg-[#61E9B1] border-[1px] border-[#61E9B1] rounded-lg hover:bg-[#4edba1]">
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
                    <i className="fa-solid fa-signature"></i> Change a name
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
              <div className='flex'>
                <div className="w-3/6 sm:mr-8 mx-auto">
                  <h1 className="text-lg text-center font-medium pt-1">Profile customization</h1>
                  <hr className="my-4" />

                  <div className="mb-3">
                    <div className="text-base mb-2">Username color</div>
                      <select value={hexColor} onChange={(e) => setHexColor(e.target.value)} className="w-full p-3 border-[1px] border-gray-400 rounded-lg bg-white hover:border-[#61E9B1]">
                        <option value="#000000">Default</option>
                          {unlockedHexColours.map(option => (
                            <option key={option.hex} value={option.hex} style={{ backgroundColor: option.hex }}>{option.name}</option>
                          ))}
                      </select>
                  </div>

                  <div className="mb-3">
                    <div className="text-base mb-2">Emoji</div>
                    <select className='w-full p-3 border-[1px] border-gray-400 rounded-lg hover:border-[#61E9B1] bg-white'>
                      <option value="" selected>None</option>
                        {profileEmojies.map((emoji, i) => <option key={i} value={emoji}>{emoji}</option>)}
                    </select>
                  </div>

                  <hr className="my-6" />

                  <button onClick={submitCustomization} className="w-full mb-3 p-3 bg-[#61E9B1] border-[1px] border-[#61E9B1] rounded-lg hover:bg-[#4edba1]">
                    <i className="fa-solid fa-signature"></i> Customization profile
                  </button>
                </div>
                <div className="w-3/6 sm:ml-8 mx-auto">
                  <h2 className="pb-3 pt-1 font-semibold text-xl">What name you cannot choose?</h2>
                  <p>The one that is already taken.
                  </p>
                </div>
              </div>
            </CustomTabPanel>
          </Box>
        </div>
      )}
    </div>
  );
}