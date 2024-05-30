import React from 'react';
import { Link } from 'react-router-dom';

export default function GroupCard({ id, name, imageUrl, visibility, mentor, membersCount }) {
  return (
    <>
      <div className="bg-white rounded-xl mt-3 text-center pt-5 pb-5 bg-gray-50 border border-solid border-[#61E9B1]">
        <div className="rounded-4xl pb-3 flex">
          <Link to={`/group/${id}`} className='flex w-full'>
            <img src={imageUrl} alt="Group" className="rounded-4xl mx-auto object-cover h-28 w-full mx-6 bg-gray-100 items-center justify-center flex text-gray-500" />
          </Link>
        </div>
        <h2 className="font-semibold">{name}</h2>
        <hr className="ml-6 mr-6 mt-4 mb-4" />
        <p className="text-sm">{visibility}</p>
        <p className="text-sm"><span style={{ color: 'green', fontWeight: 'bold' }}>Mentor: {mentor}</span></p>
        <p className="text-sm">{membersCount} member(s)</p>
        <hr className="ml-6 mr-6 mt-4 mb-6" />
        <Link to={`/group/${id}`} className="bg-[#61E9B1] hover:bg-[#4edba1] rounded-lg text-black p-3 m-2 text-sm border border-solid border-[#61E9B1]">
          More information
        </Link>
        <p className="pb-3"></p>
      </div>
    </>
  )
}
