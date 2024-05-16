import '../styles/Home.css';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useOutletContext } from "react-router-dom";
import personBody from '../images/person-body.png'
import { AlertTypes } from "../styles/modules/AlertStyles";
import axios from 'axios';

const HealthTracking = () => {
  const { setAlert } = useOutletContext();
  const [statisticsData, setStatisticsData] = useState([]);
  const [formData, setFormData] = useState({
    sleep: '',
    calories: '',
    macroelements: '',
    water: '',
    weight: '',
    userId: -1
  });

  const calculateAverages = () => {
    let totalSleep = 0;
    let totalCalories = 0;
    let totalMacroelements = 0;
    let totalWater = 0;
    let count = 0;
  
    statisticsData.forEach(statistic => {
      totalSleep += parseFloat(statistic.sleep_duration);
      totalCalories += parseFloat(statistic.calories_intake);
      totalMacroelements += parseFloat(statistic.macroelements_intake);
      totalWater += parseFloat(statistic.water_intake);
      count++;
    });
  
    const averageSleep = totalSleep / count;
    const averageCalories = totalCalories / count;
    const averageMacroelements = totalMacroelements / count;
    const averageWater = totalWater / count;
  
    return {
      averageSleep,
      averageCalories,
      averageMacroelements,
      averageWater
    };
  };

  const averages = calculateAverages();

  const validate = () => {
    if (!formData.sleep || !formData.calories || !formData.macroelements || !formData.water || !formData.weight) {
      setAlert({ text: 'There are empty fields', type: AlertTypes.warning });
      return false;
    }
  
    if (isNaN(formData.sleep) || isNaN(formData.calories) || isNaN(formData.macroelements) || isNaN(formData.water) || isNaN(formData.weight)) {
      setAlert({ text: 'One or more fields contain non-numeric values', type: AlertTypes.warning });
      return false;
    }
  
    return true;
  };
  

  useEffect(() => {
    const fetchStatisticsData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          return;
        }
        
        const response = await axios.get('http://localhost:3333/health-tracking/getStats', {
          headers: {
              Authorization: `Bearer ${accessToken}`
          }
      })
        setStatisticsData(response.data);

        if (response.data.length > 0) {
          const latestRecord = response.data[response.data.length - 1];
          setFormData(prevState => ({
            ...prevState,
            weight: latestRecord.weight
          }));
        }

      } catch (error) {
        console.error('Error fetching statistics data:', error);
      }
    };

    fetchStatisticsData();
  }, []);

  const createStatistics = (e) => {

    if (!validate())  {  e.preventDefault(); return } ;

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    }

    const requestData = {
      ...formData,
      weight: parseFloat(formData.weight) // Assuming weight is numeric
    };

    axios.post('http://localhost:3333/health-tracking/createStats', formData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      console.log(response);
      setAlert({ text: 'Statistics record created successfully', type: AlertTypes.success });
    })
    .catch(function (error) {
      console.error(error);
      setAlert({ text: 'Error creating statistics record', type: AlertTypes.error });
    });
  };

    const handleDelete = async (id) => {
      try {

        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          return;
        }

        await axios.delete(`http://localhost:3333/health-tracking/deleteStats/${id}`, {
          headers: {
              Authorization: `Bearer ${accessToken}`
          }
        })
        setStatisticsData(statisticsData.filter(statistic => statistic.id !== id));
      } catch (error) {
        console.error('Error deleting statistics record:', error);
      }
    };

  return (
    <div className='container'>

      <div className='mt-10 flex'>
        <div className='w-full mr-6'>

          <div className='grid grid-cols-4 gap-4'>
            
            <div className='mb-3 p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100'>
              <p className='text-black font-bold'>Sleep</p>
              <p className='mb-3 text-xs text-gray-600'>Average amount of sleep per day</p>
              <p className='flex text-center text-gray-500 text-4xl font-bold'>
                {averages.averageSleep.toFixed(2)} <span className='text-sm'>hr</span>
              </p>
            </div>

            <div className='mb-3 p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100'>
              <p className='text-black font-bold'>Calories</p>
              <p className='mb-3 text-xs text-gray-600'>Average caloric intake per day</p>
              <p className='flex text-center text-gray-500 text-4xl font-bold'>
                {averages.averageCalories.toFixed(2)}
              </p>
            </div>

            <div className='mb-3 p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100'>
              <p className='text-black font-bold leading-5'>Macroelements</p>
              <p className='mb-3 text-xs text-gray-600'>Average consumption of macroelements per day</p>
              <p className='flex text-center text-gray-500 text-4xl font-bold'>
                {averages.averageMacroelements.toFixed(2)} <span className='text-sm'>kCal</span>
              </p>
            </div>


            <div className='mb-3 p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100'>
              <p className='text-black font-bold'>Water</p>
              <p className='mb-3 text-xs text-gray-600'>Average water consumption per day</p>
              <p className='flex text-center text-gray-500 text-4xl font-bold'>
                {averages.averageWater.toFixed(2)} <span className='text-sm'>L</span>
              </p>
            </div>
          </div>        

          <a className='text-[#4edba1] font-bold pb-2 border-b-4 border-[#4edba1]' href="#">Statistics</a>
          <hr className='mb-3 mt-2' />

          <div>
            {statisticsData.map(statistic => (
              <div key={statistic.id} className='mb-3 p-4 bg-gray-50 rounded-xl border-[1px] border-gray-100'>
                <div className='mx-4'>
                  <div className='mb-1 flex text-xs text-gray-400'>
                    <p>Date {new Date(statistic.date).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex-1">
                      <p className='mb-1 font-bold'>Sleep</p>
                      <p className='text-sm text-gray-500'>{statistic.sleep_duration} hr</p>
                    </div>
                    <div className="flex-1">
                      <p className='mb-1 font-bold'>Calories</p>
                      <p className='text-sm text-gray-500'>{statistic.calories_intake}</p>
                    </div>
                    <div className="flex-1">
                      <p className='mb-1 font-bold'>Macroelements</p>
                      <p className='text-sm text-gray-500'>{statistic.macroelements_intake} kCal</p>
                    </div>
                    <div className="flex-1">
                      <p className='mb-1 font-bold'>Water</p>
                      <p className='text-sm text-gray-500'>{statistic.water_intake} L</p>
                    </div>
                  </div>
                </div>
                <div className='ml-auto'>
                  <div className='text-red-500 hover:text-red-700 cursor-pointer' onClick={() => handleDelete(statistic.id)}>
                    <i className="fa-solid fa-trash"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
        <div className='w-96 text-sm text-gray-600'>

          <p className='mb-4 text-black font-bold'>Personal health</p>
          <p className='mb-8'>Regular monitoring of weight alongside other health markers can provide valuable insights.</p>

          <div className='flex justify-center items-center'>
            <div className='mb-36 absolute mx-auto'>
              <p className='p-3 bg-white rounded-lg text-lg font-bold border-[1px] border-green-400'>
                <i className="fa-solid fa-weight-scale"></i> 
                <input
                  type='text'
                  name='weight'
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })} 
                  className='text-lg font-bold border-none outline-none bg-transparent'
                  style={{ width: '30px' }}
                /> kg
              </p>
            </div>
            <img src={personBody} className='h-[30rem] object-contain' />
          </div>
          
        </div>
      </div>

      
      <form onSubmit={createStatistics}>
        <div className='grid grid-cols-4 gap-4 mt-4'>
          <div className='mb-3 p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100'>
            <p className='text-black font-bold'>Sleep</p>
            <input
              type='text'
              name='sleep'
              value={formData.sleep}
              onChange={(e) => setFormData({ ...formData, sleep: e.target.value })} 
              placeholder="Hours of sleep" 
              className='mt-2 p-3 bg-white rounded-lg text-sm font-bold border-[1px] border-gray-400 text-gray-500 font-bold'
            />
          </div>

          <div className='mb-3 p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100'>
            <p className='text-black font-bold'>Calories</p>
            <input
              type='text'
              name='calories'
              value={formData.calories}
              onChange={(e) => setFormData({ ...formData, calories: e.target.value })} 
              placeholder="Calories burned" 
              className='mt-2 p-3 bg-white rounded-lg text-sm font-bold border-[1px] border-gray-400 text-gray-500 font-bold'
            />
          </div>

          <div className='mb-3 p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100'>
            <p className='text-black font-bold'>Macroelements</p>
            <input
              type='text'
              name='macroelements'
              value={formData.macroelements}
              onChange={(e) => setFormData({ ...formData, macroelements: e.target.value })} 
              placeholder="kCal consumed"
              className='mt-2 p-3 bg-white rounded-lg text-sm font-bold border-[1px] border-gray-400 text-gray-500 font-bold'
            />
          </div>

          <div className='mb-3 p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100'>
            <p className='text-black font-bold'>Water</p>
            <input
              type='text'
              name='water'
              value={formData.water}
              onChange={(e) => setFormData({ ...formData, water: e.target.value })} 
              placeholder="Water liters consumed"
              className='mt-2 p-3 bg-white rounded-lg text-sm font-bold border-[1px] border-gray-400 text-gray-500 font-bold'
            />
          </div>
        </div>

        <button type='submit' className='bg-[#61E9B1] border-[1px] border-[#61E9B1] hover:bg-[#4edba1] rounded-lg text-black p-3 text-sm border border-solid border-[#61E9B1] block w-full mb-3 p-3 text-center border-[1px] rounded-lg'>
        <i class="fa-solid fa-notes-medical"></i> Submit
        </button>
      </form>

    </div>
  );
};

export default HealthTracking;
