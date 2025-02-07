import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { setSingleJob } from '@/redux/jobSlice';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/endPoints';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const JobDescription = () => {
    const params = useParams();
    const jobId = params.id;
    const { user } = useSelector(store => store.auth);
    const { singleJob } = useSelector(store => store.job);
    const hasInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [hasApplied, setHasApplied] = useState(hasInitiallyApplied)

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchALLJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setHasApplied(res.data.applications.some(application => application.applicant === user?._id)); // ensuring the sync in data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchALLJobs();
    }, [jobId, dispatch, user?._id]);

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            if (res.data.success) {
                setHasApplied(true); //to update local state
                const updatedSingleJob = {...singleJob, applications: [...singleJob.applications,{applicant:user?._id}]}; //updating job state
                dispatch(setSingleJob(updatedSingleJob));  //helps us to update UI
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='max-w-7xl mx-auto my-10'>
            <h1 className='text-xl font-bold'>{singleJob?.title}</h1>
            <div className='flex justify-between items-center'>
                <div>
                    <div className='flex items-center gap-3 mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant={"ghost"}>{singleJob?.position} Positions</Badge>
                        <Badge className={'text-red-600 font-bold'} variant={"ghost"}>{singleJob?.jobType}</Badge>
                        <Badge className={'text-green-700 font-bold'} variant={"ghost"}>{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                <Button disabled={hasApplied}
                    onClick={hasApplied ? null : applyJobHandler}
                    className={`rounded-xl ${hasApplied ? 'bg-gray-600 text-white cursor-not-allowed hover:bg-gray-700' : 'bg-purple-500 hover:bg-purple-600 text-black'}`}>
                    {hasApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>{singleJob?.description}</h1>
            <div className='my-4'>
                <h1 className="font-bold my-1">Role : <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className="font-bold my-1">Location : <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className="font-bold my-1">Description : <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className="font-bold my-1">Experience : <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} yrs</span></h1>
                <h1 className="font-bold my-1">Salary : <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
                <h1 className="font-bold my-1">Total Applicants : <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications.length}</span></h1>
                <h1 className="font-bold my-1">Posted Date : <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
            </div>


        </div>
    )
}

export default JobDescription
