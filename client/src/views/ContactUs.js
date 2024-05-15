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
            <p className='mb-4 text-2xl text-center font-semibold'>Contact us</p>
            <p className="pb-12 text-center">We are ready to respond as soon as we can!</p>
            <div>
                <div className="md:flex">
                <div className="ml-auto mr-auto pl-2 pr-2">
                    <i className="fa-solid fa-circle-info"></i>
                    <div className="mx-auto flex pt-3 pb-4">
                    <h2 className="text-xl">Support</h2>
                    </div>
                    <p className="pb-4">Ask your questions and we will respond to them as soon as we can!</p>
                    <p className="text-[#61E9B1] hover:underline"><a href="">snoozy053@gmail.com</a></p>
                </div>
                <div className="ml-auto mr-auto pl-2 pr-2">
                    <i className="fa-solid fa-envelope"></i>
                    <div className="mx-auto flex md:pt-3 pt-4 pb-4">
                    <h2 className="text-xl">Collaborate</h2>
                    </div>
                    <p className="pb-4">For collaboration purposes contact us here:</p>
                    <p className="text-[#61E9B1] hover:underline"><a href="">collaboratestridemile@gmail.com</a></p>
                </div>
                
                
            </div>
        
          <div className="md:flex border border-solid border-[#61E9B1] rounded-xl bg-gray-50 mr-12 ml-12 mt-12">
            <div className="ml-auto mr-auto pl-2 pr-2 ">
              <p className=' text-2xl text-center font-semibold mt-4'>Our office</p>
                <div className="mx-auto flex md:pt-3 ">
                <h2 className="text-xl">Kaunas, Lithuania</h2>
                </div>
                <p className="pb-6 text-center text-[#61E9B1] hover:text-[#4edba1] hover:underline pt-2"><a href="https://www.google.com/maps/place/Student%C5%B3+g.+50,+Kaunas,+51368+Kauno+m.+sav./@54.9038691,23.9552271,17z/data=!3m1!4b1!4m6!3m5!1s0x46e7187d29c6ba9f:0x52d17f6fb6cbbe3f!8m2!3d54.903866!4d23.957802!16s%2Fg%2F11c27903c4?entry=ttu">Studentų g. 50, 51368</a></p>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};