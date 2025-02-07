import React, { useState } from 'react'
import InputField from './InputField'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { Description, Field, Label, Input } from '@headlessui/react'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }

  return (
    <div className='text-center'>
      <div className="flex flex-col gap-5 my-7">
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 font-medium text-red-500'>No.1 Job Hunt Website</span>
        <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-purple-600'>Dream Job</span></h1>
        <p>Here is one of the random text created in snippets. This code is used for sample purposes only.
          There are a variety of uses of this.</p>
        <div className="flex w-[50%] mx-[33%]">
          <div className="w-full max-w-md rounded-lg shadow-sm bg-white">
            <Field>
              <Label className="text-sm font-medium text-gray-800">{" "}</Label>
              <Description className="text-sm text-gray-600">{" "}</Description>
              <Input
                onChange={(e) => setQuery(e.target.value)}
                className={clsx(
                  'mt-3 block w-full rounded-lg border border-gray-300 py-2 px-3 text-sm text-gray-800',
                  'focus:outline-none focus:ring-2 focus:ring-red-700 focus:shadow-lg focus:border-red-700 focus:shadow-all transition-all duration-200'
                )}
                placeholder='Enter your dream Job..'
                style={{
                  boxShadow: '0 4px 6px rgba(220, 7, 7, 0.15), 0 -4px 6px rgba(220, 7, 7, 0.075), 4px 0 6px rgba(220, 7, 7, 0.075), -4px 0 6px rgba(220, 7, 7, 0.075)'
                }}
              />
            </Field>
          </div>
          <Button onClick={searchJobHandler} className='mt-3 bg-black hover:bg-black' style={{
            boxShadow: '0 4px 6px rgba(220, 7, 7, 0.2), 0 -4px 6px rgba(220, 7, 7, 0.1), 4px 0 6px rgba(220, 7, 7, 0.1), -4px 0 6px rgba(220, 7, 7, 0.1)'
          }}><Search className='text-white h-5 w-5' /></Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection