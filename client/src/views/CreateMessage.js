import { useState, useEffect } from 'react';
import axios from 'axios';
import { AlertTypes } from "../styles/modules/AlertStyles";


const CreateMessage = ({ currentUser, setAlert, history }) => {
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
      const response = await axios.get('http://localhost:3333/users/all-users', {
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

  return (
    <div>
      <h1>Select a recipient:</h1>
      <ul>
        {allUsers.map(user => (
          <li key={user.id} onClick={() => handleRecipientSelection(user.id)}>
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateMessage;
