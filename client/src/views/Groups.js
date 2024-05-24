import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { isLoggedIn } from '../classes/Auth';
import GroupCard from '../components/group/GroupCard';

const Home = () => {
  const [publicGroups, setPublicGroups] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [publicGroupName, setPublicGroupName] = useState('');
  const [userGroupName, setUserGroupName] = useState('');
  const [filteredPublicGroups, setFilteredPublicGroups] = useState([]);
  const [filteredUserGroups, setFilteredUserGroups] = useState([]);

  useEffect(() => {
    fetchPublicGroups();
    fetchUserGroups();
  }, []);

  useEffect(() => {
    if (!publicGroupName) {
      setFilteredPublicGroups(publicGroups);
      return;
    }

    const filteredGroups = publicGroups.filter((group) =>
      group.name.toLowerCase().includes(publicGroupName.toLowerCase())
    );
    setFilteredPublicGroups(filteredGroups);
  }, [publicGroupName, publicGroups]);

  useEffect(() => {
    if (!userGroupName) {
      setFilteredUserGroups(userGroups);
      return;
    }

    const filteredGroups = userGroups.filter((group) =>
      group.name.toLowerCase().includes(userGroupName.toLowerCase())
    );
    setFilteredUserGroups(filteredGroups);
  }, [userGroupName, userGroups]);

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
      // Not logged in
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
      {isLoggedIn() && (
        <div className="container bg-white pt-12 pb-8">
          <div className="text-[#61E9B1]">
            <h2 className="text-center text-2xl">Groups</h2>
          </div>

          <div className="flex mt-2">
            <div className="mt-8 mb-3 mr-6 text-left ml-6">
              <p className="text-xl flex mx-auto font-semibold">My groups</p>
            </div>
            <div className="ml-auto mt-4 sm:flex mr-6">
              <Link to="/create-group" className="w-full mb-3 p-3 mt-2 bg-[#61E9B1] border-[1px] border-[#61E9B1] rounded-lg hover:bg-[#4edba1] mr-2 whitespace-nowrap">Create group</Link>
              <input value={userGroupName} onChange={(e) => setUserGroupName(e.target.value)} placeholder="Type group's name" type="text" className="pl-2 rounded-lg bg-gray-50 border border-solid border-[#61E9B1] mr-2 h-12 mt-2" />
              <button className="w-full mb-3 p-3 mt-2 bg-[#61E9B1] border-[1px] border-[#61E9B1] rounded-lg hover:bg-[#4edba1]">
                <i className="fa-solid fa-magnifying-glass"></i> Search
              </button>
            </div>
          </div>

          <div className="flex">
            <div className="w-full grid md:grid-cols-4 md:gap-4 sm:grid-cols-2 sm:gap-4 pl-5 pr-5">
              {filteredUserGroups.length === 0 ? (
                <p className='text-black pl-1.5'>No groups found.</p>
              ) : (
                filteredUserGroups.map((group) => (
                  <GroupCard
                    key={group.id}
                    id={group.id}
                    name={group.name}
                    imageUrl={group.image_url}
                    visibility={group.visibility}
                    mentor={group.mentor.username}
                    membersCount={group.groupMembers.length}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex mt-2">
        <div className="mt-8 mb-3 mr-6 text-left ml-6">
          <p className="text-xl flex mx-auto font-semibold">Public groups</p>
        </div>
        <div className="ml-auto mt-4 sm:flex mr-6">
          <input value={publicGroupName} onChange={(e) => setPublicGroupName(e.target.value)} placeholder="Type group's name" type="text" className="pl-2 rounded-lg bg-gray-50 border border-solid border-[#61E9B1] mr-2 h-12 mt-2" />
          <button className="w-full mb-3 p-3 mt-2 bg-[#61E9B1] border-[1px] border-[#61E9B1] rounded-lg hover:bg-[#4edba1]">
            <i className="fa-solid fa-magnifying-glass"></i> Search
          </button>
        </div>
      </div>

      <div className="flex">
        <div className="w-full grid md:grid-cols-4 md:gap-4 sm:grid-cols-2 sm:gap-4 pl-5 pr-5">
          {filteredPublicGroups.length === 0 ? (
            <p className='text-black pl-1.5'>No groups found.</p>
          ) : (
            filteredPublicGroups.map((group) => (
              <GroupCard
                key={group.id}
                id={group.id}
                name={group.name}
                imageUrl={group.image_url}
                visibility={group.visibility}
                mentor={group.mentor.username}
                membersCount={group.groupMembers.length}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
