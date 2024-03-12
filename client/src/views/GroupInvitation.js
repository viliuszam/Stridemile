import '../styles/Home.css';
import React, { useState } from 'react';
import { useParams, useLocation, Link } from "react-router-dom";
import axios from 'axios';

const getMapsUrl = (loc) => {
  return `https://www.google.com/maps/place/${loc}/`
};

const GroupInvitation = () => {
  const location = useLocation();
  const pathArray = location.pathname.split('/');
  const groupId = pathArray[pathArray.length - 1];

  const [email, setEmail] = useState('');

  return (
    <div className='overflow-hidden'>
      <img className='h-28 w-28 mx-auto rounded-full' src="https://wearecardinals.com/wp-content/uploads/2020/04/u1Re9qgMfM8d6kumlW85PS6s55jQh5fbdmppgQsP.jpeg" />

      <div className='my-6 text-center'>
        <p className='text-xl mb-4'>Hi, [name] 👋</p>
        <p className=''>You have been invited to join group <span className='font-bold'>Furious group</span></p>
        <p>What do you think?</p>
      </div>

      <hr className="my-6" />

      <button onClick={{}} className="w-full mb-3 p-3 bg-[#61E9B1] border-[1px] border-[#61E9B1] rounded-lg hover:bg-[#4edba1]">
        <i class="fa-solid fa-check"></i> Join the group
      </button>
    </div>
  );
};

export default GroupInvitation;
