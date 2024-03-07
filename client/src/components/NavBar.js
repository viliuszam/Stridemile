import React from 'react';
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className='bg-white border-b border-b-solid border-b-gray-100 drop-shadow fixed w-full z-10'>
    <div className="flex bg-white container">
      <div className='text-black pt-4 pb-4 pl-2 text-sm my-auto flex' >
        <p>LOGO</p>
      </div>
      <Link to="/" className="ml-24 my-auto flex pl-2 text-medium hover:text-[#61E9B1]">
        <div className='flex hover:border-b hover:border-b-solid hover:border-b-[#61E9B1]'>
          <div className='pl-2 pr-2'>
            Home
          </div>
        </div> 
      </Link>
      <Link to="/groups" className="my-auto flex pl-2 text-medium hover:text-[#61E9B1]">
      <div className='flex ml-2 hover:border-b hover:border-b-solid hover:border-b-[#61E9B1]'>
          <div className='pl-2 pr-2'>
            Groups
          </div>
        </div> 
      </Link>
      <Link to="/events" className="my-auto flex pl-2 text-medium hover:text-[#61E9B1]">
      <div className='flex ml-2 hover:border-b hover:border-b-solid hover:border-b-[#61E9B1]'>
        <div className='pl-2 pr-2'>Events</div>
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
      <Link to="/login" className="bg-[#61E9B1] rounded-lg text-white p-3 m-2 text-sm ml-24 hover:bg-white hover:text-[#61E9B1] border border-solid border-[#61E9B1]">
      Log in
      </Link>
      <Link to="/register" className="bg-[#61E9B1] rounded-lg text-white p-3 m-2 text-sm hover:bg-white hover:text-[#61E9B1] border border-solid border-[#61E9B1]">
      Register
      </Link>
      <Link to="/myprofile" className="rounded-full text-white p-1 m-1 text-sm ml-20 my-auto flex">
      <img src="https://www.freeiconspng.com/thumbs/face-png/obama-face-png-3.png" alt="man" height={25} width={25} />
      </Link>
    </div>
    </div>
  );
};

export default NavBar;
