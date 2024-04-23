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
import { Button } from "@mui/material";

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

    const buy = () => {
        
      }

  return isLoggedIn() ? (
    <div>
    <div className="container bg-white pt-12">
        <div className="text-[#61E9B1]">
            <h2 className="text-center text-2xl">Shop</h2>
        </div>
        <div className="mt-4 mb-4 mr-7 text-right">
            <p>My points: {getUser().points}</p>
        </div>
        <div className="md:flex">
        <div className="w-full grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 pl-5 pr-5">

        {items.map((item) => (
            
            <div className="h-[465px] rounded-xl mt-3 text-center pt-5 pb-5 bg-gray-50 border border-solid border-[#61E9B1]">
            <div className="rounded-4xl pb-3 flex">
                <img src="https://cdn.pixabay.com/photo/2019/03/17/15/42/basketball-4061225_1280.png" alt="steps" className="rounded-4xl mx-auto" height={100} width={100}/>
            </div>
            <h2 className="font-semibold">{item.title}</h2>
            <p className="text-sm">Category: {item.category}</p>
            <hr className="ml-6 mr-6 mt-4 mb-4" ></hr>
            <p className="text-sm">{item.price} points</p>
            <div className="bg-gray-200 rounded-full h-1 ml-6 mr-6 mb-4 dark:bg-gray-700 mt-6">
                <div className="bg-[#61E9B1] h-1 rounded-full dark:bg-blue-500" style={{ width: `${item.progress}%` }}></div>
            </div>
            <p className="text-sm">
                
                {item.purchased ? (
                    `Purchased: ${item.date}`
                ) : (
                    ((item.price <= getUser().points) ? <div className="text-[#61E9B1]">Enough!</div>
                    : <div>Lacking points</div>)
                )}
            </p>
            <hr className="ml-6 mr-6 mt-4 mb-2" ></hr>
            <div className="flex mx-auto">
                <button onClick={buy} className="bg-[#61E9B1] border-[1px] border-[#61E9B1] hover:bg-[#4edba1] rounded-lg text-black p-3 md:m-2 md:ml-[73px] text-sm border border-solid border-[#61E9B1] flex">
                    Buy item
                </button>
            </div>
            <div className="flex mx-auto">
            <p></p>
                <Link to="/shop-item" className="bg-white border-[1px] border-[#61E9B1] hover:bg-[#4edba1] rounded-lg text-black p-3 md:m-2 md:ml-[70px] text-sm border border-solid border-[#61E9B1] flex">
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
                {userItems.map((item) => (
                        <div>
                            <div className="flex">
                                <p><i class="fa-solid fa-cart-shopping"></i></p><p className="pl-2"> <b> {item.title}</b> </p>
                                <p className="text-[#61E9B1] pl-2"> -{item.points} points</p>
                            </div>
                            <p className="pl-6">({item.date})</p>
                        </div>
                ))}
                <div className="pt-6 pb-4">
                    <Link to="/all-purchases" className="bg-[#61E9B1] border-[1px] border-[#61E9B1] hover:bg-[#4edba1] rounded-lg text-black p-3 md:m-6 md:ml-[58px] text-sm border border-solid border-[#61E9B1]">
                        View all purchases
                    </Link>
                </div>
            </div>
            <div className="border border-solid border-[#61E9B1] mr-6 mt-5 rounded-lg p-3 text-center">
                <p className="font-semibold pb-6">Shop item management</p>
                <div className="text-center mb-4">
                    <Link to="/create-shop-item" className="text-center bg-[#61E9B1] mt-12 border-[1px] border-[#61E9B1] hover:bg-[#4edba1] rounded-lg text-black p-3 md:m-6 md:ml-[25px] text-sm border border-solid border-[#61E9B1]">
                        Create a shop item
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