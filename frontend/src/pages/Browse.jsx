import Job from '@/components/shared/Job';
import Navbar from '@/components/shared/Navbar';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { setSearchedQuery } from '@/redux/jobSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const randomJobs = [1,2,3,4];

const Browse = () => {
  useGetAllJobs();
  const dispatch = useDispatch();
  const {allJobs} = useSelector(store=>store.job); 

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    }
  }, []);

  return (
    <div>
        <Navbar />
        <div className='max-w-7xl mx-auto my-10'>
          <h1 className='text-xl font-bold my-10'>Search jobs ({allJobs.length})</h1>
          <div className='grid grid-cols-3 gap-4'>
            {
              allJobs.map((job) => {
                return (
                  <Job key={job._id} job={job}/>
                )
              })
            }
          </div>
        </div>
    </div>
  )
}

export default Browse
