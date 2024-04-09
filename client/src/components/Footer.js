import React from 'react';
import { useOutletContext, Link, Navigate } from "react-router-dom";

const Footer = () => {
  return (
    <div className='bg-[#61E9B1] border-b border-b-solid border-b-gray-100 drop-shadow py-1 z-10'>
  <div className="container md:flex mx-auto pt-8">
    <div className='mx-auto md:max-w-80 px-3 pt-5 text-center'>
      <p>Our mission is uniting people to achieve their goals together by doing physical activities. We expect our users to 
        join groups, complete personal achievements, mutual challenges and goals, but, most importantly, 
        motivate each other to become better every day.
      </p>
    </div>
    <div className='mx-auto'>
      <div className='flex pt-5'>
        <h2 className='font-semibold mx-auto flex'>Information</h2>
      </div>
      <div className='pt-2 flex'>
        <Link to="/aboutus" className="text-black hover:text-white hover:text-decoration hover:underline mx-auto flex">
          About us
        </Link>
      </div>
      <div className='pt-1 flex'>
        <Link to="/reviews" className="text-black hover:text-white hover:text-decoration hover:underline mx-auto flex">
          Reviews
        </Link>
      </div>
      <div className='pt-1 flex'>
        <Link to="/mobile-app" className="text-black hover:text-white hover:text-decoration hover:underline mx-auto flex">
          Mobile app
        </Link>
      </div>
    </div>
    <div className='mx-auto'>
      <div className='flex pt-5'>
        <h2 className='font-semibold mx-auto flex'>Follow us</h2>
      </div>
      <div className='pt-2 text-black hover:text-white flex'>
        <Link to="http://facebook.com" className="hover:text-decoration hover:underline flex mx-auto">
          <div>
            <i className="fa-brands fa-facebook"></i>
          </div>
          <div className='pl-1'>
            <p> Facebook</p>
          </div>
        </Link>
      </div>
      <div className='pt-1 text-black hover:text-white flex'>
        <Link to="http://instagram.com" className="hover:text-decoration hover:underline flex mx-auto">
          <div>
            <i className="fa-brands fa-instagram"></i>
          </div>
          <div className='pl-1'>
            <p> Instagram</p>
          </div>
        </Link>
      </div>
    </div>
    <div className='mx-auto pr-8'>
      <div className='flex pt-5'>
        <h2 className='font-semibold mx-auto flex'>Support</h2>
      </div>
      <div className='pt-2 flex'>
        <Link to="/faq" className="text-black hover:text-white hover:text-decoration hover:underline mx-auto flex">
          FAQ
        </Link>
      </div>
      <div className='pt-1 flex'>
        <Link to="/contact-us" className="text-black hover:text-white hover:text-decoration hover:underline mx-auto flex">
          Contact us
        </Link>
      </div>
    </div>
  </div>
  <div className='h-0.5 md:bg-black my-4 md:my-10 mx-72'></div>
  <div className='pb-9 flex text-center'>
  <p className='flex mx-auto text-center'>© 2024. All rights reserved</p>
  </div>
  </div>

  );
};

export default Footer;
