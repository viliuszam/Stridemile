import { useOutletContext, useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import { AlertTypes } from "../styles/modules/AlertStyles";
import axios from 'axios';
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { grey, red } from "@mui/material/colors";
import { pickersLayoutClasses } from '@mui/x-date-pickers/PickersLayout';

export default () => {

  return (
    <div className="w-full">
      <div className="container pt-12">
        <div className="container md:flex mx-auto">
          <div className='container pb-10 mx-auto'>
            <p className='mb-4 text-2xl text-center font-semibold'>Reviews</p>
            <p className="pb-8 text-center">You are all welcome to write a review about this product! Below are a couple of reviews written by our users.</p>
            <div className="flex">
            <div className="w-full grid grid-cols-2 gap-4 pl-5 pr-5">
              <div className="border border-[#61E9B1] border-solid rounded-xl flex p-4 bg-gray-50">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b3/Heilman_round.png" alt="photo" height="120" width="120" className=""/>
                <div>
                  <p className="pl-4 pb-2 font-semibold">Dan</p>
                  <p className="pl-4">Very helpful system for health tracking. Helped me a lot!</p>
                  <div className="pl-4 pt-2">
                    <i class="fa-sharp fa-solid fa-star text-[#61E9B1]"></i>
                    <i class="fa-sharp fa-solid fa-star text-[#61E9B1]"></i>
                    <i class="fa-sharp fa-solid fa-star text-[#61E9B1]"></i>
                    <i class="fa-sharp fa-solid fa-star text-[#61E9B1]"></i>
                    <i class="fa-sharp fa-solid fa-star text-[#61E9B1]"></i>
                  </div>
                </div>
              </div>
              <div className="border border-[#61E9B1] border-solid rounded-xl flex p-4 bg-gray-50">
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Walker_Circle.png" alt="photo" height="120" width="120" className=""/>
                <div>
                  <p className="pl-4 pb-2 font-semibold">Jack</p>
                  <p className="pl-4">I was motivated to engage in group activities, therefore, became healthier.</p>
                  <div className="pl-4 pt-2">
                    <i class="fa-sharp fa-solid fa-star text-[#61E9B1]"></i>
                    <i class="fa-sharp fa-solid fa-star text-[#61E9B1]"></i>
                    <i class="fa-sharp fa-solid fa-star text-[#61E9B1]"></i>
                    <i class="fa-sharp fa-solid fa-star text-[#61E9B1]"></i>
                    <i class="fa-sharp fa-solid fa-star text-[#61E9B1]"></i>
                  </div>
                </div>
              </div>
              <div className="border border-[#61E9B1] border-solid rounded-xl flex p-4 bg-gray-50">
                <img src="https://tricky-photoshop.com/wp-content/uploads/2017/08/final-1.png" alt="photo" height="120" width="120" className=""/>
                <div>
                  <p className="pl-4 pb-2 font-semibold">Rick</p>
                  <p className="pl-4">Awesome product, however, too litle events for yoga. Still awesome though!</p>
                  <div className="pl-4 pt-2">
                    <i class="fa-sharp fa-solid fa-star text-[#61E9B1]"></i>
                    <i class="fa-sharp fa-solid fa-star text-[#61E9B1]"></i>
                    <i class="fa-sharp fa-solid fa-star text-[#61E9B1]"></i>
                    <i class="fa-sharp fa-solid fa-star text-[#61E9B1]"></i>
                    <i class="fa-sharp fa-regular fa-star text-[#61E9B1]"></i>
                  </div>
                </div>
              </div>
              <div className="border border-[#61E9B1] border-solid rounded-xl flex p-4 bg-gray-50">
                <img src="https://images.squarespace-cdn.com/content/v1/4fe55728c4aaae9b463022c3/1554626747506-WMQ5O5D9P2JWSFKA2U2T/thuy+website+photo+circle.png" alt="photo" height="120" width="120" className=""/>
                <div>
                  <p className="pl-4 pb-2 font-semibold">Jessica</p>
                  <p className="pl-4">Joining groups really helps to improve physical activity levels. Recommend.</p>
                  <div className="pl-4 pt-2">
                    <i class="fa-sharp fa-solid fa-star text-[#61E9B1]"></i>
                    <i class="fa-sharp fa-solid fa-star text-[#61E9B1]"></i>
                    <i class="fa-sharp fa-solid fa-star text-[#61E9B1]"></i>
                    <i class="fa-sharp fa-solid fa-star text-[#61E9B1]"></i>
                    <i class="fa-sharp fa-solid fa-star text-[#61E9B1]"></i>
                  </div>
                </div>
              </div>
              <div className="border border-[#61E9B1] border-solid rounded-xl flex p-4 bg-gray-50">
                <img src="https://cornwallstreet.co.uk/wp-content/uploads/2022/11/Megan-Fletcher-Smith-Main-Photo.png" alt="photo" height="120" width="120" className=""/>
                <div>
                  <p className="pl-4 pb-2 font-semibold">Meghan</p>
                  <p className="pl-4">Started living healthier and happier life after using this system.</p>
                  <div className="pl-4 pt-2">
                    <i class="fa-sharp fa-solid fa-star text-[#61E9B1]"></i>
                    <i class="fa-sharp fa-solid fa-star text-[#61E9B1]"></i>
                    <i class="fa-sharp fa-solid fa-star text-[#61E9B1]"></i>
                    <i class="fa-sharp fa-solid fa-star text-[#61E9B1]"></i>
                    <i class="fa-sharp fa-solid fa-star text-[#61E9B1]"></i>
                  </div>
                </div>
              </div>
              <div className="border border-[#61E9B1] border-solid rounded-xl flex p-4 bg-gray-50">
                <img src="https://www.pikpng.com/pngl/b/541-5413318_matt-round-png-round-portrait-pic-png-clipart.png" alt="photo" height="120" width="120" className=""/>
                <div>
                  <p className="pl-4 pb-2 font-semibold">Gabriel</p>
                  <p className="pl-4">Unbelievable community... One huge thanks!</p>
                  <div className="pl-4 pt-2">
                    <i class="fa-sharp fa-solid fa-star text-[#61E9B1]"></i>
                    <i class="fa-sharp fa-solid fa-star text-[#61E9B1]"></i>
                    <i class="fa-sharp fa-solid fa-star text-[#61E9B1]"></i>
                    <i class="fa-sharp fa-solid fa-star text-[#61E9B1]"></i>
                    <i class="fa-sharp fa-solid fa-star text-[#61E9B1]"></i>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <p className='mb-4 text-xl text-center font-semibold mt-12'>Write your review</p>
            <p className="pb-6 text-center">We are waiting for more reviews. Click the button below and contact us!</p>
            <div className="flex"><Link to="/contact-us" className="bg-[#61E9B1] border-[1px] border-[#61E9B1] hover:bg-[#4edba1] rounded-lg text-black py-3 px-6 text-sm border border-solid border-[#61E9B1] mx-auto flex">
              Contact us
              <i class="fa-solid fa-envelope pl-2 pt-1"></i>
            </Link></div>
            <div>
                
        
          
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};