import { useOutletContext, useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import { AlertTypes } from "../styles/modules/AlertStyles";
import axios from 'axios';
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../classes/Auth";
import config from "../config";

export default () => {
  const { setAlert } = useOutletContext();

  const { itemId } = useParams();

  const [itemTitle, setItemTitle] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    // Fetch visibility options from the server
    axios.get(`${config.API_URL}/shop-item/categories`)
      .then(response => {
        setCategoryOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching category options:', error);
      });
  }, []);

  const validate = () => {
    if (!itemTitle || !itemDescription || !itemPrice || !selectedCategory) {
      setAlert({ text: 'There are empty fields', type: AlertTypes.warning });
      return false;
    }
    return true;
  }

  const createShopItem = () => {
    if (!validate()) return;

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    }
    const formData = new FormData();
    formData.append('title', itemTitle);
    formData.append('description', itemDescription);
    formData.append('category', selectedCategory);
    formData.append('price', itemPrice);
    formData.append('imageFile', imageFile);
    axios.patch(`${config.API_URL}/shop-item/edit/${itemId}`, formData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(function (response) {
      console.log(response);
      setAlert({ text: 'Shop item created successfully', type: AlertTypes.success });
    })
    .catch(function (error) {
      console.error(error);
      setAlert({ text: 'Error creating shop item', type: AlertTypes.error });
    });
  }

  return isLoggedIn() ? (
    <div className="w-full">
   
    <div className="container sm:flex pt-12">
      <div className="w-3/6 sm:mx-8 mx-auto">
        <h1 className="text-2xl text-center font-medium">Edit a shop item</h1>
        <hr className="my-6" />

        <div className="mb-3">
          <div className="text-base mb-2">Item title</div>
          <input value={itemTitle} onChange={(e) => setItemTitle(e.target.value)} type="text" placeholder="Title" className="w-full p-3 border-[1px] border-gray-400 rounded-lg hover:border-[#61E9B1]" />
        </div>

        <div className="mb-3">
          <div className="text-base mb-2">Description</div>
          <input value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} type="text" placeholder="Description" className="w-full p-3 border-[1px] border-gray-400 rounded-lg hover:border-[#61E9B1]" />
        </div>

        <div className="mb-3">
          <div className="text-base mb-2">Price</div>
          <input value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} type="number" placeholder="Price" className="w-full p-3 border-[1px] border-gray-400 rounded-lg hover:border-[#61E9B1]" />
        </div>

        <div className="mb-3">
          <div className="text-base mb-2">Category</div>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full p-3 border-[1px] border-gray-400 rounded-lg bg-white hover:border-[#61E9B1]">
            <option value="">Select category</option>
            {categoryOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
  
        <div className="mb-3">
          <div className="text-base mb-2">Item image</div>
          <div className="block hover:bg-white text-base text-black border-gray-400 border border-solid rounded-lg pl-3 py-3 hover:bg-[#61E9B1] w-full hover:border-[#61E9B1] overflow-hidden">
            <label htmlFor="uploadcover" className="block whitespace-nowrap w-full overflow-hidden cursor-pointer">{!imageFile ? 'Select image...' : '🖼️ Image selected'}</label>
            <input type="file" className="w-full" id="uploadcover" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} hidden/>
          </div>
          <p className="mt-1 text-xs text-gray-500">Recommended image size 150x150 pixels</p>
        </div>

        <hr className="my-9 mt-12" />

        <button onClick={createShopItem} className="w-full mb-3 p-3 bg-[#61E9B1] border-[1px] border-[#61E9B1] rounded-lg hover:bg-[#4edba1]">
        <i className="fa-solid fa-cart-shopping"></i> Edit a shop item
        </button>
      </div>
      <div className="w-3/6 sm:mx-8 mx-auto">
        <h2 className="pb-3 pt-1 font-semibold text-xl">What are shop items?</h2>
        <p>Things StrideMile's users can purchase in the shop. There are different categories of items, therefore,
           everybody should really find what they are searching for.
        </p>
        <h2 className="pb-3 pt-6 font-semibold text-xl">How can you pay for shop items?</h2>
        <p>You pay by your points. When buying an item, your points are decreased by item's price.
        </p>
        <h2 className="pb-3 pt-6 font-semibold text-xl">How can you get points?</h2>
        <p>You can earn them by completing achievements.
        </p>
        <h2 className="pb-3 pt-6 font-semibold text-xl">Is it true that you can buy an item only one time?</h2>
        <p>Yes. We decided that it would be fare if all users had a possibility to buy items. If all users bought many items,
          we would not be able to provide everybody with items.
        </p>
      </div>
    </div>
    </div>
  ) : (
    <Navigate to='/login' />
  );
};