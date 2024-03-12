import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { isLoggedIn } from '../classes/Auth';
import Footer from '../components/Footer';

const Home = () => {
  const [publicGroups, setPublicGroups] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    fetchPublicGroups();
    fetchUserGroups();
  }, []);

  const fetchPublicGroups = async () => {
    try {
      const response = await axios.get('http://localhost:3333/groups/publicGroups');
      setPublicGroups(response.data);
    } catch (error) {
      console.error('Error fetching public groups:', error);
    }
  };

  const fetchUserGroups = async () => {

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      // neprisilogines
      return;
    }

    try {
      const response = await axios.get('http://localhost:3333/groups/userGroups', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUserGroups(response.data);
    } catch (error) {
      console.error('Error fetching user groups:', error);
    }
  };

  return (
    <div>
      {isLoggedIn() ? (
        <div className="container bg-white pt-12 pb-8">
          <div className="text-[#61E9B1]">
            <h2 className="text-center text-2xl">Groups</h2>
          </div>

          <div className="mt-4 mb-4 mr-6 text-left ml-6">
            <p className="text-xl flex mx-auto font-semibold">My groups</p>
          </div>
          <div className="flex">
            <div className="w-full grid md:grid-cols-4 md:gap-4 sm:grid-cols-2 sm:gap-4 pl-5 pr-5">
              {userGroups.map((group) => (
                <div key={group.id} className="bg-white rounded-xl mt-3 text-center pt-5 pb-5 bg-gray-50 border border-solid border-[#61E9B1]">
                  <div className="rounded-4xl pb-3 flex">
                    <img src={group.image} alt="Group" className="rounded-4xl mx-auto" height={100} width={100} />
                  </div>
                  <h2 className="font-semibold">{group.name}</h2>
                  <hr className="ml-6 mr-6 mt-4 mb-4" />
                  <p className="text-sm">{group.visibility}</p>
                  <p className="text-sm">{group.members} members</p>
                  <hr className="ml-6 mr-6 mt-4 mb-6" />
                  <Link to={`/group/${group.id}`} className="bg-[#61E9B1] hover:bg-[#4edba1] rounded-lg text-black p-3 m-2 text-sm border border-solid border-[#61E9B1]">
                    More information
                  </Link>
                  <p className="pb-3"></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {}
      <div className="flex mt-2">
        <div className="mt-8 mb-3 mr-6 text-left ml-6">
          <p className="text-xl flex mx-auto font-semibold">Public groups</p>
        </div>
        <div className="ml-auto mt-4 sm:flex mr-6">
          <input value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="Type group's name" type="text" className="pl-2 rounded-lg bg-gray-50 border border-solid border-[#61E9B1] mr-2 h-12 mt-2" />
          <button className="w-full mb-3 p-3 mt-2 bg-[#61E9B1] border-[1px] border-[#61E9B1] rounded-lg hover:bg-[#4edba1]">
            <i className="fa-solid fa-magnifying-glass"></i> Search
          </button>
        </div>
      </div>

      <div className="flex">
          <div className="w-full grid md:grid-cols-4 md:gap-4 sm:grid-cols-2 sm:gap-4 pl-5 pr-5">
            {publicGroups.map((group) => (
              <div key={group.id} className="bg-white rounded-xl mt-3 text-center pt-5 pb-5 bg-gray-50 border border-solid border-[#61E9B1]">
                <div className="rounded-4xl pb-3 flex">
                  <img src={group.image} alt="Group" className="rounded-4xl mx-auto" height={100} width={100} />
                </div>
                <h2 className="font-semibold">{group.name}</h2>
                <hr className="ml-6 mr-6 mt-4 mb-4" />
                <p className="text-sm">{group.visibility}</p>
                <p className="text-sm">{group.members} members</p>
                <hr className="ml-6 mr-6 mt-4 mb-6" />
                <Link to={`/group/${group.id}`} className="bg-[#61E9B1] hover:bg-[#4edba1] rounded-lg text-black p-3 m-2 text-sm border border-solid border-[#61E9B1]">
                  More information
                </Link>
                <p className="pb-3"></p>
              </div>
            ))}
            </div>
        </div>
    </div>

  );
};

export default Home;
