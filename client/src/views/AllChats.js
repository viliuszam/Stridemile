import { useOutletContext, useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import { AlertTypes } from "../styles/modules/AlertStyles";
import axios from 'axios';
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../classes/Auth";
import ProfileIcon from "../components/ProfileIcon";
import config from "../config";

export default () => {
  const {setAlert } = useOutletContext();
  const [allChats, setAllChats] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  
  useEffect(() => {

    fetchCurrentUser();

    if (currentUser) {
      fetchAllChats();
    }

    const interval = setInterval(() => {
      fetchAllChats();
    }, 10000);

    return () => clearInterval(interval);
  }, [setAlert]);

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
  
  const fetchAllChats = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setAlert({ text: 'Please log in to fetch chats', type: AlertTypes.error });
      return;
    }
  
    axios.get(`${config.API_URL}/chats/all-chats`, {
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
        console.log('Chats with user data:', chatsWithUserData);

      setAllChats(chatsWithUserData);
    })
    .catch(error => {
      console.error('Error fetching chats:', error);
      setAlert({ text: 'Error fetching chats', type: AlertTypes.error });
    });
  };

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
   
    <div className="container sm:flex pt-12">
      <div className="w-3/6 sm:mx-8 mx-auto">
        <h1 className="text-2xl text-center font-medium text-[#61E9B1]">All chats</h1>
        <hr className="my-6 mb-9" />

        {allChats.filter(chat => chat).sort((a, b) => getTimeDifference(b.createdAt) - getTimeDifference(a.createdAt)).map((chat, index) => (
          <Link key={index} to={`/chats/${chat.senderId !== currentUser ? chat.senderId : chat.receiverId}`}>
            <div className="mb-3 flex hover:bg-[#61E9B1] border border-solid border-[#61E9B1] rounded-lg">
              <div className="m-3">
                <ProfileIcon imageUrl={chat.senderData.profile_picture} username={chat.senderData.username} userId={chat.senderData.id} iconSize={100}/>
              </div>
              <div className="m-3">
                <div className="text-xl mb-2 font-semibold">{chat.senderData.username}</div>
                <div>{chat.message}</div>
                <div className="text-gray-700 mt-3">{getTimeDifference(chat.createdAt)}</div>
              </div>
            </div>
          </Link>
        ))}
        
        <hr className="my-9 mt-9" />

        <Link to="/create-message">
          <button className="w-full mb-3 p-3 bg-[#61E9B1] border-[1px] border-[#61E9B1] rounded-lg hover:bg-[#4edba1]">
            <i className="fa-solid fa-message"></i> Create a new message
          </button>
        </Link>
      </div>
      <div className="w-3/6 sm:mx-8 mx-auto">
        <h2 className="pb-3 pt-6 font-semibold text-xl">Who can create message others?</h2>
        <p>Any person can message other users of the system.
        </p>
      </div>
    </div>
    </div>
  ) : (
    <Navigate to='/login' />
  );
};