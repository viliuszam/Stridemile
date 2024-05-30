import '../styles/Home.css';
import React from 'react';
import { useParams, useOutletContext, Link, Navigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { AvatarGroup } from '@mui/material';
import { getUser } from '../classes/User';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { isLoggedIn } from "../classes/Auth";
import axios from 'axios';

const getMapsUrl = (loc) => {
  return `https://www.google.com/maps/place/${loc}/`
};

const Profile = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { setAlert } = useOutletContext();
  const { username } = useParams();

  const [user, setUser] = React.useState(null);


  React.useEffect(() => {
    const token = localStorage.getItem('accessToken');

    axios.get(`http://localhost:3333/users/getByUsername/${username}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
      .then(response => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching shop items: ', error);
      });
  }, []);

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ py: 3 }}>
            <Typography component={'div'}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const dateDiffToString = (dateWhenString) => {
    let dateWhen = new Date(dateWhenString)
    let dateNow = new Date();

    let seconds = Math.floor(((dateNow) - dateWhen) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    hours = hours - (days * 24);
    minutes = minutes - (days * 24 * 60) - (hours * 60);
    seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

    if (days) return `${days} days`
    if (hours) return `${hours} hours`
    if (minutes) return `${minutes} minutes`
    return `${seconds} seconds`
  }

  return isLoggedIn() ? (
    <div className='container'>

      <div className='relative mt-10 h-32 w-full bg-gradient-to-b from-gray-100 to-gray-200 rounded-xl'>
        <img className='absolute left-10 -bottom-10 h-24 w-24 rounded-full outline outline-8 outline-white' src={user?.profile_picture} />
      </div>

      <div className='mt-14 mb-10 flex'>
        <div className='text-2xl font-semibold ml-10 text-center' style={{ color: '#000000' }}>{username}</div>
        <div className='ml-auto'>
          {(getUser().username === username) ?
            <Link to="/create-group" className="w-full mb-3 p-3 mt-2 bg-[#61E9B1] border-[1px] border-[#61E9B1] rounded-lg hover:bg-[#4edba1] mr-2 whitespace-nowrap">
              <i className="fa-solid fa-user-pen"></i> Edit
            </Link>
            : null}
        </div>
      </div>

      <div className='flex'>
        <div className='w-full mr-6'>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', color: "#4edba1", padding: "0px" }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor='inherit'
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#4edba1",
                  height: 3
                }
              }}>
              <Tab sx={{ textTransform: "none", fontSize: "15px", fontWeight: "bold" }} label="Feed" {...a11yProps(0)} />
              <Tab sx={{ textTransform: "none", fontSize: "15px", fontWeight: "bold" }} label="Newest achievements" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div className='mb-3 p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100'>
              <div className='flex'>
                <img className="my-auto w-24 h-24 object-cover rounded" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Ludovic_and_Lauren_%288425515069%29.jpg/640px-Ludovic_and_Lauren_%288425515069%29.jpg" />
                <div className='mx-4'>

                  <div className='mb-1 flex text-xs text-gray-400'>
                    <p>Event</p>
                    <span className='mx-2'>|</span>
                    <p>2024-03-06</p>
                    <span className='mx-2'>|</span>
                    <a href={getMapsUrl("Kaunas, Pilies g. 17")} target="_blank" rel="noopener noreferrer" className='text-[#74cfda]'>
                      <i className="fa-solid fa-location-dot"></i> Kaunas, Pilies g. 17
                    </a>
                  </div>

                  <p className='mb-1 font-bold'>Event title</p>

                  <p className='mb-3 text-sm text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat ornare nibh, nec vestibulum velit commodo nec. In varius pharetra ornare.</p>

                  <div className='text-xs text-gray-400'>
                    ORANIZATION UAB "Sportiva"
                  </div>

                </div>
                <div className='flex ml-auto'>
                  <div className='my-auto text-sm text-nowrap'>
                    50 <i className="fa-solid fa-user-check text-gray-400"></i>
                  </div>
                </div>
                <div className='ml-auto'>
                  <div className='text-[#4edba1] hover:text-[#61E9B1] cursor-pointer'>
                    <i className="fa-solid fa-circle-check"></i>
                  </div>
                </div>
              </div>
              <hr className='my-4' />
              <div className='flex items-center'>
                <img className='w-10 h-10 rounded-full' src="https://wearecardinals.com/wp-content/uploads/2020/04/u1Re9qgMfM8d6kumlW85PS6s55jQh5fbdmppgQsP.jpeg" />
                <div className='ml-3'>
                  <p className='text-[14px]'><Link to='/group/1' className='hover:text-[#4edba1]'>Furious group</Link></p>
                  <p className='text-xs text-gray-700'>By <Link to='/group/1' className='hover:text-[#4edba1]'>Tautvydas</Link> {dateDiffToString('2024-03-11 12:20:05')} ago</p>
                </div>
              </div>
            </div>

            <div className='mb-3 p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100'>
              <div className='flex'>
                <img className="my-auto w-24 h-24 object-cover rounded" src="https://media.istockphoto.com/id/1266413326/vector/vector-challenge-sign-pop-art-comic-speech-bubble-with-expression-text-competition-bright.jpg?s=612x612&w=0&k=20&c=eYOQaCn7WvMAEo5ZxVHVVQ-pcNT8HZ-yPeTjueuXi28=" />
                <div className='mx-4'>

                  <div className='mb-1 flex text-xs text-gray-400'>
                    <p>Challenge</p>
                    <span className='mx-2'>|</span>
                    <p>Starts 2024-03-06 10:30</p>
                    <span className='mx-2'>|</span>
                    <p>Ends 2024-03-10 10:30</p>
                  </div>

                  <p className='mb-1 font-bold'>Challenge title</p>

                  <p className='mb-3 text-sm text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat ornare nibh, nec vestibulum velit commodo nec. In varius pharetra ornare.</p>

                </div>
                <div className='flex ml-auto'>
                  <div className='my-auto text-sm text-nowrap'>
                    50 <i className="fa-solid fa-user-check text-gray-400"></i>
                  </div>
                </div>
                <div className='ml-auto'>
                  <div className='text-gray-400 hover:text-gray-300 cursor-pointer'>
                    <i className="fa-solid fa-circle-check"></i>
                  </div>
                </div>
              </div>
              <hr className='my-4' />
              <div className='flex items-center'>
                <img className='w-10 h-10 rounded-full' src="https://wearecardinals.com/wp-content/uploads/2020/04/u1Re9qgMfM8d6kumlW85PS6s55jQh5fbdmppgQsP.jpeg" />
                <div className='ml-3'>
                  <p className='text-[14px]'><Link to='/group/1' className='hover:text-[#4edba1]'>Furious group</Link></p>
                  <p className='text-xs text-gray-700'>By <Link to='/group/1' className='hover:text-[#4edba1]'>Tautvydas</Link> {dateDiffToString('2024-03-11 12:20:05')} ago</p>
                </div>
              </div>
            </div>

            <div className='mb-3 p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100'>
              <div className='flex'>
                <img className="my-auto w-24 h-24 object-cover rounded" src="https://www.speexx.com/wp-content/uploads/goal-setting-basics.jpg" />
                <div className='mx-4'>

                  <div className='mb-1 flex text-xs text-gray-400'>
                    <p>Goal</p>
                    <span className='mx-2'>|</span>
                    <p>Starts 2024-03-06 10:30</p>
                    <span className='mx-2'>|</span>
                    <p>Ends 2024-03-10 10:30</p>
                  </div>

                  <p className='mb-1 font-bold'>Goal title</p>

                  <p className='mb-3 text-sm text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat ornare nibh, nec vestibulum velit commodo nec. In varius pharetra ornare.</p>

                  <div className='flex text-sm text-gray-400'>
                    <p className='mr-auto'>15</p>
                    <p className='text-xs'>15%</p>
                    <p className='ml-auto'>100</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
                    <div className="bg-[#61E9B1] h-1.5 rounded-full" style={{ width: "15%" }}></div>
                  </div>

                  <div className='flex text-xs text-gray-400'>
                    <p>STATUS: [STATUS GOES HERE]</p>
                    <p className='ml-6'>CATEGORY: [CATEGORY GOES HERE]</p>
                  </div>

                </div>
                <div className='flex ml-auto'>
                  <div className='my-auto text-sm text-nowrap'>
                    50 <i className="fa-solid fa-user-check text-gray-400"></i>
                  </div>
                </div>
                <div className='ml-auto'>
                  <div className='text-gray-400 hover:text-gray-300 cursor-pointer'>
                    <i className="fa-solid fa-circle-check"></i>
                  </div>
                </div>
              </div>
              <hr className='my-4' />
              <div className='flex items-center'>
                <img className='w-10 h-10 rounded-full' src="https://wearecardinals.com/wp-content/uploads/2020/04/u1Re9qgMfM8d6kumlW85PS6s55jQh5fbdmppgQsP.jpeg" />
                <div className='ml-3'>
                  <p className='text-[14px]'><Link to='/group/1' className='hover:text-[#4edba1]'>Furious group</Link></p>
                  <p className='text-xs text-gray-700'>By <Link to='/group/1' className='hover:text-[#4edba1]'>Tautvydas</Link> {dateDiffToString('2024-03-11 12:20:05')} ago</p>
                </div>
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="w-full grid grid-cols-3 gap-4 pl-5 pr-5">
              <div className="flip-card h-80">
                <div className="flip-card-inner h-full w-full">
                  <div className="flip-card-front absolute h-full w-full bg-white rounded-xl mt-3 text-center pt-5 pb-5 bg-gray-50 border border-solid border-green-400">
                    <div className="rounded-4xl pb-3 flex">
                      <img src="https://cdn1.iconfinder.com/data/icons/ui-roundicons/480/circle_award-512.png" alt="steps" className="rounded-4xl mx-auto" height={100} width={100} />
                    </div>
                    <h2 className="font-semibold">hey</h2>
                    <p className="text-sm">desc</p>
                    <div className="bg-gray-200 rounded-full h-1 ml-6 mr-6 mb-4 dark:bg-gray-700 mt-6">
                      <div className="bg-[#61E9B1] h-1 rounded-full dark:bg-blue-500" style={{ width: `100%` }}></div>
                    </div>
                    <div className="text-[#61E9B1]">100%</div>
                    <hr className="ml-6 mr-6 mt-4 mb-4" />
                    <p className="text-sm">
                      a
                    </p>
                  </div>
                  <div className="flip-card-back flex absolute h-full w-full bg-white rounded-xl mt-3 text-center pt-5 pb-5 bg-gray-50 border border-solid border-green-400">

                    <div className="justify-center my-auto">
                      <div className="mb-6 text-green-300 text-6xl">
                        <i className="fa-solid fa-trophy"></i>
                      </div>
                      <p className="text-md text-gray-700">[Username] earned <label className="text-green-500">0 points</label> for completing this achievement.</p>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </CustomTabPanel>

        </div>
        <div className='w-96 text-sm text-gray-600'>

          <div className="bg-gray-50 w-72 rounded-xl mt-3 p-4 mr-6">
            <p className='mb-4 text-black font-bold'>Groups</p>
            <AvatarGroup total={24} sx={{
              justifyContent: 'start'
            }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
              <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            </AvatarGroup>
          </div>

          <div className="bg-gray-50 w-72 rounded-xl mt-3 p-4 mr-6">
            <p className='mb-4 text-black font-bold'>Achievements</p>
            <p className='mb-8'>Achievements by participating in different activities</p>
            <p className='text-center text-xl'><i className="fa-solid fa-trophy"></i> 1/50</p>
          </div>

        </div>
      </div>

    </div>
  ) : (
    <Navigate to='/login' />
  );
};

export default Profile;
