import React from 'react'
import Latestjobcards from './Latestjobcards'
import { useSelector } from 'react-redux'


const randomjobcard=[1,2,3,4,5,6,7,8]
const LatestJobs = () => {
 
  const {allJobs}=useSelector(store=>store.job);
  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold'> <span className='text-[#6a38c2] '>Latest & Top </span>Job Opening</h1>
      {/* multiple job card display */}
      <div className='grid grid-cols-3 gap-4 my-5'>
      {
   allJobs.length<=0?<span>Currently no Job avaliable</span> :allJobs?.slice(0,6).map((job) => 
    <Latestjobcards  key={job._id} job={job}/>
    )
}

      </div>

    </div>
  )
}

export default LatestJobs
