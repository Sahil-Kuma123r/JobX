import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/endPoints';

const shortlistingStatus = ["Accepted", "Rejected"]

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/update/${id}`, {status} , {withCredentials:true});
            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);            
        }
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of recent applied Users</TableCaption>
                <TableHeader className='hover:bg-gray-100'>
                    <TableRow >
                        <TableHead className='border-2 border-black'>Full Name</TableHead>
                        <TableHead className='border-2 border-black'>Email</TableHead>
                        <TableHead className='border-2 border-black'>Contact</TableHead>
                        <TableHead className='border-2 border-black'>Resume</TableHead>
                        <TableHead className='border-2 border-black'>Date</TableHead>
                        <TableHead className='text-right border-2 border-black'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => (
                            <tr className='hover:bg-gray-200' key={item._id}>
                                <TableCell className='border border-black'>{item?.applicant?.firstName + " " + item?.applicant?.lastName}</TableCell>
                                <TableCell className='border border-black'>{item?.applicant?.email}</TableCell>
                                <TableCell className='border border-black'>{item?.applicant?.phoneNo}</TableCell>
                                <TableCell className='border border-black'>
                                    {
                                        item?.applicant?.profile?.resume ? <a className='text-blue-600 cursor-pointer hover:underline' href={item?.applicant?.profile?.resume} target='_blank'>{item?.applicant?.profile?.resumeName ? item?.applicant?.profile?.resumeName : <span>Click Here</span>}</a>
                                         : <span>NA</span>
                                    }
                                </TableCell>
                                <TableCell className='border border-black'>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className='text-right border border-black'>
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className='w-24 bg-blue-50'>
                                            {
                                                shortlistingStatus.map((status, index) => {
                                                    return (
                                                        <div onClick={() => statusHandler(status, item._id)} key={index} className='mb-2 cursor-pointer hover:bg-blue-100'>
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
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

export default ApplicantsTable
