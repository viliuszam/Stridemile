import { useOutletContext, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { AlertTypes } from "../styles/modules/AlertStyles";
import '../styles/Home.css';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';
import { isLoggedIn } from "../classes/Auth";
import anime from "animejs";
import style from '../styles/Achievements.css'

export default () => {

    const [achievements, setAchievements] = useState([]);
    const [userAchievements, setUserAchievements] = useState([]);
    const [points, setPoints] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        axios.get('http://localhost:3333/achievements/all', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
          .then(response => {
            setAchievements(response.data);
          })
          .catch(error => {
            console.error('Error fetching achievements: ', error);
          });
      }, []);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        axios.get('http://localhost:3333/achievements/userAchievements', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
          .then(response => {
            setUserAchievements(response.data);
          })
          .catch(error => {
            console.error('Error fetching achievements: ', error);
          });
      }, []);
    
    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        axios.get('http://localhost:3333/achievements/points', {
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

    const percentage = (points.userPoints / points.totalPoints) * 100;

    const data = [
        { id: 0, value: percentage, color: '#61E9B1' },
        { id: 1, value: 100 - percentage, color: '#f9fafb' },
    ];

    const getFlipEl = (event) => {
        return event.target.getElementsByClassName('achievement-badge')
        /*
        console.log(event.target)
        let el
        if(event.target.classList.contains('achievement-badge')) return event.target
        else if(event.target.parentElement.classList.contains('achievement-badge')) return event.target.parentElement
        else return false;
        */
    }

    const flip = (event) => {
        let el = getFlipEl(event)

        anime({
            targets: el,
            scaleX: 0,
        });
    }

    const flipOut = (event) => {
        let el = getFlipEl(event)

        anime({
            targets: el,
            scaleX: 1,
        });
    }
  return isLoggedIn() ? (
    <div>
    <div className="container bg-white pt-12">
        <div className="text-[#61E9B1]">
            <h2 className="text-center text-2xl">Achievements</h2>
        </div>
        <div className="mt-4 mb-4 mr-6 text-right">
            <p>Completed achievements score: {points.userPoints}/{points.totalPoints}</p>
        </div>
        <div className="flex">
        <div className="w-full grid grid-cols-3 gap-4 pl-5 pr-5">

        {achievements.map((achievement) => (
            <div className="flip-card h-80">
                <div className="flip-card-inner h-full w-full">
                    <div className="flip-card-front absolute h-full w-full bg-white rounded-xl mt-3 text-center pt-5 pb-5 bg-gray-50 border border-solid border-green-400">
                        <div className="rounded-4xl pb-3 flex">
                            <img src="https://cdn1.iconfinder.com/data/icons/ui-roundicons/480/circle_award-512.png" alt="steps" className="rounded-4xl mx-auto" height={100} width={100}/>
                        </div>
                        <h2 className="font-semibold">{achievement.title}</h2>
                        <p className="text-sm">{achievement.description}</p>
                        <div className="bg-gray-200 rounded-full h-1 ml-6 mr-6 mb-4 dark:bg-gray-700 mt-6">
                            <div className="bg-[#61E9B1] h-1 rounded-full dark:bg-blue-500" style={{ width: `${achievement.progress}%` }}></div>
                        </div>
                        <div className="text-[#61E9B1]">{(achievement.progress).toFixed(0)}%</div>
                        <hr className="ml-6 mr-6 mt-4 mb-4" ></hr>
                        <p className="text-sm">
                            {achievement.completed ? (
                                `Achieved: ${achievement.date}`
                            ) : (
                                "In progress..."
                            )}
                        </p>
                    </div>
                    <div className="flip-card-back flex absolute h-full w-full bg-white rounded-xl mt-3 text-center pt-5 pb-5 bg-gray-50 border border-solid border-green-400">
                        
                            {(achievement.progress == 100) ? (
                                <div className="justify-center my-auto">
                                    <div className="mb-6 text-green-300 text-6xl">
                                        <i className="fa-solid fa-trophy"></i>
                                    </div>
                                    <p className="text-md text-gray-700">You have earned <label className="text-green-500">{achievement.points} points</label> for completing this achievement.</p>
                                </div>
                            ) : (
                                <div className="justify-center my-auto">
                                    <div className="mb-6 text-gray-300 text-6xl">
                                        <i className="fa-solid fa-trophy"></i>
                                    </div>
                                    <p className="text-md text-gray-700">You will earn <label className="text-green-500">{achievement.points} points</label> by completing this achievement.</p>
                                </div> 
                            )}  
                    </div>
                </div>
            </div>
        ))}
        
        </div>
        <div className="bg-gray-50 w-72 rounded-xl mt-3 p-4 mr-6">
            <div className="text-black text-center font-semibold pb-5">
                 Progress chart
            </div>
            <PieChart
            series={[
                {
                    data,
                    innerRadius: 80,
                    outerRadius: 100,
                    paddingAngle: 0,
                    cornerRadius: 5,
                    startAngle: 0,
                    endAngle: 360,
                    cx: 95,
                    cy: 95,
                }
            ]}

            width={200}
            height={200}
            />
            <div className="text-green-400 text-center pt-3">
                {((points.userPoints / points.totalPoints) * 100).toFixed(2)}%
            </div>
            <div className="text-black text-center font-semibold pb-5 pt-6">
                 Points earned
            </div>
            {userAchievements.map((achievement) => (
                    <div>
                        <div className="flex">
                            <p><i className="fa-solid fa-bell"></i></p><p className="pl-2"> <b> {achievement.title}</b> </p>
                            <p className="text-[#61E9B1] pl-2"> +{achievement.points} points</p>
                        </div>
                        <p className="pl-5"> ({achievement.date})</p>
                    </div>
                ))}
        </div>
        </div>
    </div>
    </div>
  ) : (
    <Navigate to='/login' />
  );
};