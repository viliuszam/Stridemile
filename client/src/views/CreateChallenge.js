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
  const { groupId } = useParams();
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

  const [challengeTitle, setChallengeTitle] = useState('');
  const [challengeDescription, setChallengeDescription] = useState('');
  const [startDate, setStartDate] = React.useState(dayjs());
  const [endDate, setEndDate] = React.useState(dayjs());

  const validate = () => {
    if (!challengeTitle || !challengeDescription ) {
      setAlert({ text: 'There are empty fields', type: AlertTypes.warning });
      return false;
    }
    else if (startDate > endDate) {
      setAlert({ text: 'Start date is later than the end date', type: AlertTypes.error });
      return false;
    }
    return true;
  }

  const createChallenge = () => {
    if (!validate()) return;

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    }
    /*
    const formData = new FormData();
    formData.append('title', challengeTitle);
    formData.append('description', challengeDescription);
    formData.append('mentorId', -1);
    for (let entry of formData.entries()) {
      console.log(entry);
    }
    */
    const requestData = {
      title: challengeTitle,
      description: challengeDescription,
      start_date: startDate,
      end_date: endDate
    };

    axios.post(`http://localhost:3333/groups/${groupId}/createChallenge`, requestData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      console.log(response);
      setAlert({ text: 'Challenge created successfully', type: AlertTypes.success });
    })
    .catch(function (error) {
      console.error(error);
      setAlert({ text: 'Error creating challenge', type: AlertTypes.error });
    });
  }

  return (
    <div className="w-full">
   
    <div className="container sm:flex pt-12">
      <div className="w-3/6 sm:mx-8 mx-auto">
        <h1 className="text-2xl text-center font-medium">Create a challenge</h1>
        <hr className="my-6" />

        <div className="mb-3">
          <div className="text-base mb-2">Challenge title</div>
          <input value={challengeTitle} onChange={(e) => setChallengeTitle(e.target.value)} type="text" placeholder="Challenge title" className="w-full p-3 border-[1px] border-gray-400 rounded-lg hover:border-[#61E9B1]" />
        </div>

        <div className="mb-3">
          <div className="text-base mb-2">Description</div>
          <input value={challengeDescription} onChange={(e) => setChallengeDescription(e.target.value)} type="text" placeholder="Description" className="w-full p-3 border-[1px] border-gray-400 rounded-lg hover:border-[#61E9B1]" />
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

        <button onClick={createChallenge} className="w-full mb-3 p-3 bg-[#61E9B1] border-[1px] border-[#61E9B1] rounded-lg hover:bg-[#4edba1]">
        <i className="fa-solid fa-arrow-trend-up"></i> Create a challenge
        </button>
      </div>
      <div className="w-3/6 sm:mx-8 mx-auto">
        <h2 className="pb-3 pt-1 font-semibold text-xl">What are challenges?</h2>
        <p>Challenges are group's common tasks that require to be achieved by group members together. Here progress cannot be followed.
        </p>
        <h2 className="pb-3 pt-6 font-semibold text-xl">Who can create challenges?</h2>
        <p>Only the mentor of a group.
        </p>
        <h2 className="pb-3 pt-6 font-semibold text-xl">What are the start date and end date?</h2>
        <p>Start date is the date when activities can be started doing in order to achieve results. 
          End date is the date after which the challenge can no longer be completed if it was not already.
        </p>
      </div>
    </div>
    </div>
  );
};