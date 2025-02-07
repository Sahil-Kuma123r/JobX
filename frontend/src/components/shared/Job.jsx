import React from 'react'
import { Button } from '../ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();
    // const jobId = "ajlsjjiijdalkcdcndsn";

    const daysAgoFunc = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDiff = currentTime - createdAt;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        return daysDiff;
    }

    return (
        <div onClick={() => navigate(`/job/description/${job._id}`)} className='p-5 rounded-md shadow-xl bg-blue-50 border border-gray-100 hover:scale-105 hover:shadow-lg cursor-pointer'>
            <div className="flex items-center justify-between">
                <p className='text-sm text-gray-500'>{daysAgoFunc(job?.createdAt) === 0 ? "Today" : `${daysAgoFunc(job?.createdAt)} days ago`}</p>
                <Button className='rounded-full' size='icons'><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className='p-6' size='icon'>
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='text-lg font-medium'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-600'>India</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-3 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant={"ghost"}>{job?.position} Positions</Badge>
                <Badge className={'text-red-600 font-bold'} variant={"ghost"}>{job?.jobType}</Badge>
                <Badge className={'text-green-700 font-bold'} variant={"ghost"}>{job?.salary} LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`/job/description/${job?._id}`)} variant='outline'>Details</Button>
                <Button className='bg-violet-500 hover:bg-violet-600'>Save for Later</Button>
            </div>
        </div>
    )
}

export default Job
