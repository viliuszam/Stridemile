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
            <p className='mb-4 text-2xl text-center font-semibold'>About us</p>
            <p className="pb-4 text-center">Get to know us!</p>
            <p className="pb-12 text-center">A team of StrideMile consists of six people: Deividas Grinius, Gvidas Garadauskas,
             Vilius Zamuiskas, Rimantas Mockus, Austėja Laurikaitytė and Martynas Lukoševičius. We are all KTU IT faculty
              students and we are happy to create this product in order to assist people to achieve their goals and help to 
              make their life quality ten thousand times better!</p>
          </div>
        </div>
      </div>
    </div>
  );
};