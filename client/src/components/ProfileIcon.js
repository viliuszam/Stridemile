import { Avatar, Popover } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



export default function ProfileIcon({ imageUrl, username, userId }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [popupData, setPopupData] = useState(null);

  const handlePopoverOpen = (event) => {
    getUserPopupData()
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const getUserPopupData = async () => {
    await axios.get(`http://localhost:3333/users/popup/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(({ data }) => {
        setPopupData(data)
      })
  }

  const getCommonGroups = () => {
    if (popupData.groupsInCommon.length === 0)
      return 'No common groups'

    return popupData.groupsInCommon.map((group) => `${group} `)
  }

  const getCompletedAchievements = () => {
    if (popupData.completedAchievements.length === 0)
      return 'No achievements'

    return popupData.completedAchievements.map((achievement) => `${achievement} `)
  }

  return (
    <>
      <Link to={`/profile/${username}`}>
        <Avatar
          src={imageUrl}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        />
      </Link>

      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        disableScrollLock={true}
      >
        <div className='m-3'>
          {popupData ?
            <>
              <p className='font-semibold'>{popupData.username}</p>
              <hr className='my-2' />
              <p><i className="fa-regular fa-calendar-days pr-1"></i> {popupData.accountAge}</p>
              <p><i className="fa-solid fa-user-group"></i> {getCommonGroups()}</p>
              <p><i className="fa-solid fa-trophy"></i> {getCompletedAchievements()}</p>
            </>
            : null
          }
        </div>
      </Popover>
    </>
  )
}