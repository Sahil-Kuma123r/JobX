import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/endPoints';
import { setUser } from '@/redux/authSlice';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='bg-white border-b border-b-gray-300'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <Link to={'/'}><h1 className='text-2xl font-bold'>Talent<span className='text-red-500'>Quest</span></h1></Link>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <Link to={'/admin/companies'}><li>Companies</li></Link>
                                    <Link to={'/admin/jobs'}><li>Jobs</li></Link>
                                </>
                            ) : (
                                <>
                                    <Link to={'/'}><li>Home</li></Link>
                                    <Link to={'/jobs'}><li>Jobs</li></Link>
                                    <Link to={'/browse'}><li>Browse</li></Link>
                                </>
                            )
                        }

                    </ul>
                    {
                        user ? (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-80 bg-blue-300'>
                                    <div className='flex gap-5 space-y-2'>
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                        <div>
                                            <h3 className='font-medium'>{user?.firstName + " " + user?.lastName}</h3>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col my-2 mr-4 text-gray-700'>
                                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                                            <User2 />
                                            <Button variant="ghost"><Link to={'/profile'}>View Profile</Link></Button>
                                        </div>
                                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                                            <LogOut />
                                            <Button onClick={logOutHandler} variant="ghost">Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        ) : (
                            <div className='flex items-center gap-4'>
                                <Link to={'/signup'}><Button className='text-purple-700 font-bold border-2 border-purple-600 hover:scale-110 hover:text-black hover:bg-purple-500 hover:border-black'>Signup</Button></Link>
                                <Link to={`/login`}><Button className='bg-purple-400 border-solid text-black font-bold border-black border-2 hover:scale-110 hover:bg-purple-500' >Login</Button></Link>
                            </div>
                        )
                    }


                </div>
            </div>
        </div>
    )
}

export default Navbar