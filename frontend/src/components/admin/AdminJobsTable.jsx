import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Popover, PopoverTrigger } from '../ui/popover'
import { PopoverContent } from '@radix-ui/react-popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    const navigate = useNavigate();
    const {allAdminJobs, searchJobByText} = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);

    useEffect(() => {
        const filteredJobs = allAdminJobs.length >= 0 && (allAdminJobs.filter((job) => {
            if(!searchJobByText){
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
        
        }));
        setFilterJobs(filteredJobs);

    },[allAdminJobs, searchJobByText])

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent jobs posted</TableCaption>
                <TableHeader className='hover:bg-gray-100'>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <tr className='hover:bg-gray-200'>
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell className='text-right cursor-pointer'>
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className='w-36 rounded-md border border-gray-300 shadow-md bg-gray-800 text-white'>
                                            <div onClick={() => navigate(`/admin/companies/${job._id}`)} className='my-3 flex items-center justify-center z-10'>
                                                <Edit2 className='mx-1'/>
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={() => navigate(`/admin/job/${job._id}/applicants`)} className='my-3 flex items-center justify-center z-10'>
                                                <Eye className='mx-1'/>
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable;
