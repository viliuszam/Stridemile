import '../styles/Home.css';
import { PieChart } from '@mui/x-charts/PieChart';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useOutletContext, Navigate } from "react-router-dom";
import { isLoggedIn } from "../classes/Auth";
import config from '../config'; 

export default () => {
  const { groupId } = useParams();
  const [points, setPoints] = useState([]);
  const [monthlySteps, setMonthlySteps] = useState([]);
  const [dailySteps, setDailySteps] = useState();
  const [groupInfo, setGroupInfo] = useState('');
  const [events, setEvents] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [goals, setGoals] = useState([]);
  const [eventComments, setEventComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [challengeParticipants, setChallengeParticipants] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    axios.get(`${config.API_URL}/achievements/points`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
      .then(response => {
        setPoints(response.data);
      })
      .catch(error => {
        console.error('Error fetching points: ', error);
      });
  }, []);


  useEffect(() => {
    const fetchGroupInfo = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`${config.API_URL}/groups/group/${groupId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGroupInfo(response.data);
      } catch (error) {
        console.error('Error fetching group info:', error);
      }
    };

    const fetchGoals = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`${config.API_URL}/groups/getAllGroupsGoals`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGoals(response.data.goals);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    fetchGroupInfo();
    fetchEvents();
    fetchChallenges();
    fetchGoals();
  }, [groupId]);

  const handleShowChallengeParticipants = async (challengeId) => {
    try {
      const response = await axios.get(`${config.API_URL}/groups/${challengeId}/challenge-participants`);
      setChallengeParticipants((prevState) => ({
        ...prevState,
        [challengeId]: response.data,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${config.API_URL}/groups/getAllGroupsEvents`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const eventsWithParticipation = await Promise.all(
        response.data.events.map(async (event) => {
          const isParticipating = await userIsParticipatingInEvent(event.id);
          return { ...event, isParticipating };
        })
      );

      setEvents(eventsWithParticipation);

      response.data.events.forEach((event) => {
        fetchEventComments(event.id);
      });
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchChallenges = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${config.API_URL}/groups/getAllGroupsChallenges`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const challengesWithParticipation = await Promise.all(
        response.data.challenges.map(async (chal) => {
          handleShowChallengeParticipants(chal.id);
          const isParticipating = await userIsParticipatingInChallenge(chal.id);
          return { ...chal, isParticipating };
        })
      );

      setChallenges(challengesWithParticipation);
      //setChallenges(response.data.challenges);
    } catch (error) {
      console.error('Error fetching challenges:', error);
    }
  };

  const fetchEventComments = async (eventId) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${config.API_URL}/groups/${eventId}/event-comments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEventComments(prevState => ({
        ...prevState,
        [eventId]: response.data.comments,
      }));
    } catch (error) {
      console.error(`Error fetching comments for event ${eventId}:`, error);
    }
  };

  const handlePostComment = async (eventId) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        `${config.API_URL}/groups/${eventId}/post-comment`,
        { content: commentContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEventComments(prevState => ({
        ...prevState,
        [eventId]: [...(prevState[eventId] || []), response.data.comment],
      }));
      setCommentContent('');
      fetchEvents();
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleEventParticipate = async (eventId) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        `${config.API_URL}/groups/${eventId}/event-participate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchEvents();
    } catch (error) {
      console.error('Error participating:', error);
    }
  };

  const handleChallengeParticipate = async (challengeId) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        `${config.API_URL}/groups/${challengeId}/challenge-participate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchChallenges();
      handleShowChallengeParticipants(challengeId);
    } catch (error) {
      console.error('Error participating:', error);
    }
  };

  const handleEventCancelParticipation = async (eventId) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        `${config.API_URL}/groups/${eventId}/event-cancel-participation`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchEvents();
    } catch (error) {
      console.error('Error canceling participation:', error);
    }
  };

  const handleChallengeCancelParticipation = async (challengeId) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        `${config.API_URL}/groups/${challengeId}/challenge-cancel-participation`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchChallenges();
      handleShowChallengeParticipants(challengeId);
    } catch (error) {
      console.error('Error canceling participation:', error);
    }
  };

  const userIsParticipatingInEvent = async (eventId) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(
        `${config.API_URL}/groups/${eventId}/user-event-participation`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.isParticipating;
    } catch (error) {
      console.error('Error checking participation:', error);
      return false;
    }
  };

  const userIsParticipatingInChallenge = async (eventId) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(
        `${config.API_URL}/groups/${eventId}/user-challenge-participation`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.isParticipating;
    } catch (error) {
      console.error('Error checking participation:', error);
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
  
    axios.post(`${config.API_URL}/rewards/update`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
    })
      .then(response => {

      })
      .catch(error => {
        console.error('Error updating rewards: ', error);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    axios.get(`${config.API_URL}/activity/monthlySteps`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
      .then(response => {
        setMonthlySteps(response.data);
      })
      .catch(error => {
        console.error('Error fetching steps: ', error);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    axios.get(`${config.API_URL}/activity/dailysteps`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
      .then(response => {
        setDailySteps(response.data);
      })
      .catch(error => {
        console.error('Error fetching daily steps count: ', error);
      });
  }, []);


  const getMapsUrl = (loc) => {
    return `https://www.google.com/maps/place/${loc}/`
  }

  const dateDiffToString = (dateWhenString) => {
    let dateWhen = new Date(dateWhenString)
    let dateNow = new Date();
    
    let seconds = Math.floor(((dateNow) - dateWhen)/1000);
    let minutes = Math.floor(seconds/60);
    let hours = Math.floor(minutes/60);
    let days = Math.floor(hours/24);
    
    hours = hours-(days*24);
    minutes = minutes-(days*24*60)-(hours*60);
    seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

    if(days) return `${days} days`
    if(hours) return `${hours} hours`
    if(minutes) return `${minutes} minutes`
    return `${seconds} seconds`
  }

  const percentage = (points.userPoints / points.totalPoints) * 100;

  return isLoggedIn() ? (
    <div className='container'>

      <div className='mt-10 flex'>
        <div className='w-full mr-6'>
          <a className='text-[#4edba1] font-bold pb-2 border-b-4 border-[#4edba1]' href="#">Latest</a>
          <hr className='mb-3 mt-2' />

          <div>
            {events.map(event => (
              <div key={event.id} className='flex mb-8 p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100'>
                <div className="w-24 h-24">
                  <img className="w-full h-full object-cover rounded" src={require("../images/event.jpg")} alt="Event" />
                </div>
                <div className='mx-4 flex-1'>
                  <div className='mb-1 flex text-xs text-gray-400'>
                    <p>Event</p>
                    <span className='mx-2'>|</span>
                    <p>{new Date(event.date).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
                    <span className='mx-2'>|</span>
                    <a href={getMapsUrl(event.location)} target="_blank" rel="noopener noreferrer" className='text-[#74cfda]'>
                      <i className="fa-solid fa-location-dot"></i> {event.location}
                    </a>
                  </div>
                  <p className='mb-1 font-bold'>{event.title}</p>
                  <p className='mb-3 text-sm text-gray-500'>{event.description}</p>
                  <div className='mt-4'>
                    <div className='my-auto text-sm text-nowrap'>
                      Participants:
                      {event.participants && event.participants.map(participant => (
                        <span key={participant.id} className='mx-2'>{participant.username} </span>
                      ))} <i className="fa-solid fa-user-check text-gray-400"></i>
                    </div>
                    {event.isParticipating ? (
                      <button
                        className='bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded mt-2'
                        onClick={() => handleEventCancelParticipation(event.id)}
                      >
                        Cancel Participation
                      </button>
                    ) : (
                      <button
                        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded mt-2'
                        onClick={() => handleEventParticipate(event.id)}
                      >
                        Participate
                      </button>
                    )}
                    <h3 className='my-2 text-sm font-bold'>Comments:</h3>
                    {eventComments[event.id] && eventComments[event.id].map(comment => (
                      <div key={comment.id} className='border border-gray-200 p-3 mb-2 rounded'>
                        <p className='text-gray-600 mb-1'>{comment.content}</p>
                        <p className='text-xs text-gray-400'>{new Date(comment.createdAt).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })} {comment.createdBy && comment.createdBy.username && (<p>Created by: {comment.createdBy.username}</p>)}</p>
                      </div>
                    ))}
                    <div className='mt-4'>
                      <textarea
                        className='w-full border border-gray-200 rounded p-2 mb-2 text-sm'
                        placeholder='Write your comment here...'
                        rows={3}
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                      />
                      <button
                        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded'
                        onClick={() => handlePostComment(event.id)}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
                <div className='ml-auto'>
                  <div className='text-[#4edba1] hover:text-[#61E9B1] cursor-pointer'>
                    <i className='fa-solid fa-circle-check'></i>
                  </div>
                </div>
              </div>
            ))}
          </div>


          <div>
              {challenges.map(challenge => (
                <div key={challenge.id} className='flex mb-3 p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100'>
                  <img className="my-auto w-24 h-24 object-cover rounded" src={require("../images/challenge.jpg")} />
                  <div className='mx-4 flex-1'>
                    <div className='mb-1 flex text-xs text-gray-400'>
                      <p>Challenge</p>
                      <span className='mx-2'>|</span>
                      <p>Starts {new Date(challenge.start_date).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
                      <span className='mx-2'>|</span>
                      <p>Ends {new Date(challenge.end_date).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
                    </div>
                    <p className='mb-1 font-bold'>{challenge.title}</p>
                    <p className='mb-3 text-sm text-gray-500'>{challenge.description}</p>
                    <div className='flex ml-auto'>
                      <div className='my-auto text-sm text-nowrap'>
                        Participants:
                        {challengeParticipants[challenge.id] && challengeParticipants[challenge.id].map(participant => (
                          <span key={participant.id} className='mx-2'>{participant.user.username}</span>
                        ))} <i className="fa-solid fa-user-check text-gray-400"></i>
                      </div>
                    </div>
                    {challenge.isParticipating ? (
                      <button
                        className='bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded mt-2'
                        onClick={() => handleChallengeCancelParticipation(challenge.id)}
                      >
                        Cancel Participation
                      </button>
                    ) : (
                      <button
                        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded mt-2'
                        onClick={() => handleChallengeParticipate(challenge.id)}
                      >
                        Participate
                      </button>
                    )}
                    <div className='mt-4 flex text-sm text-gray-400'>
                      <p className='mr-auto'>15</p>
                      <p className='text-xs'>15%</p>
                      <p className='ml-auto'>100</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
                      <div className="bg-[#61E9B1] h-1.5 rounded-full" style={{ width: "15%" }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>



            <div>
              {goals.map(goal => (
                <div key={goal.id} className='flex mb-3 p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100'>
                  <img className="my-auto w-24 h-24 object-cover rounded" src={require("../images/goal.jpg")} />
                  <div className='mx-4'>

                    <div className='mb-1 flex text-xs text-gray-400'>
                      <p>Goal</p>
                      <span className='mx-2'>|</span>
                      <p>Starts {new Date(goal.start_date).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
                      <span className='mx-2'>|</span>
                      <p>Ends {new Date(goal.end_date).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
                    </div>

                    <p className='mb-1 font-bold'>{goal.title}</p>

                    <p className='mb-3 text-sm text-gray-500'>{goal.description}</p>


                    <div className='flex text-sm text-gray-400'>
                      <p className='mr-auto'>15</p>
                      <p className='text-xs'>15%</p>
                      <p className='ml-auto'>100</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
                      <div className="bg-[#61E9B1] h-1.5 rounded-full" style={{ width: "15%" }}></div>
                    </div>

                    <div className='flex text-xs text-gray-400'>
                      <p>STATUS: {goal.status.name}</p>
                      <p className='ml-6'>CATEGORY: {goal.category.name}</p>
                    </div>

                  </div>

                  <div className='ml-auto'>
                    <div className='text-gray-400 hover:text-gray-300 cursor-pointer'>
                      <i className="fa-solid fa-circle-check"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
          <div className='w-96 text-sm text-gray-600'>

          <div className='mb-4 p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100 text-sm text-gray-600'>
            <p className='text-black font-bold'>Achievements</p>
            <p className='mb-3 text-xs text-gray-600'>Percentage of total achievements completed</p>
            <div className='flex my-auto place-items-center'>
              <p className='flex text-center text-gray-500 text-5xl font-bold'>
                {points.totalPoints ? ((points.userPoints / points.totalPoints) * 100).toFixed(0) : 0} <i className="fa-solid fa-percent"></i>
              </p>
              <PieChart
              slotProps={{ legend: { hidden: true } }}
              series={[
                {
                  data: [
                    { id: 0, value: percentage, color: '#61E9B1', label: 'Completed' },  
                    { id: 1, value: 100 - percentage, color: '#e1e1e1', label: 'Not done' },
                  ],
                  innerRadius: 20,
                  outerRadius: 30,
                  paddingAngle: 0,
                  cornerRadius: 5,
                  startAngle: 0,
                  endAngle: 360,
                  cx: 70,
                }
              ]}
              height={70}
            />
            </div>
          </div>

          <div className='p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100 text-sm text-gray-600'>
            <p className='text-black font-bold'>Steps</p>
            <p className='mb-3 text-xs text-gray-600'>You took this many steps this month:</p>
            <div className='py-4 flex my-auto place-items-center'>
              <p className='flex text-center text-gray-500 text-5xl font-bold'>
                {monthlySteps}
              </p>
            </div>
          </div>
          
        </div>
      </div>

    </div>
  ) : (
    <Navigate to='/login' />
  );
};
