import { useOutletContext, Link } from "react-router-dom";
import { AlertTypes } from "../styles/modules/AlertStyles";
import '../styles/Home.css';
import axios from 'axios';
import NavBar from "../components/NavBar";
import { PieChart } from '@mui/x-charts/PieChart';
import { useState, useEffect } from 'react'

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

  return (
    <div className="min-h-dvh" style={{
        background: "url(https://giffiles.alphacoders.com/220/220213.gif)",
        backgroundSize: "cover",
      }}>
    
        <div className="container bg-white">
            <div className="text-[#61E9B1]">
                <h2 className="text-center text-2xl">Achievements</h2>
            </div>
            <div className="mt-4 mb-4 mr-6 text-right">
                <p>Completed achievements score: {points.userPoints}/{points.totalPoints}</p>
            </div>
            <div className="flex">
                <div className="w-full grid grid-cols-3 gap-4 pl-5 pr-5">
                {achievements.map((achievement) => (
                    <div className="bg-white rounded-xl mt-3 text-center pt-5 pb-5 bg-gray-50 border border-solid border-green-400 hover:bg-gray-200">
                        <div className="rounded-4xl pb-3 flex">
                            <img src="https://cdn1.iconfinder.com/data/icons/ui-roundicons/480/circle_award-512.png" alt="steps" className="rounded-4xl mx-auto" height={100} width={100}/>
                        </div>
                        <h2 className="font-semibold">{achievement.title}</h2>
                        <p className="text-sm">{achievement.description}</p>
                        <div class="bg-gray-200 rounded-full h-1 ml-6 mr-6 mb-4 dark:bg-gray-700 mt-6">
                            <div class="bg-[#61E9B1] h-1 rounded-full dark:bg-blue-500" style={{ width: "100%" }}></div>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    </div>
  );
};