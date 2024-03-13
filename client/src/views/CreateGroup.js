import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from 'react'
import { AlertTypes } from "../styles/modules/AlertStyles";
import axios from 'axios';
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

export default () => {
  const { setAlert } = useOutletContext();

  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  //const [mentorId, setMentorId] = useState('');
  const [visibilityOptions, setVisibilityOptions] = useState([]);
  const [selectedVisibility, setSelectedVisibility] = useState('');

  useEffect(() => {
    // Fetch visibility options from the server
    axios.get('http://localhost:3333/visibility-options')
      .then(response => {
        setVisibilityOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching visibility options:', error);
      });
  }, []);

  const validate = () => {
    if (!groupName || !groupDescription || !selectedVisibility) {
      setAlert({ text: 'There are empty fields', type: AlertTypes.warning });
      return false;
    }
    return true;
  }

  const createGroup = () => {
    if (!validate()) return;
  
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      // neprisilogines
      return;
    }
  
    axios.post('http://localhost:3333/groups/createGroup', {
      name: groupName,
      description: groupDescription,
      mentorId: parseInt(-1),
      visibilityId: parseInt(selectedVisibility),
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(function (response) {
      console.log(response);
      setAlert({ text: 'Group created successfully', type: AlertTypes.success });
    })
    .catch(function (error) {
      console.error(error);
      setAlert({ text: 'Error creating group', type: AlertTypes.error });
    });
  }

  return (
    <div className="w-full">
   
    <div className="container sm:flex pt-12 pb-12">
      <div className="w-3/6 sm:mx-8 mx-auto">
        <h1 className="text-2xl text-center font-medium">Create a group</h1>
        <hr className="my-6" />

        <div className="mb-3">
          <div className="text-base mb-2">Group name</div>
          <input value={groupName} onChange={(e) => setGroupName(e.target.value)} type="text" placeholder="Group name" className="w-full p-3 border-[1px] border-gray-400 rounded-lg" />
        </div>

        <div className="mb-3">
          <div className="text-base mb-2">Description</div>
          <input value={groupDescription} onChange={(e) => setGroupDescription(e.target.value)} type="text" placeholder="Description" className="w-full p-3 border-[1px] border-gray-400 rounded-lg" />
        </div>

        <div className="mb-3">
          <div className="text-base mb-2">Visibility</div>
          <select value={selectedVisibility} onChange={(e) => setSelectedVisibility(e.target.value)} className="w-full p-3 border-[1px] border-gray-400 rounded-lg bg-white">
            <option value="">Select visibility</option>
            {visibilityOptions.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
        </div>

        <div className="text-base mb-2 pb-3">Group image</div>
        <div className="">
        <label for="upload" className="hover:bg-white text-base text-black border-gray-400 border border-solid rounded-lg pr-[331px] pl-3 py-3 hover:bg-[#61E9B1] w-64">Select image...</label>
        <input type="file" id="upload" accept="image/*" hidden/>
        </div>

        <hr className="my-6 mt-9" />

        <button onClick={createGroup} className="w-full mb-3 p-3 bg-[#61E9B1] border-[1px] border-[#61E9B1] rounded-lg hover:bg-[#4edba1]">
        <i className="fa-solid fa-people-group"></i> Create a group
        </button>
      </div>
      <div className="w-3/6 sm:mx-8 mx-auto">
        <h2 className="pb-3 pt-1 font-semibold text-xl">Why are groups important?</h2>
        <p>By joining a group, you become a member of a society where people motivate each other and 
          reach mutual goals. In groups there are challenges and goals that are reached by group's members
          together. There are also events that groups can participate in.
        </p>
        <h2 className="pb-3 pt-6 font-semibold text-xl">Who can create a group?</h2>
        <p>Any person with a huge willingness can create a group. Obviously, one must be a registered user.
           Once the user creates a group, he initially becomes its mentor.
        </p>
        <h2 className="pb-3 pt-6 font-semibold text-xl">What is the difference among public and private group?</h2>
        <p>Public group can be seen and found by anyone while private group can be seen only by its members.
        </p>
      </div>
    </div>
    </div>
  );
};