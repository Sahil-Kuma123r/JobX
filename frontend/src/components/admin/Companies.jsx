import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [input, setInput] = useState("");

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    },[input, dispatch]);

    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto my-10">
                <div className='flex items-center justify-between my-6'>
                    <Input
                        className='w-fit'
                        placeholder='Filter by Name'
                        onChange={(e) =>  setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate('/admin/companies/register')} className='bg-gray-800 text-white rounded-lg hover:bg-black'>New Compny</Button>
                </div>
                <CompaniesTable />
            </div>
        </div>
    )
}

export default Companies
