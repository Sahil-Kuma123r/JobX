import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setLoading, setUser } from '@/redux/authSlice'
import { USER_API_END_POINT } from '@/utils/endPoints'
import { RadioGroup } from '@radix-ui/react-radio-group'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading, user} = useSelector(store=>store.auth);

    const [input, setInput] = useState({
        email:"",
        password:"",
        role:""
    });
    const changeEventHandler = (e) => {
        setInput({...input, [e.target.name]:e.target.value});
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(input);
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers :{
                    "Content-Type":"application/json"
                },
                withCredentials:true,
            });
            if(res.data.success){
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                navigate('/');
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
                    <h1 className='font-bold text-xl mb-5 text-center'>Login</h1>
                    <div className='my-3'>
                        <Label className='text-md'>Email : </Label>
                        <Input type="email" placeholder='abc@gmail.com' className='my-2' name='email' value={input.email} onChange={changeEventHandler}/>
                    </div>
                    <div className='my-3'>    
                        <Label className='text-md'>Password : </Label>
                        <Input type="password" placeholder='Enter your Password' className='my-2' name='password' value={input.password} onChange={changeEventHandler}/>
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
                    {
                        loading ? <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please Wait</Button> :
                        <Button type='submit' className='w-full my-4 border border-black rounded-md bg-purple-400 hover:border-violet-600 hover:border-2 hover:bg-violet-500'>Login</Button>
                    }
                    
                    <span className='block text-center font-semibold text-base'>Don&apos;t have an account ?<Link to={'/signup'} className='text-blue-600'>  Sign Up</Link></span>
                </form>
            </div >
        </div >
    )
}

export default Login