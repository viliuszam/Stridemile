import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext, useParams, useLocation } from "react-router-dom";
import { AlertTypes } from "../styles/modules/AlertStyles";

const GroupInvitation = () => {
  const { setAlert } = useOutletContext();
  const { token } = useParams();
  const location = useLocation();
  const pathArray = location.pathname.split('/');
  const groupId = pathArray[pathArray.length - 1];
  
  const [groupName, setGroupName] = useState('');
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/groups/${token}`);
        const { data } = response.data;
        const { group, user } = data;
        setGroupName(group.name);
        setUserName(user.username);
      } catch (error) {
        console.error('Error fetching group and user details:', error);
        setError('Error fetching group and user details');
      }
    };
    
    fetchData();
  }, [token]);

  const handleJoinClick = async () => {
    try {
      const response = await axios.post('http://localhost:3333/groups/joinGroup', { token });
    
      const { statusCode, message } = response.data;
  
      if (statusCode === 200) {
        setMessage(message);
        setAlert({ text: message, type: AlertTypes.success });
      } else {
        setAlert({ text: message, type: AlertTypes.error });
      }
    } catch (error) {
      setAlert({ text: 'Error joining the group', type: AlertTypes.error });
    }
  };

  return (
    <div className='overflow-hidden'>
      <img className='h-28 w-28 mx-auto rounded-full' src="https://wearecardinals.com/wp-content/uploads/2020/04/u1Re9qgMfM8d6kumlW85PS6s55jQh5fbdmppgQsP.jpeg" />

      <div className='my-6 text-center'>
        <p className='text-xl mb-4'>Hi, {userName} 👋</p>
        <p className=''>You have been invited to join group <span className='font-bold'>{groupName}</span></p>
        <p>What do you think?</p>
      </div>

      <hr className="my-6" />

      <button onClick={handleJoinClick} className="w-full mb-3 p-3 bg-[#61E9B1] border-[1px] border-[#61E9B1] rounded-lg hover:bg-[#4edba1]">
        <i className="fa-solid fa-check"></i> Join the group
      </button>
    </div>
  );
};

export default GroupInvitation;
