import { useOutletContext, Link, Navigate } from "react-router-dom";
import { useState } from 'react'
import { AlertTypes } from "../styles/modules/AlertStyles";
import '../styles/Home.css';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';
import { isLoggedIn } from "../classes/Auth";
import Footer from "../components/Footer";

export default () => {

    const [groupName, setGroupName] = useState('')

  return !isLoggedIn() ? (
    <div>
    <div className="container bg-white pt-12 pb-8">
        <div className="text-[#61E9B1]">
            <h2 className="text-center text-2xl">Groups</h2>
        </div>
        <div className="mt-4 mb-4 mr-6 text-left ml-6">
            <p className="text-xl flex mx-auto font-semibold">My groups</p>
        </div>
        <div className="flex">
        <div className="w-full grid md:grid-cols-4 md:gap-4 sm:grid-cols-2 sm:gap-4 pl-5 pr-5">
            <div className="bg-white rounded-xl mt-3 text-center pt-5 pb-5 bg-gray-50 border border-solid border-[#61E9B1]">
                <div className="rounded-4xl pb-3 flex">
                    <img src="https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/exercise-circle-blue-512.png" alt="steps" className="rounded-4xl mx-auto" height={100} width={100}/>
                </div>
                <h2 className="font-semibold">Running motivation</h2>
                <hr className="ml-6 mr-6 mt-4 mb-4" ></hr>
                <p className="text-sm">Public group</p>
                <p className="text-sm">13 members</p>
                <hr className="ml-6 mr-6 mt-4 mb-6" ></hr>
                <Link to="/aboutus" className="bg-[#61E9B1] hover:bg-[#4edba1] rounded-lg text-black p-3 m-2 text-sm border border-solid border-[#61E9B1]">
                More information
                </Link>
                <p className="pb-3"></p>
            </div>
            <div className="bg-white rounded-xl mt-3 text-center pt-5 pb-5 bg-gray-50 border border-solid border-[#61E9B1]">
                <div className="rounded-4xl pb-3 flex">
                    <img src="https://cdn-icons-png.flaticon.com/512/472/472529.png" alt="steps" className="rounded-4xl mx-auto" height={100} width={100}/>
                </div>
                <h2 className="font-semibold">Sleeping brothers</h2>
                <hr className="ml-6 mr-6 mt-4 mb-4" ></hr>
                <p className="text-sm">Public group</p>
                <p className="text-sm">170 members</p>
                <hr className="ml-6 mr-6 mt-4 mb-6" ></hr>
                <Link to="/aboutus" className="bg-[#61E9B1] hover:bg-[#4edba1] rounded-lg text-black p-3 m-2 text-sm border border-solid border-[#61E9B1]">
                More information
                </Link>
                <p className="pb-3"></p>
            </div>
            <div className="bg-white rounded-xl mt-3 text-center pt-5 pb-5 bg-gray-50 border border-solid border-[#61E9B1]">
                <div className="rounded-4xl pb-3 flex">
                    <img src="https://www.shareicon.net/data/512x512/2015/10/07/113683_running_512x512.png" alt="steps" className="rounded-4xl mx-auto" height={100} width={100}/>
                </div>
                <h2 className="font-semibold">Walking the world</h2>
                <hr className="ml-6 mr-6 mt-4 mb-4" ></hr>
                <p className="text-sm">Public group</p>
                <p className="text-sm">82 members</p>
                <hr className="ml-6 mr-6 mt-4 mb-6" ></hr>
                <Link to="/aboutus" className="bg-[#61E9B1] hover:bg-[#4edba1] rounded-lg text-black p-3 m-2 text-sm border border-solid border-[#61E9B1]">
                More information
                </Link>
                <p className="pb-3"></p>
            </div>
            <div className="bg-white rounded-xl mt-3 text-center pt-5 pb-5 bg-gray-50 border border-solid border-[#61E9B1]">
                <div className="rounded-4xl pb-3 flex">
                    <img src="https://cdn.pixabay.com/photo/2016/08/25/07/30/orange-1618917_640.png" alt="steps" className="rounded-4xl mx-auto" height={100} width={100}/>
                </div>
                <h2 className="font-semibold">Motivation club</h2>
                <hr className="ml-6 mr-6 mt-4 mb-4" ></hr>
                <p className="text-sm">Private group</p>
                <p className="text-sm">5 members</p>
                <hr className="ml-6 mr-6 mt-4 mb-6" ></hr>
                <Link to="/aboutus" className="mb-12 bg-[#61E9B1] hover:bg-[#4edba1] rounded-lg text-black p-3 m-2 text-sm border border-solid border-[#61E9B1]">
                More information
                </Link>
                <p className="pb-3"></p>
            </div>

        </div>
        
        </div>
        <div className="flex mt-2">
            <div className="mt-8 mb-3 mr-6 text-left ml-6">
                <p className="text-xl flex mx-auto font-semibold">Public groups</p>
            </div>
            <div className="ml-auto mt-4 sm:flex mr-6">
                <input value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="Type group's name" type="text" className="pl-2 rounded-lg bg-gray-50 border border-solid border-[#61E9B1] mr-2 h-12 mt-2" />
                
                <button className="w-full mb-3 p-3 mt-2 bg-[#61E9B1] border-[1px] border-[#61E9B1] rounded-lg hover:bg-[#4edba1]">
                    <i class="fa-solid fa-magnifying-glass"></i> Search
                </button>
            </div>
        </div>
        <div className="flex">
        <div className="w-full grid md:grid-cols-4 md:gap-4 sm:grid-cols-2 sm:gap-4 pl-5 pr-5">
            <div className="bg-white rounded-xl mt-3 text-center pt-5 pb-5 bg-gray-50 border border-solid border-[#61E9B1]">
                <div className="rounded-4xl pb-3 flex">
                    <img src="https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/exercise-circle-blue-512.png" alt="steps" className="rounded-4xl mx-auto" height={100} width={100}/>
                </div>
                <h2 className="font-semibold">Running motivation</h2>
                <hr className="ml-6 mr-6 mt-4 mb-4" ></hr>
                <p className="text-sm">Mentor: Agnė</p>
                <p className="text-sm">13 members</p>
                <hr className="ml-6 mr-6 mt-4 mb-6" ></hr>
                <Link to="/aboutus" className="bg-[#61E9B1] hover:bg-[#4edba1] rounded-lg text-black p-3 m-2 text-sm border border-solid border-[#61E9B1]">
                More information
                </Link>
                <p className="pb-3"></p>
            </div>
            <div className="bg-white rounded-xl mt-3 text-center pt-5 pb-5 bg-gray-50 border border-solid border-[#61E9B1]">
                <div className="rounded-4xl pb-3 flex">
                    <img src="https://cdn-icons-png.flaticon.com/512/472/472529.png" alt="steps" className="rounded-4xl mx-auto" height={100} width={100}/>
                </div>
                <h2 className="font-semibold">Sleeping brothers</h2>
                <hr className="ml-6 mr-6 mt-4 mb-4" ></hr>
                <p className="text-sm">Mentor: Tautvydas</p>
                <p className="text-sm">170 members</p>
                <hr className="ml-6 mr-6 mt-4 mb-6" ></hr>
                <Link to="/aboutus" className="bg-[#61E9B1] hover:bg-[#4edba1] rounded-lg text-black p-3 m-2 text-sm border border-solid border-[#61E9B1]">
                More information
                </Link>
                <p className="pb-3"></p>
            </div>
            <div className="bg-white rounded-xl mt-3 text-center pt-5 pb-5 bg-gray-50 border border-solid border-[#61E9B1]">
                <div className="rounded-4xl pb-3 flex">
                    <img src="https://www.shareicon.net/data/512x512/2015/10/07/113683_running_512x512.png" alt="steps" className="rounded-4xl mx-auto" height={100} width={100}/>
                </div>
                <h2 className="font-semibold">Walking the world</h2>
                <hr className="ml-6 mr-6 mt-4 mb-4" ></hr>
                <p className="text-sm">Mentor: Saulius</p>
                <p className="text-sm">82 members</p>
                <hr className="ml-6 mr-6 mt-4 mb-6" ></hr>
                <Link to="/aboutus" className="bg-[#61E9B1] hover:bg-[#4edba1] rounded-lg text-black p-3 m-2 text-sm border border-solid border-[#61E9B1]">
                More information
                </Link>
                <p className="pb-3"></p>
            </div>
            <div className="bg-white rounded-xl mt-3 text-center pt-5 pb-5 bg-gray-50 border border-solid border-[#61E9B1]">
                <div className="rounded-4xl pb-3 flex">
                    <img src="https://static.vecteezy.com/system/resources/previews/024/382/877/non_2x/round-circle-logo-icon-no-sign-symbol-red-design-transparent-background-free-png.png" alt="steps" className="rounded-4xl mx-auto" height={100} width={100}/>
                </div>
                <h2 className="font-semibold">Gym lovers</h2>
                <hr className="ml-6 mr-6 mt-4 mb-4" ></hr>
                <p className="text-sm">Mentor: Paulius</p>
                <p className="text-sm">15 members</p>
                <hr className="ml-6 mr-6 mt-4 mb-6" ></hr>
                <Link to="/aboutus" className="mb-12 bg-[#61E9B1] hover:bg-[#4edba1] rounded-lg text-black p-3 m-2 text-sm border border-solid border-[#61E9B1]">
                More information
                </Link>
                <p className="pb-3"></p>
            </div>
            <div className="bg-white rounded-xl mt-3 text-center pt-5 pb-5 bg-gray-50 border border-solid border-[#61E9B1]">
                <div className="rounded-4xl pb-3 flex">
                    <img src="https://i.pinimg.com/originals/8b/fe/d7/8bfed7310b382146b2ace17e35d7636b.png" alt="steps" className="rounded-4xl mx-auto" height={100} width={100}/>
                </div>
                <h2 className="font-semibold">Swimming club</h2>
                <hr className="ml-6 mr-6 mt-4 mb-4" ></hr>
                <p className="text-sm">Mentor: Romualdas</p>
                <p className="text-sm">58 members</p>
                <hr className="ml-6 mr-6 mt-4 mb-6" ></hr>
                <Link to="/aboutus" className="mb-12 bg-[#61E9B1] hover:bg-[#4edba1] rounded-lg text-black p-3 m-2 text-sm border border-solid border-[#61E9B1]">
                More information
                </Link>
                <p className="pb-3"></p>
            </div>
        </div>
        </div>
    </div>
    </div>
  ) : (
    <Navigate to='/login' />
  );
};