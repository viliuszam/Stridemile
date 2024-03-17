import { useOutletContext } from "react-router-dom";
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

export default () => {
  const { setAlert } = useOutletContext();

  const newTheme = (theme) => createTheme({
    ...theme,
    components: {
      MuiDateCalendar: {
        styleOverrides: {
          root: {
            color: '#61E9B1',
            borderRadius: 2,
            borderWidth: 1,
            borderColor: '#61E9B1',
            border: '1px solid',
          }
        }
      }
    }
  })

  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [eventLocation, setEventLocation] = useState('');

  useEffect(() => {
    // Fetch visibility options from the server
    axios.get('http://localhost:3333/category-options')
      .then(response => {
        setCategoryOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching category options:', error);
      });
  }, []);

  const validate = () => {
    if (!eventTitle || !eventDescription || !selectedCategory || !eventLocation) {
      setAlert({ text: 'There are empty fields', type: AlertTypes.warning });
      return false;
    }
    return true;
  }

  const createEvent = () => {
    if (!validate()) return;

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    }
    const formData = new FormData();
    formData.append('title', eventTitle);
    formData.append('description', eventDescription);
    formData.append('location', eventLocation);
    formData.append('mentorId', -1);
    formData.append('categoryId', selectedCategory);
    for (let entry of formData.entries()) {
      console.log(entry);
    }
    axios.post('http://localhost:3333/events/createEvent', formData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(function (response) {
      console.log(response);
      setAlert({ text: 'Event created successfully', type: AlertTypes.success });
    })
    .catch(function (error) {
      console.error(error);
      setAlert({ text: 'Error creating event', type: AlertTypes.error });
    });
  }

  return (
    <div className="w-full">
   
    <div className="container sm:flex pt-12">
      <div className="w-3/6 sm:mx-8 mx-auto">
        <h1 className="text-2xl text-center font-medium">Create an event</h1>
        <hr className="my-6" />

        <div className="mb-3">
          <div className="text-base mb-2">Event title</div>
          <input value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} type="text" placeholder="Event title" className="w-full p-3 border-[1px] border-gray-400 rounded-lg hover:border-[#61E9B1]" />
        </div>

        <div className="mb-3">
          <div className="text-base mb-2">Description</div>
          <input value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} type="text" placeholder="Description" className="w-full p-3 border-[1px] border-gray-400 rounded-lg hover:border-[#61E9B1]" />
        </div>

        <div className="mb-3">
          <div className="text-base mb-2">Location</div>
          <input value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} type="text" placeholder="Location" className="w-full p-3 border-[1px] border-gray-400 rounded-lg hover:border-[#61E9B1]" />
        </div>

        <div className="mb-3">
          <div className="text-base mb-2">Category</div>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full p-3 border-[1px] border-gray-400 rounded-lg bg-white hover:border-[#61E9B1]">
            <option value="">Select category</option>
            {categoryOptions.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <div className="text-base">Date</div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
              <DemoContainer
                components={[
                  'DatePicker',
                  'MobileDatePicker',
                  'DesktopDatePicker',
                  'StaticDatePicker',
                ]}
              >
                <ThemeProvider theme={newTheme}>
                  <DatePicker sx={{
                    width: "100%",
                    "& .MuiInputLabel-root.Mui-focused": { color: "#979797" }, //styles the label
                    "& .MuiOutlinedInput-root": {
                    "& > fieldset": { borderColor: "#9ca3af" },
                    "&:hover > fieldset": { borderColor: "#61E9B1" },
                    borderRadius: "8px",
                    fontsize: "16px",
                    borderColor: "#fff",
                    borderWidth: 1,
                    border: '1px',
                    },
                  }}/>
                </ThemeProvider>
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>

        <hr className="my-9 mt-9" />

        <button onClick={createEvent} className="w-full mb-3 p-3 bg-[#61E9B1] border-[1px] border-[#61E9B1] rounded-lg hover:bg-[#4edba1]">
          <i class="fa-solid fa-person-running"></i> Create an event
        </button>
      </div>
      <div className="w-3/6 sm:mx-8 mx-auto">
        <h2 className="pb-3 pt-1 font-semibold text-xl">What are events?</h2>
        <p>Events are common activities for a group that are happening on a particular time and location.
        </p>
        <h2 className="pb-3 pt-6 font-semibold text-xl">Who can participate in events?</h2>
        <p>Every member of the group has a possibility to take part in the event. However, only mentor can create an event.
        </p>
        <h2 className="pb-3 pt-6 font-semibold text-xl">What can be the category of the event?</h2>
        <p>Every event can belong to only one category. There are 7 types of categories. 
        </p>
        <div className="pl-2 pt-1">
        <p>• Fitness workout - events related to physical exercises.</p>
        <p>• Nutrition workshop - events related to healthy eating.</p>
        <p>• Wellness retreat - events related to improving wellness without professional assist.</p>
        <p>• Health seminar - events including lectures about health.</p>
        <p>• Medical screening - events related to health checkup with a person of a medical field.</p>
        <p>• Medical talk - events including consultations with a person with a medical field.</p>
        <p>• Rehabilitation program - events including detailed plan how to get healthy with an assist.</p>
        </div>
      </div>
    </div>
    </div>
  );
};