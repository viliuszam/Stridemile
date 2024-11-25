import { useState, useEffect } from 'react';
import axios from 'axios';
import { AlertTypes } from "../styles/modules/AlertStyles";
import { isLoggedIn } from "../classes/Auth";
import { Navigate, useOutletContext } from "react-router-dom";
import config from '../config';

const CreateMessage = ({ currentUser, history }) => {
  const { setAlert } = useOutletContext();
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setAlert({ text: 'Please log in to fetch users', type: AlertTypes.error });
      return;
    }

    try {
      const response = await axios.get(`${config.API_URL}/users/all-users`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setAllUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setAlert({ text: 'Error fetching users', type: AlertTypes.error });
    }
  };

  const handleRecipientSelection = (recipientId) => {
    window.location.href = `/chats/${recipientId}`;
  };

  return isLoggedIn() ? (
    <div className='mt-10'>
      <h1 className="text-2xl text-center font-medium text-[#61E9B1]">Create a message</h1>
      <hr className="my-6" />
      <div className='mx-auto text-center'>
      <h1 className="text-lg text-center font-medium mb-4">Select a recipient:</h1>
      <ul>
        {allUsers.map(user => (
          <li key={user.id} onClick={() => handleRecipientSelection(user.id)} className='text-medium hover:text-[#61E9B1] pb-2'>
            {user.username}
          </li>
        ))}
      </ul>
      </div>
    </div>
  ) : (
    <Navigate to='/login' />
  );
};

export default CreateMessage;
