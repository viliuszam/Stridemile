import { useOutletContext, Link, Navigate } from "react-router-dom";
import { useState } from 'react'
import { AlertTypes } from "../styles/modules/AlertStyles";
import '../styles/Home.css';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';
import { isLoggedIn } from "../classes/Auth";

export default () => {

  return isLoggedIn() ? (
    <div>
    <div className="container bg-white pt-12">
        <div className="text-[#61E9B1]">
            <h2 className="text-center text-2xl">Achievements</h2>
        </div>
        <div className="mt-4 mb-4 mr-6 text-right">
            <p>Completed achievements score: 9/13</p>
        </div>
        <div className="flex">
        <div className="w-full grid grid-cols-3 gap-4 pl-5 pr-5">
            <div className="bg-white rounded-xl mt-3 text-center pt-5 pb-5 bg-gray-50 border border-solid border-[#61E9B1] hover:bg-gray-200">
                <div className="rounded-4xl pb-3 flex">
                    <img src="https://cdn1.iconfinder.com/data/icons/ui-roundicons/480/circle_award-512.png" alt="steps" className="rounded-4xl mx-auto" height={100} width={100}/>
                </div>
                <h2 className="font-semibold">Huge walker</h2>
                <p className="text-sm">Walk more than 20,000 steps in 3 days.</p>
                <div className="bg-gray-200 rounded-full h-1 ml-6 mr-6 mb-4 dark:bg-gray-700 mt-6">
                    <div className="bg-[#61E9B1] h-1 rounded-full dark:bg-blue-500" style={{ width: "100%" }}></div>
                </div>
                <div className="text-[#61E9B1]">100%</div>
                <hr className="ml-6 mr-6 mt-4 mb-4" ></hr>
                <p className="text-sm">Achieved: 2024-02-01</p>
            </div>
            <div className="bg-white rounded-xl mt-3 text-center pt-5 pb-5 bg-gray-50 border border-solid border-[#61E9B1] hover:bg-gray-200">
                <div className="rounded-4xl pb-3 flex">
                    <img src="https://cdn1.iconfinder.com/data/icons/ui-roundicons/480/circle_award-512.png" alt="steps" className="rounded-4xl mx-auto" height={100} width={100}/>
                </div>
                <h2 className="font-semibold">Event Participant</h2>
                <p className="text-sm">Take part in 5 different events of all time</p>
                <p></p>
                <div className="bg-gray-200 rounded-full h-1 ml-6 mr-6 mb-4 dark:bg-gray-700 mt-6">
                    <div className="bg-[#61E9B1] h-1 rounded-full dark:bg-blue-500" style={{ width: "80%" }}></div>
                </div>
                <div className="text-[#61E9B1]">80%</div>
                <hr className="ml-6 mr-6 mt-4 mb-4" ></hr>
                <p className="text-sm">In progress...</p>
            </div>
            <div className="bg-white rounded-xl mt-3 text-center pt-5 pb-5 bg-gray-50 border border-solid border-[#61E9B1] hover:bg-gray-200">
                <div className="rounded-4xl pb-3 flex">
                    <img src="https://cdn1.iconfinder.com/data/icons/ui-roundicons/480/circle_award-512.png" alt="steps" className="rounded-4xl mx-auto" height={100} width={100}/>
                </div>
                <h2 className="font-semibold">Great Sleeper</h2>
                <p className="text-sm">Sleep at least 8 hours a day for a week.</p>
                <p></p>
                <div className="bg-gray-200 rounded-full h-1 ml-6 mr-6 mb-4 dark:bg-gray-700 mt-6">
                    <div className="bg-[#61E9B1] h-1 rounded-full dark:bg-blue-500" style={{ width: "100%" }}></div>
                </div>
                <div className="text-[#61E9B1]">100%</div>
                <hr className="ml-6 mr-6 mt-4 mb-4" ></hr>
                <p className="text-sm">Achieved: 2024-02-09</p>
            </div>
            <div className="bg-white rounded-xl mt-3 text-center pt-5 pb-5 bg-gray-50 border border-solid border-[#61E9B1] hover:bg-gray-200">
                <div className="rounded-4xl pb-3 flex">
                    <img src="https://cdn1.iconfinder.com/data/icons/ui-roundicons/480/circle_award-512.png" alt="steps" className="rounded-4xl mx-auto" height={100} width={100}/>
                </div>
                <h2 className="font-semibold">Relaxed Guy</h2>
                <p className="text-sm">Keep your stress levels low 3 days in a row</p>
                <p></p>
                <div className="bg-gray-200 rounded-full h-1 ml-6 mr-6 mb-4 dark:bg-gray-700 mt-6">
                    <div className="bg-[#61E9B1] h-1 rounded-full dark:bg-blue-500" style={{ width: "100%" }}></div>
                </div>
                <div className="text-[#61E9B1]">100%</div>
                <hr className="ml-6 mr-6 mt-4 mb-4" ></hr>
                <p className="text-sm">Achieved: 2024-02-29</p>
            </div>
            <div className="bg-white rounded-xl mt-3 text-center pt-5 pb-5 bg-gray-50 border border-solid border-[#61E9B1] hover:bg-gray-200">
                <div className="rounded-4xl pb-3 flex">
                    <img src="https://cdn1.iconfinder.com/data/icons/ui-roundicons/480/circle_award-512.png" alt="steps" className="rounded-4xl mx-auto" height={100} width={100}/>
                </div>
                <h2 className="font-semibold">Decent drinker</h2>
                <p className="text-sm">Drink 5 litres of water 3 days in a row</p>
                <p></p>
                <div className="bg-gray-200 rounded-full h-1 ml-6 mr-6 mb-4 dark:bg-gray-700 mt-6">
                    <div className="bg-[#61E9B1] h-1 rounded-full dark:bg-blue-500" style={{ width: "62%" }}></div>
                </div>
                <div className="text-[#61E9B1]">62%</div>
                <hr className="ml-6 mr-6 mt-4 mb-4" ></hr>
                <p className="text-sm">In progress...</p>
            </div>
        </div>
        <div className="bg-gray-50 w-72 rounded-xl mt-3 p-4 mr-6">
            <div className="text-black text-center font-semibold pb-5">
                 Progress chart
            </div>
            <PieChart
            series={[
                {
                    data: [
                        { id: 0, value: 9, color: '#61E9B1' },
                        { id: 1, value: 4, color: '#f9fafb' },
                    ],
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
                69%
            </div>
            <div className="text-black text-center font-semibold pb-5 pt-6">
                 Points earned
            </div>
            <div>
                <div className="flex">
                <p><i className="fa-solid fa-bell"></i></p><p className="pl-2"> <b> Huge Walker</b> </p>
                <p className="text-[#61E9B1] pl-2"> +1 point</p>
                </div>
                <p className="pl-5"> (2024-02-01)</p>
            </div>
            <div>
                <div className="flex">
                <p><i className="fa-solid fa-bell"></i></p><p className="pl-2"> <b> Great Sleeper</b> </p>
                <p className="text-[#61E9B1] pl-2"> +1 point</p>
                </div>
                <p className="pl-5"> (2024-02-09)</p>
            </div>
            <div>
                <div className="flex">
                <p><i className="fa-solid fa-bell"></i></p><p className="pl-2"> <b> Relaxed Guy</b> </p>
                <p className="text-[#61E9B1] pl-2"> +1 point</p>
                </div>
                <p className="pl-5"> (2024-02-29)</p>
            </div>
        </div>
        </div>
    </div>
    </div>
  ) : (
    <Navigate to='/login' />
  );
};