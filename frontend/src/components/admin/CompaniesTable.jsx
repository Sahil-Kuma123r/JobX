import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Popover, PopoverTrigger } from '../ui/popover'
import { PopoverContent } from '@radix-ui/react-popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const navigate = useNavigate();
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompanies, setFilterCompanies] = useState(companies);

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && (companies.filter((company) => {
            if(!searchCompanyByText){
                return true;
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        
        }));
        setFilterCompanies(filteredCompany);

    },[companies, searchCompanyByText])

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered Companies</TableCaption>
                <TableHeader className='hover:bg-gray-100'>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompanies?.map((company) => (
                            <tr className='hover:bg-gray-200'>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage className='h-10' src={company?.logo} />
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company?.name}</TableCell>
                                <TableCell>{company?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell className='text-right cursor-pointer'>
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className='w-20 rounded-md border border-gray-300 shadow-md bg-gray-800 text-white'>
                                            <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='my-3 flex items-center justify-center z-10'>
                                                <Edit2 />
                                                <span>Edit</span>
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

export default CompaniesTable
