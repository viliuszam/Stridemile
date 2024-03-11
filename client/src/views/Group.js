import '../styles/Home.css';

import { useParams } from "react-router-dom";

export default () => {
  const { groupId } = useParams();

  const getMapsUrl = (loc) => {
    return `https://www.google.com/maps/place/${loc}/`
  }

  return (
    <div className='container'>

      <div className='relative mb-20 h-32 w-full bg-gradient-to-b from-gray-100 to-gray-200 rounded-xl'>
        <img className='absolute left-10 -bottom-10 h-24 w-24 rounded-full outline outline-8 outline-white' src="https://wearecardinals.com/wp-content/uploads/2020/04/u1Re9qgMfM8d6kumlW85PS6s55jQh5fbdmppgQsP.jpeg" />
      </div>

      <div className='flex'>
        <div className='w-full mr-6'>
          <a className='text-[#4edba1] font-bold pb-2 border-b-4 border-[#4edba1]' href="#">Timeline</a>
          <hr className='mb-3 mt-2' />

          <div className='flex mb-3 p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100'>
            <img className="my-auto w-24 h-24 object-cover rounded" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Ludovic_and_Lauren_%288425515069%29.jpg/640px-Ludovic_and_Lauren_%288425515069%29.jpg" />
            <div className='mx-4'>

                <div className='mb-1 flex text-xs text-gray-400'>
                  <p>Event</p>
                  <span className='mx-2'>|</span>
                  <p>2024-03-06</p>
                  <span className='mx-2'>|</span>
                  <a href={getMapsUrl("Kaunas, Pilies g. 17")} target="_blank" rel="noopener noreferrer" className='text-[#74cfda]'>
                    <i className="fa-solid fa-location-dot"></i> Kaunas, Pilies g. 17
                  </a>
                </div>

                <p className='mb-1 font-bold'>Event title</p>

                <p className='mb-3 text-sm text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat ornare nibh, nec vestibulum velit commodo nec. In varius pharetra ornare.</p>

                <div className='text-xs text-gray-400'>
                  ORANIZATION UAB "Sportiva"
                </div>

            </div>
            <div className='flex ml-auto'>
              <div className='my-auto text-sm text-nowrap'>
               50 <i className="fa-solid fa-user-check text-gray-400"></i>
              </div>
            </div>
            <div className='ml-auto'>
              <div className='text-[#4edba1] hover:text-[#61E9B1] cursor-pointer'>
                <i className="fa-solid fa-circle-check"></i>
              </div>
            </div>
          </div>

          <div className='flex mb-3 p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100'>
            <img className="my-auto w-24 h-24 object-cover rounded" src="https://media.istockphoto.com/id/1266413326/vector/vector-challenge-sign-pop-art-comic-speech-bubble-with-expression-text-competition-bright.jpg?s=612x612&w=0&k=20&c=eYOQaCn7WvMAEo5ZxVHVVQ-pcNT8HZ-yPeTjueuXi28=" />
            <div className='mx-4'>

                <div className='mb-1 flex text-xs text-gray-400'>
                  <p>Challenge</p>
                  <span className='mx-2'>|</span>
                  <p>Starts 2024-03-06 10:30</p>
                  <span className='mx-2'>|</span>
                  <p>Ends 2024-03-10 10:30</p>
                </div>

                <p className='mb-1 font-bold'>Challenge title</p>

                <p className='mb-3 text-sm text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat ornare nibh, nec vestibulum velit commodo nec. In varius pharetra ornare.</p>

            </div>
            <div className='flex ml-auto'>
              <div className='my-auto text-sm text-nowrap'>
               50 <i className="fa-solid fa-user-check text-gray-400"></i>
              </div>
            </div>
            <div className='ml-auto'>
              <div className='text-gray-400 hover:text-gray-300 cursor-pointer'>
                <i className="fa-solid fa-circle-check"></i>
              </div>
            </div>
          </div>

          <div className='flex mb-3 p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100'>
            <img className="my-auto w-24 h-24 object-cover rounded" src="https://www.speexx.com/wp-content/uploads/goal-setting-basics.jpg" />
            <div className='mx-4'>

                <div className='mb-1 flex text-xs text-gray-400'>
                  <p>Goal</p>
                  <span className='mx-2'>|</span>
                  <p>Starts 2024-03-06 10:30</p>
                  <span className='mx-2'>|</span>
                  <p>Ends 2024-03-10 10:30</p>
                </div>

                <p className='mb-1 font-bold'>Goal title</p>

                <p className='mb-3 text-sm text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat ornare nibh, nec vestibulum velit commodo nec. In varius pharetra ornare.</p>

                <div className='flex text-sm text-gray-400'>
                  <p className='mr-auto'>15</p>
                  <p className='text-xs'>15%</p>
                  <p className='ml-auto'>100</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
                  <div className="bg-[#61E9B1] h-1.5 rounded-full" style={{ width: "15%" }}></div>
                </div>
                
                <div className='flex text-xs text-gray-400'>
                  <p>STATUS: [STATUS GOES HERE]</p>
                  <p className='ml-6'>CATEGORY: [CATEGORY GOES HERE]</p>
                </div>

            </div>
            <div className='flex ml-auto'>
              <div className='my-auto text-sm text-nowrap'>
               50 <i className="fa-solid fa-user-check text-gray-400"></i>
              </div>
            </div>
            <div className='ml-auto'>
              <div className='text-gray-400 hover:text-gray-300 cursor-pointer'>
                <i className="fa-solid fa-circle-check"></i>
              </div>
            </div>
          </div>

        </div>
        <div className='w-96 text-sm text-gray-600'>

          <div className='mb-6 outline outline-2 outline-offset-8 outline-[#88e0ea] rounded-xl'>
            <p className='mb-4 text-black font-bold'>Group management</p>
            <a href="" className='mb-2 p-4 bg-[#61E9B1] hover:bg-[#4edba1] rounded-xl block'>
              <i className="fa-solid fa-person-walking mr-2"></i> Create challenge
            </a>

            <a href="" className='mb-2 p-4 bg-[#61E9B1] hover:bg-[#4edba1] rounded-xl block'>
            <i className="fa-solid fa-flag-checkered mr-2"></i> Create goal
            </a>

            <a href="" className='mb-2 p-4 bg-[#61E9B1] hover:bg-[#4edba1] rounded-xl block'>
              <i className="fa-regular fa-calendar-plus mr-2"></i> Create event
            </a>

            <a href="" className='mb-6 p-4 bg-[#61E9B1] hover:bg-[#4edba1] rounded-xl block'>
              <i className="fa-solid fa-pen-to-square mr-2"></i> Edit group
            </a>

            <p className='mb-4 text-black font-bold'>Invite member</p>
            <div className='flex'>
              <input className='p-4 border-2 border-gary-50 rounded-xl' placeholder="Enter member @email" />
              <button className='ml-2 p-4 bg-[#61E9B1] hover:bg-[#4edba1] rounded-xl'>Invite</button>
            </div>
          </div>

          <p className='mb-4 text-black font-bold'>Description</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat ornare nibh, nec vestibulum velit commodo nec. In varius pharetra ornare.</p>
          <hr className='my-6' />
          <div className='grid grid-cols-2'>
            <p className='text-right mb-1 mr-5'>Visibility</p><p>public</p>
            <p className='text-right mb-1 mr-5'>Type</p><p>group type</p>
            <p className='text-right mb-1 mr-5'>Last activity</p><p>2 days ago</p>
          </div>
          <hr className='my-6' />
          <div className='grid grid-cols-3 gap-4 justify-items-center text-center'>
            <div>
              <p>500</p>
              <i className="fa-solid fa-users"></i>
              <p className='text-xs'>Members</p>
            </div>
            <div>
              <p>200</p>
              <i className="fa-solid fa-trophy"></i>
              <p className='text-xs'>Achievements</p>
            </div>
            <div>
              <p>100</p>
              <i className="fa-solid fa-calendar-days"></i>
              <p className='text-xs'>Events</p>
            </div>
          </div>
          <hr className='my-6' />
          <p className='mb-4 text-black font-bold'>Mentor</p>
          <div className='text-center inline-block'>
            <img className='mx-auto w-10 h-10 rounded-full' src="https://www.befunky.com/images/prismic/5ddfea42-7377-4bef-9ac4-f3bd407d52ab_landing-photo-to-cartoon-img5.jpeg?auto=avif,webp&format=jpg&width=863" />
            <p className='text-xs'>Tautvydas</p>
          </div>
        </div>
      </div>

    </div>
  );
};
