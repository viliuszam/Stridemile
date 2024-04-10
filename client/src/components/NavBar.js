import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { isLoggedIn, logout } from '../classes/Auth';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../classes/User';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import logo from '../images/logo.png'

const NavBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='bg-white border-b border-b-solid border-b-gray-100 drop-shadow fixed top-0 w-full py-1 z-10'>
      <div className="md:flex bg-white container justify-center items-center">
        <div className='text-black pt-4 pb-4 pl-2 text-sm my-auto flex' >
          <Link to="/">
            <img src={logo} className='h-6' alt="Logo" />
          </Link>
        </div>
        {(() => {
          if (isLoggedIn()) {
            return (
              <Link to="/dashboard" className="ml-24 my-auto flex pl-2 text-medium hover:text-[#61E9B1]">
                <div className='flex hover:border-b hover:border-b-solid hover:border-b-[#61E9B1]'>
                  <div className='pl-2 pr-2'>
                    Home
                  </div>
                </div>
              </Link>
            )
          }
          else {
            return (
              <Link to="/" className="ml-24 my-auto flex pl-2 text-medium hover:text-[#61E9B1]">
                <div className='flex hover:border-b hover:border-b-solid hover:border-b-[#61E9B1]'>
                  <div className='pl-2 pr-2'>
                    Home
                  </div>
                </div>
              </Link>
            )
          }

        })()}
        <Link to="/groups" className="my-auto flex pl-2 text-medium hover:text-[#61E9B1]">
          <div className='flex ml-2 hover:border-b hover:border-b-solid hover:border-b-[#61E9B1]'>
            <div className='pl-2 pr-2'>
              Groups
            </div>
          </div>
        </Link>
        <Link to="/health-tracking" className="my-auto flex pl-2 text-medium hover:text-[#61E9B1]">
          <div className='flex ml-2 hover:border-b hover:border-b-solid hover:border-b-[#61E9B1]'>
            <div className='pl-2 pr-2'>Health</div>
          </div>
        </Link>
        <Link to="/achievements" className="my-auto flex pl-2 text-medium hover:text-[#61E9B1]">
          <div className='flex ml-2 hover:border-b hover:border-b-solid hover:border-b-[#61E9B1]'>
            <div className='pl-2 pr-2'>
              Achievements
            </div>
          </div>
        </Link>
        <Link to="/aboutus" className="pl-2 pr-4 text-medium my-auto flex hover:text-[#61E9B1]">
          <div className='flex ml-2 hover:border-b hover:border-b-solid hover:border-b-[#61E9B1]'>
            <div className='pl-2 pr-2'>
              About us
            </div>
          </div>
        </Link>
        <div className='ml-auto my-auto'>
          {(() => {
            if (!isLoggedIn()) {
              return (
                <div>
                  <Link to="/login" className="bg-[#61E9B1] border-[1px] border-[#61E9B1] hover:bg-[#4edba1] rounded-lg text-black p-3 md:m-2 text-sm md:ml-24 border border-solid border-[#61E9B1]">
                    Log in
                  </Link>
                  <Link to="/register" className="bg-[#61E9B1] border-[1px] border-[#61E9B1] hover:bg-[#4edba1] rounded-lg text-black p-3 m-2 text-sm border border-solid border-[#61E9B1]">
                    Register
                  </Link>
                </div>
              )
            }
            else
              return (
                <div>
                  {/* 
                  <Link to="/myprofile" className="rounded-full text-white p-1 m-1 text-sm ml-20 my-auto flex">
                    <img src="https://www.freeiconspng.com/thumbs/face-png/obama-face-png-3.png" alt="man" height={25} width={25} />
                  </Link>
                  */}
                  <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <p style={{ color: getUser().colourHex }}>{getUser().username}</p>
                    <Tooltip title="Account settings">
                      <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                      >
                        {getUser().profile_picture ?
                          <img src={getUser().profile_picture} className='h-10 w-10 object-cover rounded-full' />
                          :
                          <Avatar />
                        }
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    disableScrollLock={true}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        '&::before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem onClick={handleClose}>
                      <Link to={`/profile/${getUser().username}`} className='flex items-center'>
                        <ListItemIcon>
                          <Avatar src={getUser().profile_picture} />
                        </ListItemIcon>
                        Profile
                      </Link>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                      <Link to="/settings">
                        <ListItemIcon>
                          <i className="fa-solid fa-gears"></i>
                        </ListItemIcon>
                        Settings
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={() => { logout(); navigate('/') }}>
                      <ListItemIcon>
                        <i className="fa-solid fa-right-from-bracket"></i>
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              )
          })()}

        </div>
      </div>
    </div>
  );
};

export default NavBar;
