import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { Button } from '../ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = ["Frontend Developer", "Backend Developer", "Data Science", "Video Editing", "Graphic Designing", "Project Manager"];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
      }
    return (
        <div className='relative'>

            <Carousel className='w-max xl:w-4/5 mx-auto my-10'>
                <CarouselContent className='flex justify-center items-center gap-0'>
                    {
                        category.map((cat, index) => (
                            <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3'>
                                <Button onClick={() => searchJobHandler(cat)} className='bg-black text-white hover:bg-black'>{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className='rounded-full shadow-md' />
                <CarouselNext className='rounded-full shadow-md' />
            </Carousel>
        </div>

    )
}

export default CategoryCarousel