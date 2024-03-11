import { useOutletContext, Link } from "react-router-dom";
import { useState } from 'react'
import { AlertTypes } from "../styles/modules/AlertStyles";
import '../styles/Home.css';
import axios from 'axios';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { PieChart } from '@mui/x-charts/PieChart';
import photo from '../images/404.jpg';
import anime from 'animejs/lib/anime.es.js';
import React, { useRef, useEffect } from 'react';

export default () => {
    const animationRef = React.useRef(null);
    React.useEffect(() => {
        var tl = anime.timeline({
        easing: 'linear',
        duration: 750,
        loop: true,
        direction:'alternate'
      });
      tl
      .add({
        targets: '#fly',
        translateX: 100,
      })
      .add({
        targets: '#fly',
        translateX: -100,
      });

      animationRef.current = tl
    })

  return (
    
    <div>
    <NavBar/>
    <div className="container bg-white pt-24 flex h-full">
        
        <div className="mx-auto flex" id="fly"><img src={photo} height={400} width={400} /></div>
    </div>
    <div className="container bg-white pt-8 pb-16 text-center mx-auto">
        <div className="mx-auto flex">
        <h2 className="text-4xl flex mx-auto">Page not found</h2>
        </div>
        <div className="mx-auto flex pb-6 pt-3">
        <h2 className="text-xl flex mx-auto font-medium">Looks like you have to walk a little more to unlock this page</h2>
        </div>
        <Link to="/" className="bg-[#61E9B1] border-[1px] border-[#61E9B1] hover:bg-[#4edba1] rounded-lg text-black p-3 m-2 text-sm hover:bg-white border border-solid border-[#61E9B1]">
        Back to home
        </Link>
        <div className="mx-auto flex pb-3 pt-12">
        <h2 className="text-xl flex mx-auto font-medium">Or you can also:</h2>
        </div>
        <div className="md:flex">
            <div className="ml-auto mr-auto pl-2 pr-2">
                <div className="mx-auto flex pt-3 pb-6">
                <h2 className="text-xl flex mx-auto">Search groups</h2>
                </div>
                <p className="pb-6">You can see groups that you joined, their information</p>
                <Link to="/groups" className="bg-[#61E9B1] border-[1px] border-[#61E9B1] hover:bg-[#4edba1] rounded-lg text-black p-3 m-2 text-sm hover:bg-white border border-solid border-[#61E9B1]">
                Groups
                </Link>
            </div>
            <div className="ml-auto mr-auto pl-2 pr-2">
                <div className="mx-auto flex md:pt-3 pt-12 pb-6">
                <h2 className="text-xl flex mx-auto">Find events</h2>
                </div>
                <p className="pb-6">You can see events that you can join and their information</p>
                <Link to="/events" className="bg-[#61E9B1] border-[1px] border-[#61E9B1] hover:bg-[#4edba1] rounded-lg text-black p-3 m-2 text-sm hover:bg-white border border-solid border-[#61E9B1]">
                Events
                </Link>
            </div>
            <div className="ml-auto mr-auto pl-2 pr-2">
                <div className="mx-auto flex md:pt-3 pt-12 pb-6">
                <h2 className="text-xl flex mx-auto">Reach achievements</h2>
                </div>
                <p className="pb-6">You can see personal achievements and statistics</p>
                <Link to="/achievements" className="bg-[#61E9B1] border-[1px] border-[#61E9B1] hover:bg-[#4edba1] rounded-lg text-black p-3 m-2 text-sm hover:bg-white border border-solid border-[#61E9B1]">
                Achievements
                </Link>
            </div>
            <div className="ml-auto mr-auto pl-2 pr-2">
                <div className="mx-auto flex md:pt-3 pt-12 pb-6">
                <h2 className="text-xl flex mx-auto">Learn more about us</h2>
                </div>
                <p className="pb-6">You can see main information about our system and its creators</p>
                <Link to="/aboutus" className="bg-[#61E9B1] border-[1px] border-[#61E9B1] hover:bg-[#4edba1] rounded-lg text-black p-3 m-2 text-sm hover:bg-white border border-solid border-[#61E9B1]">
                About us
                </Link>
            </div>
        </div>
    </div>
    <Footer />
    </div>
  );
};