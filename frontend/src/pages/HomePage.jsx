import CategoryCarousel from '@/components/shared/CategoryCarousel'
import Footer from '@/components/shared/Footer'
import HeroSection from '@/components/shared/HeroSection'
import LatestJobs from '@/components/shared/LatestJobs'
import Navbar from '@/components/shared/Navbar'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate();

  useGetAllJobs();

  useEffect(() => {
    if(user?.role === 'recruiter'){
      navigate('/admin/companies');
    }
  }, []);

  return (
    <div>
        <Navbar />
        <HeroSection />
        <CategoryCarousel />
        <LatestJobs />
        <Footer />
    </div>
  )
}

export default HomePage