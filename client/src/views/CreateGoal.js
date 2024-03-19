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
import { pickersLayoutClasses } from '@mui/x-date-pickers/PickersLayout';

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

  const [goalTitle, setGoalTitle] = useState('');
  const [goalDescription, setGoalDescription] = useState('');
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [statusOptions, setStatusOptions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [startDate, setStartDate] = React.useState(dayjs());
  const [endDate, setEndDate] = React.useState(dayjs());

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

  useEffect(() => {
    // Fetch visibility options from the server
    axios.get('http://localhost:3333/status-options')
      .then(response => {
        setCategoryOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching status options:', error);
      });
  }, []);

  const validate = () => {
    if (!goalTitle || !goalDescription || !selectedCategory || !selectedStatus || !targetValue) {
      setAlert({ text: 'There are empty fields', type: AlertTypes.warning });
      return false;
    }
    else if (startDate > endDate) {
      setAlert({ text: 'Start date is later than the end date', type: AlertTypes.error });
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
    formData.append('title', goalTitle);
    formData.append('description', goalDescription);
    formData.append('target-value', targetValue);
    formData.append('mentorId', -1);
    formData.append('categoryId', selectedCategory);
    formData.append('statusId', selectedStatus);
    for (let entry of formData.entries()) {
      console.log(entry);
    }
    axios.post('http://localhost:3333/goals/createGoal', formData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(function (response) {
      console.log(response);
      setAlert({ text: 'Goal created successfully', type: AlertTypes.success });
    })
    .catch(function (error) {
      console.error(error);
      setAlert({ text: 'Error creating goal', type: AlertTypes.error });
    });
  }

  return (
    <div className="w-full">
   
    <div className="container sm:flex pt-12">
      <div className="w-3/6 sm:mx-8 mx-auto">
        <h1 className="text-2xl text-center font-medium">Create a goal</h1>
        <hr className="my-6" />

        <div className="mb-3">
          <div className="text-base mb-2">Goal title</div>
          <input value={goalTitle} onChange={(e) => setGoalTitle(e.target.value)} type="text" placeholder="Goal title" className="w-full p-3 border-[1px] border-gray-400 rounded-lg hover:border-[#61E9B1]" />
        </div>

        <div className="mb-3">
          <div className="text-base mb-2">Description</div>
          <input value={goalDescription} onChange={(e) => setGoalDescription(e.target.value)} type="text" placeholder="Description" className="w-full p-3 border-[1px] border-gray-400 rounded-lg hover:border-[#61E9B1]" />
        </div>

        <div className="mb-3">
          <div className="text-base mb-2">Target value</div>
          <input value={targetValue} onChange={(e) => setTargetValue(e.target.value)} type="number" placeholder="Target value" className="w-full p-3 border-[1px] border-gray-400 rounded-lg hover:border-[#61E9B1]" />
        </div>

        <div className="mb-3">
          <div className="text-base mb-2">Status</div>
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="w-full p-3 border-[1px] border-gray-400 rounded-lg bg-white hover:border-[#61E9B1]">
            <option value="">Select status</option>
            {statusOptions.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
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
          <div className="text-base">Start date</div>
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
                  <DatePicker 
                    value={startDate} onChange={(newStartDate) => setStartDate(newStartDate)}
                    sx={{
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

        <div className="mb-3">
          <div className="text-base">End date</div>
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
                  <DatePicker 
                    value={endDate} onChange={(newEndDate) => setEndDate(newEndDate)}
                    sx={{
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
          <i class="fa-solid fa-bullseye"></i> Create a goal
        </button>
      </div>
      <div className="w-3/6 sm:mx-8 mx-auto">
        <h2 className="pb-3 pt-1 font-semibold text-xl">What are goals?</h2>
        <p>Goals are group's common tasks that require to be achieved by group members together.
        </p>
        <h2 className="pb-3 pt-6 font-semibold text-xl">Who can create goals?</h2>
        <p>Only the mentor of a group.
        </p>
        <h2 className="pb-3 pt-6 font-semibold text-xl">What are the start date and end date?</h2>
        <p>Start date is the date when activities can be started doing in order to achieve results. 
          End date is the date after which the goal can no longer be completed if it was not already.
        </p>
        <h2 className="pb-3 pt-6 font-semibold text-xl">What is the target value?</h2>
        <p>Target value is the required amount of something (for example, steps) that need to be done in order to complete the goal.
        </p>
      </div>
    </div>
    </div>
  );
};