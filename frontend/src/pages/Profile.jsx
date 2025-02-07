import AppliedJobsTable from '@/components/shared/AppliedJobsTable'
import Navbar from '@/components/shared/Navbar'
import UpdateProfileDialog from '@/components/shared/UpdateProfileDialog'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { Contact, Mail, Pen } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'


const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);
    // console.log(user);
    const hasResume = user?.profile?.resume;

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto border border-gray-200 rounded-2xl my-5 p-8'>
                <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className='h-24 w-24'>
                            <AvatarImage src={user?.profile?.profilePhoto} alt='profile' />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.firstName + " " + user?.lastName}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className='text-right border border-gray-300 rounded-xl hover:bg-gray-200'><Pen /></Button>
                </div>
                <div className='my-3'>
                    <div className="flex items-center gap-4 my-3">
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-4 my-3">
                        <Contact />
                        <span>{user?.phoneNo}</span>
                    </div>
                </div>
                <div className='my-3'>
                    <h1 className='font-medium text-lg'>Skills</h1>
                    <div className="flex items-center gap-2 my-2">
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index} className={"bg-black text-white hover:bg-black"}>{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                        <Label className='text-md font-bold'>Resume</Label>
                        {
                            hasResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 hover:underline cursor-pointer w-full'>{user?.profile?.resumeName}</a> : <span>NA</span>
                        }
                </div>
            </div>
            <div className='max-w-4xl mx-auto rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJobsTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile
