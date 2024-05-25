import { useOutletContext, useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import { AlertTypes } from "../styles/modules/AlertStyles";
import axios from 'axios';
import { isLoggedIn } from "../classes/Auth";

export default () => {
  const { groupId } = useParams();
  const { setAlert } = useOutletContext();

  const [groupData, setGroupData] = useState({
    name: '',
    description: '',
    selectedVisibility: '',
  });
  const [visibilityOptions, setVisibilityOptions] = useState([]);
  const [imageGroupFile, setImageGroupFile] = useState(null);
  const [imageBannerFile, setImageBannerFile] = useState(null);
  
  useEffect(() => {

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    }

    axios.get(`http://localhost:3333/groups/group/${groupId}`, {
      headers: {
          Authorization: `Bearer ${accessToken}`
      }
      })
      .then(response => {
        const { name, description, visibilityId } = response.data;
        setGroupData(prevState => ({
          ...prevState,
          name,
          description,
          selectedVisibility: visibilityId,
        }));
      })
      .catch(error => {
        console.error('Error fetching group details:', error);
      });

    axios.get('http://localhost:3333/visibility-options')
      .then(response => {
        setVisibilityOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching visibility options:', error);
      });
  }, [groupId]);

  const validate = () => {
    if (!groupData.name || !groupData.description || !groupData.selectedVisibility) {
      setAlert({ text: 'There are empty fields', type: AlertTypes.warning });
      return false;
    }
    return true;
  }

  const editGroup = () => {
    if (!validate()) return;
  
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    }
    
    const formData = new FormData();
    formData.append('name', groupData.name);
    formData.append('description', groupData.description);
    formData.append('visibilityId', groupData.selectedVisibility);
    formData.append('imageGroupFile', imageGroupFile);
    formData.append('imageBannerFile', imageBannerFile);
    for (let entry of formData.entries()) {
      console.log(entry);
    }
    
      axios.post(`http://localhost:3333/groups/edit-group/${groupId}`, formData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(function (response) {
      console.log(response);
      setAlert({ text: 'Group updated successfully', type: AlertTypes.success });
    })
    .catch(function (error) {
      console.error(error);
      setAlert({ text: 'Error updating group', type: AlertTypes.error });
    });
  }

  return isLoggedIn() ? (
    <div className="w-full">
   
    <div className="container sm:flex pt-12">
      <div className="w-3/6 sm:mx-8 mx-auto">
        <h1 className="text-2xl text-center font-medium">Edit a group</h1>
        <hr className="my-6" />

        <div className="mb-3">
          <div className="text-base mb-2">Group name</div>
          <input value={groupData.name} onChange={(e) => setGroupData(prevState => ({ ...prevState, name: e.target.value }))} type="text" placeholder="Group name" className="w-full p-3 border-[1px] border-gray-400 rounded-lg bg-white-100" />
        </div>

        <div className="mb-3">
          <div className="text-base mb-2">Description</div>
          <input value={groupData.description} onChange={(e) => setGroupData(prevState => ({ ...prevState, description: e.target.value }))} type="text" placeholder="Description" className="w-full p-3 border-[1px] border-gray-400 rounded-lg" />
        </div>

        <div className="mb-3">
          <div className="text-base mb-2">Visibility</div>
          <select value={groupData.selectedVisibility} onChange={(e) => setGroupData(prevState => ({ ...prevState, selectedVisibility: e.target.value }))} className="w-full p-3 border-[1px] border-gray-400 rounded-lg bg-white">
            <option value="">Select visibility</option>
            {visibilityOptions.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <div className="text-base mb-2">Group image</div>
          <div className="block hover:bg-white text-base text-black border-gray-400 border border-solid rounded-lg pl-3 py-3 hover:bg-[#61E9B1] w-full hover:border-[#61E9B1] overflow-hidden">
            <label for="uploadcover" className="block whitespace-nowrap w-full overflow-hidden cursor-pointer">{!imageGroupFile ? 'Select image...' : '🖼️ Image selected'}</label>
            <input type="file" className="w-full" id="uploadcover" accept="image/*" onChange={(e) => setImageGroupFile(e.target.files[0])} hidden/>
          </div>
          <p className="mt-1 text-xs text-gray-500">Recommended image size 1020x128 pixels</p>
        </div>
        
        <div className="">
          <div className="text-base mb-2">Group banner</div>
          <div className="block hover:bg-white text-base text-black border-gray-400 border border-solid rounded-lg pl-3 py-3 hover:bg-[#61E9B1] w-full hover:border-[#61E9B1] overflow-hidden">
            <label for="uploadbanner" className="block whitespace-nowrap w-full overflow-hidden cursor-pointer">{!imageBannerFile ? 'Select banner...' : '🖼️ Banner selected'}</label>
            <input type="file" id="uploadbanner" accept="image/*" onChange={(e) => setImageBannerFile(e.target.files[0])} hidden/>
          </div>
          <p className="mt-1 text-xs text-gray-500">Recommended image size 150x150 pixels</p>
        </div>

        <hr className="my-9 mt-12" />

        <button onClick={editGroup} className="w-full mb-3 p-3 bg-[#61E9B1] border-[1px] border-[#61E9B1] rounded-lg hover:bg-[#4edba1]">
        <i className="fa-solid fa-people-group"></i> Edit a group
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
  ) : (
    <Navigate to='/login' />
  );
};