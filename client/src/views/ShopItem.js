import { useOutletContext, Link, Navigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { AlertTypes } from "../styles/modules/AlertStyles";
import '../styles/Home.css';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';
import { isLoggedIn } from "../classes/Auth";
import anime from "animejs";
import style from '../styles/Achievements.css'
import { getUser } from "../classes/User";
import { Button } from "@mui/material";
import config from "../config";

export default () => {
    const { itemId } = useParams();

    const [items, setItems] = useState([]);
    const [userItems, setUserItems] = useState([]);
    const [points, setPoints] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        axios.get(`${config.API_URL}/achievements/all`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching shop items: ', error);
            });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        axios.get(`${config.API_URL}/achievements/userAchievements`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setUserItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching shop items: ', error);
            });
    }, []);

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

    const percentage = (points.userPoints / points.totalPoints) * 100;

    const data = [
        { id: 0, value: percentage, color: '#61E9B1' },
        { id: 1, value: 100 - percentage, color: '#f9fafb' },
    ];

    const buy = () => {

    }

    return isLoggedIn() ? (
        <div>
            <div className="container bg-white pt-12">
                <div className="text-[#61E9B1]">
                    <h2 className="text-center text-2xl">Shop item</h2>
                </div>
                <div className="mt-4 mb-4 mr-7 text-right">
                    <p>My points: {getUser().points}</p>
                </div>
                <div className="flex">

                    <div className="w-96">
                        <div className="bg-gray-50 rounded-xl inline-block p-4 border-[1px] border-gray-100">
                            <img src="https://cdn.pixabay.com/photo/2019/03/17/15/42/basketball-4061225_1280.png" alt="steps" height={200} width={200} />
                        </div>
                    </div>

                    <div className="ml-5">
                        <div className="text-2xl font-semibold">Item name</div>
                        <div className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla viverra nisl dui, vel consectetur ipsum aliquam eu. Integer at nulla volutpat, imperdiet ante eu, tempus turpis. Fusce pharetra congue enim, a aliquet nisl efficitur sit amet. Sed maximus fermentum dolor ac aliquam. Curabitur placerat rhoncus facilisis.</div>
                        <div className="mt-5"><i className="fa-solid fa-layer-group"></i> type</div>
                        <div className="mt-10 text-lg">Price: 100 points</div>
                        <button onClick={buy} className="mt-5 bg-[#61E9B1] border-[1px] border-[#61E9B1] hover:bg-[#4edba1] rounded-lg text-black p-3 text-sm border border-solid border-[#61E9B1] flex">
                            Buy item
                        </button>
                    </div>

                </div>
            </div>
        </div>
    ) : (
        <Navigate to='/login' />
    );
};