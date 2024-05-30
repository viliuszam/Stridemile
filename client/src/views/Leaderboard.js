import '../styles/Home.css';
import { PieChart } from '@mui/x-charts/PieChart';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { ApplyNicknameEmoji, ApplyNicknameEmojiFromUsername } from '../classes/Reward';
import { isLoggedIn } from "../classes/Auth";
import ProfileIcon from '../components/ProfileIcon';

const UpdatedNickname = ApplyNicknameEmoji()

export default () => {
  const token = localStorage.getItem('accessToken');
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3333/users/leaderboard/top10', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data)
        setLeaderboard(response.data)
      })
      .catch(error => {
        console.error('Error fetching achievements: ', error);
      });
  }, []);

  return isLoggedIn() ? (
    <div className="container bg-white pt-12">

      <div className="text-[#61E9B1]">
        <h2 className="text-center text-2xl">Leaderboard</h2>
      </div>

      <div className='mt-4 flex'>
        <div className='w-full mr-6'>

          <div className='flex bg-[#dcfaee] border-[1px] border-green-100 pt-12 pb-0 rounded-lg items-end'>
            {(() => {
              // Second place
              if (leaderboard?.users?.[1]) {
                return (
                  <div className='mx-auto'>
                    <div className='mb-3 text-center font-bold flex items-center'>
                      <Avatar sx={{ width: 32, height: 32 }} src={leaderboard.users[1].picture} /> <p className='ml-2' style={{ color: leaderboard.users[1].colour }}>{ApplyNicknameEmojiFromUsername(leaderboard.users[1].username, leaderboard.users[1].emoji)}</p>
                    </div>
                    <div className='h-24 w-20 h-10 bg-blue-500 mx-auto rounded-t-lg border-2 border-b-0 flex justify-center items-center'>
                      <p className='text-white text-2xl font-semibold'>2</p>
                    </div>
                  </div>
                )
              }
            })()}

            {(() => {
              // First place
              if (leaderboard?.users?.[0]) {
                return (
                  <div className='mx-auto justify-center'>
                    <div className='mb-3 text-center font-bold flex items-center'>
                      <Avatar sx={{ width: 32, height: 32 }} src={leaderboard.users[0].picture} /> <p className='ml-2' style={{ color: leaderboard.users[0].colour }}>{ApplyNicknameEmojiFromUsername(leaderboard.users[0].username, leaderboard.users[0].emoji)}</p>
                    </div>
                    <div className='h-36 w-20 bg-yellow-500 mx-auto rounded-t-lg border-2 border-b-0 flex justify-center items-center'>
                      <p className='text-white text-2xl font-semibold'>1</p>
                    </div>
                  </div>
                )
              }
            })()}

            {(() => {
              // Third place
              if (leaderboard?.users?.[2]) {
                return (
                  <div className='mx-auto'>
                    <div className='mb-3 text-center font-bold flex items-center'>
                      <Avatar sx={{ width: 32, height: 32 }} src={leaderboard.users[2].picture} /> <p className='ml-2' style={{ color: leaderboard.users[2].colour }}>{ApplyNicknameEmojiFromUsername(leaderboard.users[2].username, leaderboard.users[2].emoji)}</p>
                    </div>
                    <div className='h-16 w-20 bg-red-500 mx-auto rounded-t-lg border-2 border-b-0 flex justify-center items-center'>
                      <p className='text-white text-2xl font-semibold'>3</p>
                    </div>
                  </div>
                )
              }
            })()}
          </div>

          {leaderboard?.users?.map((data, i) => (
            <div key={i}>
              <div className="grid grid-cols-4 gap-4 p-4 items-center">
                <div>{i + 1}</div>
                <div className='col-span-2'>
                  <Link className='flex items-center' to={`/profile/${data.username}`}>
                    <ProfileIcon imageUrl={data.picture} username={data.username} userId={data.id} />
                    <p className='ml-3' style={{ color: data.colour }}>
                      {ApplyNicknameEmojiFromUsername(data.username, data.emoji)}
                    </p>
                  </Link>
                </div>
                <div>{data.points} pts</div>
              </div>
              <hr />
            </div>
          ))}

        </div>
        <div className='w-96 text-sm text-gray-600'>

          <div className='mb-4 p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100 text-sm text-gray-600'>
            <p className='text-black font-bold'>Your rank</p>
            <p className='mb-3 text-xs text-gray-600'>Personal statistics in leaderboard</p>
            <div className='flex my-auto place-items-center'>
              <p className='flex text-center text-gray-500 text-5xl font-bold items-center'>
                <i className="fa-solid fa-trophy text-4xl"></i> {leaderboard?.userRating}
              </p>

            </div>
          </div>

          <div className='mb-4 p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100 text-sm text-gray-600'>
            <p className='text-black font-bold'>Points</p>
            <p className='mb-3 text-xs text-gray-600'>Collected points by completing various achievements</p>
            <div className='flex my-auto place-items-center'>
              <p className='flex text-center text-gray-500 text-5xl font-bold items-center'>
                {leaderboard?.userPoints}
              </p>

            </div>
          </div>

        </div>
      </div>

    </div>
  ) : (
    <Navigate to='/login' />
  );
};
