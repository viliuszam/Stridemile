import { useOutletContext, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { AlertTypes } from "../styles/modules/AlertStyles";
import '../styles/Home.css';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';
import { isLoggedIn } from "../classes/Auth";
import anime from "animejs";
import style from '../styles/Achievements.css'
import { getUser } from "../classes/User";

export default () => {

    const [items, setItems] = useState([]);
    const [userItems, setUserItems] = useState([]);
    const [points, setPoints] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        axios.get('http://localhost:3333/achievements/all', {
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

        axios.get('http://localhost:3333/achievements/userAchievements', {
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

  return isLoggedIn() ? (
    <div>
    <div className="container bg-white pt-12">
        <div className="text-[#61E9B1]">
            <h2 className="text-center text-2xl">All purchases</h2>
        </div>
        <div className="mt-4 mb-4 mr-7 text-right">
            <p>My points: {getUser().points}</p>
        </div>
        <div className="md:flex">
        <div className="w-full grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 pl-5 pr-5">
        
        {items.map((item) => (
            <div className="h-[385px] rounded-xl mt-3 text-center pt-5 pb-5 bg-gray-50 border border-solid border-[#61E9B1]">
            <div className="rounded-4xl pb-3 pt-2 flex">
                <img src="https://cdn.pixabay.com/photo/2019/03/17/15/42/basketball-4061225_1280.png" alt="steps" className="rounded-4xl mx-auto" height={100} width={100}/>
            </div>
            <div>
                <div className="">
                    <div className="max-w-64">
                    <h2 className="font-semibold pb-1">{item.title}</h2>
                    <p className="text-sm"><i class="fa-solid fa-layer-group"></i> Category: {item.category}</p>
                    <p className="text-sm"><i class="fa-solid fa-money-check-dollar"></i> Price: {item.price} points</p>
                    </div>
                </div>
                <hr className="mt-4 mb-4 mx-8" ></hr>
                <div>
                <p className="text-sm">Purchased: {item.date}</p>
                </div>
                <hr className="mt-4 mx-8" ></hr>
            </div>
            <div className="flex">
                <Link to="/shop-item" className=" mx-auto bg-[#61E9B1] border-[1px] border-[#61E9B1] hover:bg-[#4edba1] rounded-lg text-black p-3 md:my-6 md:ml-[63px] text-sm border border-solid border-[#61E9B1]">
                    View item
                </Link>
            </div>
        </div>

        ))}
        
        </div>
        <div>
            <div className="bg-gray-50 w-72 rounded-xl mt-3 p-4 mr-6">
                <div className="text-black text-center font-semibold pb-5">
                    Last purchases
                </div>
                <p>Here all purchases are showed in the chronological order. If you want to buy something more, come back to shop.</p>
                <div className="pt-6 pb-4">
                    <Link to="/shop" className="bg-[#61E9B1] border-[1px] border-[#61E9B1] hover:bg-[#4edba1] rounded-lg text-black p-3 md:m-6 md:ml-[83px] text-sm border border-solid border-[#61E9B1]">
                        Go to shop
                    </Link>
                </div>
            </div>
        </div>
        </div>
    </div>
    </div>
  ) : (
    <Navigate to='/login' />
  );
};