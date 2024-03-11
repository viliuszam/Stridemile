import '../styles/Home.css';
import { PieChart } from '@mui/x-charts/PieChart';
import { Link } from 'react-router-dom';

export default () => {
  const getMapsUrl = (loc) => {
    return `https://www.google.com/maps/place/${loc}/`
  }

  const dateDiffToString = (dateWhenString) => {
    let dateWhen = new Date(dateWhenString)
    let dateNow = new Date();
    
    let seconds = Math.floor(((dateNow) - dateWhen)/1000);
    let minutes = Math.floor(seconds/60);
    let hours = Math.floor(minutes/60);
    let days = Math.floor(hours/24);
    
    hours = hours-(days*24);
    minutes = minutes-(days*24*60)-(hours*60);
    seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

    if(days) return `${days} days`
    if(hours) return `${hours} hours`
    if(minutes) return `${minutes} minutes`
    return `${seconds} seconds`
  }

  return (
    <div className='container'>

      <div className='mt-10 flex'>
        <div className='w-full mr-6'>
          <a className='text-[#4edba1] font-bold pb-2 border-b-4 border-[#4edba1]' href="#">Latest</a>
          <hr className='mb-3 mt-2' />

          <div className='mb-3 p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100'>
            <div className='flex'>
              <img className="my-auto w-24 h-24 object-cover rounded" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Ludovic_and_Lauren_%288425515069%29.jpg/640px-Ludovic_and_Lauren_%288425515069%29.jpg" />
              <div className='mx-4'>

                  <div className='mb-1 flex text-xs text-gray-400'>
                    <p>Event</p>
                    <span className='mx-2'>|</span>
                    <p>2024-03-06</p>
                    <span className='mx-2'>|</span>
                    <a href={getMapsUrl("Kaunas, Pilies g. 17")} target="_blank" rel="noopener noreferrer" className='text-[#74cfda]'>
                      <i class="fa-solid fa-location-dot"></i> Kaunas, Pilies g. 17
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
                50 <i class="fa-solid fa-user-check text-gray-400"></i>
                </div>
              </div>
              <div className='ml-auto'>
                <div className='text-[#4edba1] hover:text-[#61E9B1] cursor-pointer'>
                  <i class="fa-solid fa-circle-check"></i>
                </div>
              </div>
            </div>
            <hr className='my-4'/>
            <div className='flex items-center'>
              <img className='w-10 h-10 rounded-full' src="https://wearecardinals.com/wp-content/uploads/2020/04/u1Re9qgMfM8d6kumlW85PS6s55jQh5fbdmppgQsP.jpeg" />
              <div className='ml-3'>
                <p className='text-[14px]'><Link to='/group/1' className='hover:text-[#4edba1]'>Furious group</Link></p>
                <p className='text-xs text-gray-700'>By <Link to='/group/1' className='hover:text-[#4edba1]'>Tautvydas</Link> {dateDiffToString('2024-03-11 12:20:05')} ago</p>
              </div>
            </div>
          </div>

          <div className='mb-3 p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100'>
            <div className='flex'>
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
                50 <i class="fa-solid fa-user-check text-gray-400"></i>
                </div>
              </div>
              <div className='ml-auto'>
                <div className='text-gray-400 hover:text-gray-300 cursor-pointer'>
                  <i class="fa-solid fa-circle-check"></i>
                </div>
              </div>
            </div>
            <hr className='my-4'/>
            <div className='flex items-center'>
              <img className='w-10 h-10 rounded-full' src="https://wearecardinals.com/wp-content/uploads/2020/04/u1Re9qgMfM8d6kumlW85PS6s55jQh5fbdmppgQsP.jpeg" />
              <div className='ml-3'>
                <p className='text-[14px]'><Link to='/group/1' className='hover:text-[#4edba1]'>Furious group</Link></p>
                <p className='text-xs text-gray-700'>By <Link to='/group/1' className='hover:text-[#4edba1]'>Tautvydas</Link> {dateDiffToString('2024-03-11 12:20:05')} ago</p>
              </div>
            </div>
          </div>

          <div className='mb-3 p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100'>
            <div className='flex'>
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
                  <div class="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
                    <div class="bg-[#61E9B1] h-1.5 rounded-full" style={{ width: "15%" }}></div>
                  </div>
                  
                  <div className='flex text-xs text-gray-400'>
                    <p>STATUS: [STATUS GOES HERE]</p>
                    <p className='ml-6'>CATEGORY: [CATEGORY GOES HERE]</p>
                  </div>

              </div>
              <div className='flex ml-auto'>
                <div className='my-auto text-sm text-nowrap'>
                50 <i class="fa-solid fa-user-check text-gray-400"></i>
                </div>
              </div>
              <div className='ml-auto'>
                <div className='text-gray-400 hover:text-gray-300 cursor-pointer'>
                  <i class="fa-solid fa-circle-check"></i>
                </div>
              </div>
            </div>
            <hr className='my-4'/>
            <div className='flex items-center'>
              <img className='w-10 h-10 rounded-full' src="https://wearecardinals.com/wp-content/uploads/2020/04/u1Re9qgMfM8d6kumlW85PS6s55jQh5fbdmppgQsP.jpeg" />
              <div className='ml-3'>
                <p className='text-[14px]'><Link to='/group/1' className='hover:text-[#4edba1]'>Furious group</Link></p>
                <p className='text-xs text-gray-700'>By <Link to='/group/1' className='hover:text-[#4edba1]'>Tautvydas</Link> {dateDiffToString('2024-03-11 12:20:05')} ago</p>
              </div>
            </div>
          </div>

        </div>
        <div className='w-96 text-sm text-gray-600'>

          <div className='mb-4 p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100 text-sm text-gray-600'>
            <p className='text-black font-bold'>Achievements</p>
            <p className='mb-3 text-xs text-gray-600'>Statistics of your completed achievements</p>
            <div className='flex my-auto place-items-center'>
              <p className='flex text-center text-gray-500 text-5xl font-bold'>
                { Math.floor(10/15*100) } <i class="fa-solid fa-percent"></i>
              </p>
              <PieChart
              slotProps={{ legend: { hidden: true } }}
              series={[
                {
                  data: [ 
                    { id: 0, value: 10, color: '#e1e1e1', label: 'Not done' },
                    { id: 1, value: 15, color: '#61E9B1', label: 'Completed' }, 
                  ],
                  innerRadius: 20,
                  outerRadius: 30,
                  paddingAngle: 0,
                  cornerRadius: 5,
                  startAngle: 0,
                  endAngle: 360,
                  cx: 70,
                }
              ]}
              height={70}
            />
            </div>
          </div>

          <div className='p-4 w-full bg-gray-50 rounded-xl border-[1px] border-gray-100 text-sm text-gray-600'>
            <p className='text-black font-bold'>Steps</p>
            <p className='mb-3 text-xs text-gray-600'>In the last few days you made total of steps</p>
            <div className='py-4 flex my-auto place-items-center'>
              <p className='flex text-center text-gray-500 text-5xl font-bold'>109</p>
            </div>
          </div>
          
        </div>
      </div>

    </div>
  );
};
