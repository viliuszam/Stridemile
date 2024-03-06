import React from 'react';
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex bg-white border border-solid border-black">
      <div className='text-black pt-4 pb-4 pl-2 text-sm' >
        <p>LOGO</p>
      </div>
      <Link to="/" className="ml-80 pt-4 pb-4 pl-2 text-sm">
      Home
      </Link>
      <Link to="/groups" className="pt-4 pb-4 pl-2 text-sm">
      Groups
      </Link>
      <Link to="/events" className="pt-4 pb-4 pl-2 text-sm">
      Events
      </Link>
      <Link to="/achievements" className="pt-4 pb-4 pl-2 text-sm">
      Achievements
      </Link>
      <Link to="/aboutus" className="pt-4 pb-4 pl-2 pr-4 text-sm">
      About us
      </Link>
      <Link to="/login" className="bg-[#61E9B1] rounded-3xl text-white p-3 m-1 text-sm ml-64">
      Log in
      </Link>
      <Link to="/register" className="bg-[#61E9B1] rounded-3xl text-white p-3 m-1 text-sm">
      Register
      </Link>
      <Link to="/register" className="rounded-full text-white p-1 m-1 text-sm ml-20">
      <img src="https://www.freeiconspng.com/thumbs/face-png/obama-face-png-3.png" alt="man" height={25} width={25} />
      </Link>
    </div>
  );
};

export default NavBar;
