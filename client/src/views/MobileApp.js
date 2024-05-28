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
          <div className='container mx-auto'>
            <p className='mb-4 text-2xl text-center font-semibold'>Mobile app</p>
            <p className="pb-4 text-center">Our app provides you with functions that are useful for your health and bodies. 
            Firstly, there is a possibility to count steps, calculate distance and time. There is also a possibility to reach 
            frequently asked questions page in order to find out more about system.</p>
            <p className="pb-8 text-center">Mobile application is fully synchronized with the web system. You can (and have to) 
            use the same account for web and mobile application in order to use all available functions.</p>
          </div>
        </div>
        <div className="flex">
            <img src={require("../images/mobileapp.jpg")} alt="app" className="h-96 mx-auto"/>
            <img src={require("../images/mobileapp1.jpg")} alt="app" className="h-96 mx-auto"/>
            <img src={require("../images/mobileapp2.jpg")} alt="app" className="h-96 mx-auto"/>
        </div>
      </div>
    </div>
  );
};