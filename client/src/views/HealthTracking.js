import '../styles/Home.css';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useOutletContext } from "react-router-dom";
import personBody from '../images/person-body.png'

const HealthTracking = () => {
  const { setAlert } = useOutletContext();

  return (
    <div className='container'>

      <div className='mt-10 flex'>
        <div className='w-full mr-6'>

          <div className='grid grid-cols-4 gap-4'>
            
            <div className='mb-3 p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100'>
              <p className='text-black font-bold'>Sleep</p>
              <p className='mb-3 text-xs text-gray-600'>Average amount of sleep per day</p>
              <p className='flex text-center text-gray-500 text-4xl font-bold'>
                8 <span className='text-sm'>hr</span>
              </p>
            </div>

            <div className='mb-3 p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100'>
              <p className='text-black font-bold'>Calories</p>
              <p className='mb-3 text-xs text-gray-600'>Average caloric intake per day</p>
              <p className='flex text-center text-gray-500 text-4xl font-bold'>
                2000
              </p>
            </div>

            <div className='mb-3 p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100'>
              <p className='text-black font-bold leading-5'>Macroelements</p>
              <p className='mb-3 text-xs text-gray-600'>Average consumption of macroelements per day</p>
              <p className='flex text-center text-gray-500 text-4xl font-bold'>
                800 <span className='text-sm'>kCal</span>
              </p>
            </div>

            <div className='mb-3 p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100'>
              <p className='text-black font-bold'>Water</p>
              <p className='mb-3 text-xs text-gray-600'>Average water consumption per day</p>
              <p className='flex text-center text-gray-500 text-4xl font-bold'>
                15 <span className='text-sm'>L</span>
              </p>
            </div>

          </div>

          <a className='text-[#4edba1] font-bold pb-2 border-b-4 border-[#4edba1]' href="#">Statistics</a>
          <hr className='mb-3 mt-2' />

          <div className='flex mb-3 p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100'>
            <div className='mx-4'>

              <div className='mb-1 flex text-xs text-gray-400'>
                <p>Date 2024-03-06</p>
              </div>
              
              <div className='grid grid-cols-4 gap-10'>
                <div>
                  <p className='mb-1 font-bold'>Sleep</p>
                  <p className='text-sm text-gray-500'>8 hr</p>
                </div>

                <div>
                  <p className='mb-1 font-bold'>Calories</p>
                  <p className='text-sm text-gray-500'>2000</p>
                </div>

                <div>
                  <p className='mb-1 font-bold'>Macroelements</p>
                  <p className='text-sm text-gray-500'>800 kCal</p>
                </div>

                <div>
                  <p className='mb-1 font-bold'>Water</p>
                  <p className='text-sm text-gray-500'>15 L</p>
                </div>
              </div>

            </div>
            <div className='ml-auto'>
              <div className='text-red-500 hover:text-red-700 cursor-pointer'>
                <i className="fa-solid fa-trash"></i>
              </div>
            </div>
          </div>

          <div className='flex mb-3 p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100'>
            <div className='mx-4'>

              <div className='mb-1 flex text-xs text-gray-400'>
                <p>Date 2024-03-06</p>
              </div>
              
              <div className='grid grid-cols-4 gap-10'>
                <div>
                  <p className='mb-1 font-bold'>Sleep</p>
                  <p className='text-sm text-gray-500'>8 hr</p>
                </div>

                <div>
                  <p className='mb-1 font-bold'>Calories</p>
                  <p className='text-sm text-gray-500'>2000</p>
                </div>

                <div>
                  <p className='mb-1 font-bold'>Macroelements</p>
                  <p className='text-sm text-gray-500'>800 kCal</p>
                </div>

                <div>
                  <p className='mb-1 font-bold'>Water</p>
                  <p className='text-sm text-gray-500'>15 L</p>
                </div>
              </div>

            </div>
            <div className='ml-auto'>
              <div className='text-red-500 hover:text-red-700 cursor-pointer'>
                <i className="fa-solid fa-trash"></i>
              </div>
            </div>
          </div>

        </div>
        <div className='w-96 text-sm text-gray-600'>

          <p className='mb-4 text-black font-bold'>Personal health</p>
          <p className='mb-8'>Regular monitoring of weight alongside other health markers can provide valuable insights.</p>
          <div className='flex justify-center items-center'>
            <div className='mb-36 absolute mx-auto'>
              <p className='p-3 bg-white rounded-lg text-lg font-bold border-[1px] border-green-400'>
                <i className="fa-solid fa-weight-scale"></i> 76 kg
              </p>
            </div>
            <img src={personBody} className='h-[30rem] object-contain' />
          </div>

        </div>
      </div>

    </div>
  );
};

export default HealthTracking;
