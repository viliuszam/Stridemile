import '../styles/Home.css';

// Images
import intro from '../images/intro.png'
import platformView from '../images/platformView.png'
import smartphone from '../images/smartphone.png'
import browser from '../images/browser.png'
import stepCount from '../images/stepCount.png'
import healthTracking from '../images/healthTracking.png'
import groupActivities from '../images/groupActivities.png'

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import React from 'react';
import { isLoggedIn } from '../classes/Auth';
import Questions from "../components/Questions";

export default () => {
  return (
    <div className='mt-14'>

      <div className='flex' style={{ background: 'linear-gradient(235deg, rgba(188,238,187,1) 0%, rgba(255,255,255,1) 100%)' }}>
        <div className='container'>
          <div className='flex my-36'>
            <div className='my-auto'>
              <p className='text-7xl font-semibold'>Find your own way in sport </p>
              <p className='my-10 text-2xl'>Community for productive sport activities is available now</p>
              <Link to={isLoggedIn() ? '/' : '/register'} className="mb-3 p-3 px-12 bg-[#61E9B1] border-[1px] border-[#61E9B1] rounded-lg hover:bg-[#4edba1] text-lg">
                Get started <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
            <div className='min-w-[400px] pl-24'>
              <img id="introImg" className='my-auto' src={intro} />
            </div>
          </div>
        </div>
      </div>

      <div className='container flex py-20'>
        <div className='w-1/2'>
        <img className='' src={platformView} />
        </div>
        <div className='w-1/2 my-auto pl-12'>
          <p className='mb-5 text-5xl font-semibold'>About <span className='text-[#61E9B1]'>StrideMile</span></p>
          <p className='text-lg'>It's the platform that aims to unite people and motivate them to engage in physical activity. Our community
           and motivation of members are growing rapidly. People here not only improve their health but also find valuable friends.</p>
        </div>
      </div>

      <div className='container pb-20'>
        <p className='mb-16 text-5xl text-center font-semibold'>What you can <span className='text-[#61E9B1]'>do</span> with <span className='text-[#61E9B1]'>StrideMile</span>?</p>
        <div className="grid grid-cols-3 gap-4">

          <div className='text-center p-8'>
            <img className='mb-5 mx-auto h-64 object-contain' src={stepCount} />
            <p className='mb-5 text-[#61E9B1] text-3xl'>Step counting</p>
            <p className='text-lg'>Users can track their steps in order to complete achievements. After completing achievements users get some prizes related to profile customization.</p>
          </div>

          <div>
            <div className="w-full">
              <div className="p-8 h-full w-full bg-white rounded-xl mt-3 text-center bg-gray-50 border border-solid border-green-400">
                <img className='mb-5 mx-auto h-64 object-contain' src={groupActivities} />
                <p className='mb-5 text-[#61E9B1] text-3xl'>Group activities</p>
                <p className='text-lg'>Users can join groups and create them themselves. While being in groups, people are able to achieve goals and challenges together, participate in events. Most importantly, gain motivation from each other.</p>
              </div>
            </div>
          </div>

          <div className='text-center p-8'>
            <img className='mb-5 mx-auto h-64 object-contain' src={healthTracking} />
            <p className='mb-5 text-[#61E9B1] text-3xl'>Health tracking</p>
            <p className='text-lg'>People are able to track their health: weight, sleep, calories, macroelements, water. Then they are able to see their records sorted by date.</p>
          </div>

        </div>
      </div>

      <div className='bg-green-50 mb-20 py-20'>
        <div className='container'>
          <p className='mb-16 text-5xl text-center font-semibold'>Seamless tracking</p>
          <div className="flex">

            <div className='text-center p-16 pb-0'>
              <img className='mb-5 h-56 mx-auto' src={smartphone} />
              <p className='mb-5 text-[#61E9B1] text-3xl'>Smartphone</p>
              <p className='text-lg'>There is a mobile app that counts steps. It is easy and convenient to use.</p>
            </div>

            <div className='text-center p-16 pb-0'>
              <img className='mb-5 h-56 mx-auto object-contain' src={browser} />
              <p className='mb-5 text-[#61E9B1] text-3xl'>Website</p>
              <p className='text-lg'>Main functionality is in the website. Here users can see their steps, achievements, challenges and groups. They can also track their health and see how it improved.</p>
            </div>

          </div>
        </div>
      </div>
      <div className="container md:flex mx-auto pt-8">
        <div className='container pb-20 mx-auto'>
          <p className='mb-16 text-5xl text-center font-semibold'>FAQ</p>
          <Questions />
        </div>
      </div>

      <div className='container pb-20'>
        <p className='mb-16 text-5xl text-center font-semibold'>Join now and take the path of wellness</p>
        <div className='flex'>
        <Link to={isLoggedIn() ? '/' : '/register'} className="mb-3 mx-auto p-3 px-12 bg-[#61E9B1] border-[1px] border-[#61E9B1] rounded-lg hover:bg-[#4edba1] text-lg">
          Get started <i className="fa-solid fa-arrow-right"></i>
        </Link>
        </div>
      </div>

    </div>
  );
};
