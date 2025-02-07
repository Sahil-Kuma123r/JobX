import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setLoading } from '@/redux/authSlice'
import { USER_API_END_POINT } from '@/utils/endPoints'
import { RadioGroup } from '@radix-ui/react-radio-group'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading, user} = useSelector(store=>store.auth);

    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNo: "",
        role:"",
        file:""
    });


    const changeEventHandler = (e) => {
        setInput({...input, [e.target.name]:e.target.value});
    }
    const changeFileHandler = (e) => {
        setInput({...input, file:e.target.files?.[0]});
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(input);
        const formData = new FormData();
        formData.append('firstName', input.firstName);
        formData.append('lastName', input.lastName);
        formData.append('email', input.email);
        formData.append('password', input.password);
        formData.append('phoneNo', input.phoneNo);
        formData.append('role', input.role);
        if(input.file) formData.append('file', input.file);
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/signup`, formData, {
                headers :{
                    "Content-Type":"multipart/form-data"
                },
                withCredentials:true,
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate('/login')
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if(user){
            if(user.role === 'recruiter') navigate('/admin/companies');
            else navigate('/');
        }
    },[]);
    
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border rounded-lg border-gray-500 p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5 text-center'>Sign up</h1>
                        <div className="my-3">
                            <Label className='text-md'>First Name : </Label>
                            <Input type="text" placeholder='Aman' className='my-2' name='firstName' value={input.firstName} onChange={changeEventHandler}/>
                        </div>
                        <div className="my-3">
                            <Label className='text-md'>Last Name : </Label>
                            <Input type="text" placeholder='Singh' className='my-2' name='lastName' value={input.lastName} onChange={changeEventHandler}/>
                        </div>
                        <div className="my-3">
                            <Label className='text-md'>Email : </Label>
                            <Input type="email" placeholder='abc@gmail.com' className='my-2' name='email' value={input.email} onChange={changeEventHandler}/>
                        </div>
                        <div className="my-3">
                            <Label className='text-md'>Password : </Label>
                            <Input type="password" placeholder='Enter your Password' className='my-2' name='password' value={input.password} onChange={changeEventHandler}/>
                        </div>
                        <div className="my-3">
                            <Label className='text-md'>Phone No. : </Label>
                            <Input type="number" placeholder='91XXXXXX24' className='my-2' name='phoneNo' value={input.phoneNo} onChange={changeEventHandler}/>
                        </div>
                    <div className='flex items-center justify-center'>
                        <Label className='mx-3 font-bold text-base'>Role : </Label>
                        <RadioGroup className='flex items-center gap-4 my-5'>
                            <div className="flex items-center gap-2">
                                <Input type='radio' name='role' value='candidate' className='cursor-pointer' checked={input.role === 'candidate'} onChange={changeEventHandler}/>
                                <Label htmlFor="r1">Candidate</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Input type='radio' name='role' value='recruiter' className='cursor-pointer' checked={input.role === 'recruiter'} onChange={changeEventHandler}/>
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="flex items-center gap-2 w-2/3 mx-auto">
                        <Label className='text-md mx-2'>Profile: </Label>
                        <Input type='file' accept='image/*' className='cursor-pointer' onChange={changeFileHandler}/>
                    </div>
                    {
                        loading ? <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please Wait</Button> :
                        <Button type='submit' className='w-full my-4 border border-black rounded-md bg-purple-400 hover:border-violet-600 hover:border-2 hover:bg-violet-500'>Signup</Button>
                    }
                    <span className='block text-center font-semibold text-base'>Already have an account ?<Link to={'/login'} className='text-blue-600'>  Login</Link></span>
                </form>
            </div >
        </div >
    )
}

export default Signup