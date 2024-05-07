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

  const [imageGroupFile, setImageGroupFile] = useState(null);
  const [imageBannerFile, setImageBannerFile] = useState(null);

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
      return;
    }
    const formData = new FormData();
    formData.append('name', groupName);
    formData.append('description', groupDescription);
    formData.append('mentorId', -1);
    formData.append('visibilityId', selectedVisibility);
    formData.append('imageGroupFile', imageGroupFile);
    formData.append('imageBannerFile', imageBannerFile);
    for (let entry of formData.entries()) {
      console.log(entry);
    }
    axios.post('http://localhost:3333/groups/createGroup', formData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
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
   
    <div className="container sm:flex pt-12">
      <div className="w-3/6 sm:mx-8 mx-auto">
        <h1 className="text-2xl text-center font-medium">All chats</h1>
        <hr className="my-6 mb-9" />

        <Link to={`/chats/1`}>
          <div className="mb-3 flex hover:bg-[#61E9B1] border border-solid border-[#61E9B1] rounded-lg">
            <div className="m-3">
              <img src="https://img.ebdcdn.com/product/model/portrait/rm3048_m0.jpg?im=Resize,width=280,height=420,aspect=fill;UnsharpMask,sigma=1.0,gain=1.0" alt="photo" height={100} width={100}/>
            </div>
            <div className="m-3">
              <div className="text-xl mb-2 font-semibold">Luca</div>
              <div>Hey there, I wanted to see you. I am waiting </div>
              <div className="text-gray-700 mt-3">3 hours ago</div>
            </div>
          </div>
        </Link>

        <Link to={`/chats/1`}>
          <div className="mb-3 flex hover:bg-[#61E9B1] border border-solid border-[#61E9B1] rounded-lg">
            <div className="m-3">
              <img src="https://img.ebdcdn.com/product/model/portrait/rm3048_m0.jpg?im=Resize,width=280,height=420,aspect=fill;UnsharpMask,sigma=1.0,gain=1.0" alt="photo" height={100} width={100}/>
            </div>
            <div className="m-3">
              <div className="text-xl mb-2 font-semibold">Luca</div>
              <div>Hey there, I wanted to see you. I am waiting </div>
              <div className="text-gray-700 mt-3">3 hours ago</div>
            </div>
          </div>
        </Link>

        <Link to={`/chats/1`}>
          <div className="mb-3 flex hover:bg-[#61E9B1] border border-solid border-[#61E9B1] rounded-lg">
            <div className="m-3">
              <img src="https://img.ebdcdn.com/product/model/portrait/rm3048_m0.jpg?im=Resize,width=280,height=420,aspect=fill;UnsharpMask,sigma=1.0,gain=1.0" alt="photo" height={100} width={100}/>
            </div>
            <div className="m-3">
              <div className="text-xl mb-2 font-semibold">Luca</div>
              <div>Hey there, I wanted to see you. I am waiting </div>
              <div className="text-gray-700 mt-3">3 hours ago</div>
            </div>
          </div>
        </Link>

        <hr className="my-9 mt-9" />

        <button onClick={createGroup} className="w-full mb-3 p-3 bg-[#61E9B1] border-[1px] border-[#61E9B1] rounded-lg hover:bg-[#4edba1]">
        <i class="fa-solid fa-message"></i> Create a new message
        </button>
      </div>
      <div className="w-3/6 sm:mx-8 mx-auto">
        <h2 className="pb-3 pt-6 font-semibold text-xl">Who can create message others?</h2>
        <p>Any person can message other users of the system.
        </p>
      </div>
    </div>
    </div>
  );
};