import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from 'react'
import { AlertTypes } from "../styles/modules/AlertStyles";
import axios from 'axios';
import NavBar from "../components/NavBar";

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
   
    <div className="container">
      <h1 className="text-2xl text-center font-medium">Create a Group</h1>
      <hr className="my-6" />

      <div className="mb-3">
        <div className="text-base mb-2">Group Name</div>
        <input value={groupName} onChange={(e) => setGroupName(e.target.value)} type="text" placeholder="Group Name" className="w-full p-3 border-[1px] border-gray-400 rounded-lg" />
      </div>

      <div className="mb-3">
        <div className="text-base mb-2">Description</div>
        <input value={groupDescription} onChange={(e) => setGroupDescription(e.target.value)} type="text" placeholder="Description" className="w-full p-3 border-[1px] border-gray-400 rounded-lg" />
      </div>

      <div className="mb-3">
        <div className="text-base mb-2">Visibility</div>
        <select value={selectedVisibility} onChange={(e) => setSelectedVisibility(e.target.value)} className="w-full p-3 border-[1px] border-gray-400 rounded-lg">
          <option value="">Select Visibility</option>
          {visibilityOptions.map(option => (
            <option key={option.id} value={option.id}>{option.name}</option>
          ))}
        </select>
      </div>

      <hr className="my-6" />

      <button onClick={createGroup} className="w-full mb-3 p-3 bg-[#61E9B1] border-[1px] border-[#61E9B1] rounded-lg hover:bg-[#4edba1]">
        Create Group
      </button>

    </div>
    </div>
  );
};