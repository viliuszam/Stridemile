import { useOutletContext, useParams, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { AlertTypes } from "../styles/modules/AlertStyles";
import axios from 'axios';
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import ProfileIcon from '../components/ProfileIcon';
import { isLoggedIn } from "../classes/Auth";
import config from '../config';

export default () => {
  const { setAlert } = useOutletContext();
  const { id } = useParams();
  const [imageGroupFile, setImageGroupFile] = useState(null);
  const [imageBannerFile, setImageBannerFile] = useState(null);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    fetchCurrentUser();

  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchChats();
    }

    const interval = setInterval(() => {
      fetchChats();
    }, 10000);

    return () => clearInterval(interval);
  }, [setAlert, id]);

  const fetchCurrentUser = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    }
  
    try {
      const response = await axios.get(`${config.API_URL}/users/me`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setCurrentUser(response.data.id);
      console.log("Current user:", response.data);
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const fetchChats = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setAlert({ text: 'Please log in to fetch chats', type: AlertTypes.error });
      return;
    }
  
    axios.get(`${config.API_URL}/chats/${id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(async response => {
      const chatsData = response.data;
      const chatsWithUserData = await Promise.all(
        chatsData.map(async chat => {
          try {
            const userResponse = await axios.get(`${config.API_URL}/users/${chat.senderId}`, {
              headers: {
                'Authorization': `Bearer ${accessToken}`
              }
            });
            const senderData = userResponse.data;
            return { ...chat, senderData };
          } catch (error) {
            console.error('Error fetching sender data:', error);
            return chat;
          }
        })
      );
      setChats(chatsWithUserData);
    })
    .catch(error => {
      console.error('Error fetching chats:', error);
      setAlert({ text: 'Error fetching chats', type: AlertTypes.error });
    });
  };
  
  const sendMessage = () => {
    if (!message) {
      setAlert({ text: 'Message cannot be empty', type: AlertTypes.warning });
      return;
    }
  
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setAlert({ text: 'Please log in to send messages', type: AlertTypes.error });
      return;
    }
  
    axios.post(`${config.API_URL}/chats/${id}/sendMessage`, { message }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      console.log(response);
      setAlert({ text: 'Message sent successfully', type: AlertTypes.success });
      fetchChats();
      setMessage('');
    })
    .catch(function (error) {
      console.error(error);
      setAlert({ text: 'Error sending message', type: AlertTypes.error });
    });
  }

  const getTimeDifference = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    const now = new Date();
  
    const timeDifference = now - createdAtDate;
  
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesDifference = Math.floor((timeDifference / (1000 * 60)) % 60);
  
    if (hoursDifference >= 24) {
      const daysDifference = Math.floor(hoursDifference / 24);
      const remainingHours = hoursDifference % 24;
      return `${daysDifference} days ${remainingHours} hours ago`;
    } else if (hoursDifference > 0) {
      return `${hoursDifference} hours ${minutesDifference} minutes ago`;
    } else if (minutesDifference > 0) {
      return `${minutesDifference} minutes ago`;
    } else {
      return 'Just now';
    }
  }
  
  
  return isLoggedIn() ? (
    <div className="w-full">
   
    <div className="container  pt-12">
      <div className=" sm:mx-8 mx-auto">
        <h1 className="text-2xl text-center font-medium text-[#61E9B1]">Personal chat</h1>
        <hr className="my-6" />

        {chats.sort((a, b) => getTimeDifference(b.createdAt) - getTimeDifference(a.createdAt)).map((chat, index) => (
          <div key={index} className="mb-3 flex border border-solid border-[#61E9B1] rounded-lg">
            <div className="m-3">
              <ProfileIcon imageUrl={chat.senderData.profile_picture} username={chat.senderData.username} userId={chat.senderData.id} iconSize={100}/>
            </div>
            <div className="m-3">
              <div className="text-xl mb-2 font-semibold">{chat.senderId === currentUser ? "You" : chat.senderData.username}</div>
              <div>{chat.message}</div>
              <div className="text-gray-700 mt-3">{getTimeDifference(chat.createdAt)}</div>
            </div>
          </div>
        ))}

        <div className="mb-3">
            <div className="text-base mb-2">Message</div>
            <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Type text" className="w-full p-3 border-[1px] border-gray-400 rounded-lg hover:border-[#61E9B1]" />
        </div>

        <hr className="my-9 mt-12" />

        <button onClick={sendMessage} className="w-full mb-3 p-3 bg-[#61E9B1] border-[1px] border-[#61E9B1] rounded-lg hover:bg-[#4edba1]">
            <i className="fa-solid fa-people-group"></i> Send a message
        </button>
      </div>
      
    </div>
    </div>
  ) : (
    <Navigate to='/login' />
  );
};