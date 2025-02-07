import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { updateProfile } from '@/redux/authSlice'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        phoneNo: user?.phoneNo,
        skills: user?.profile?.skills?.map(skill => skill),
        bio: user?.profile?.bio,
        file: user?.profile?.resume
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    // const submitHandler = async (e) => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append('firstName', input.firstName);
    //     formData.append('lastName', input.lastName);
    //     formData.append('email', input.email);
    //     formData.append('phoneNo', input.phoneNo);
    //     formData.append('bio', input.bio);
    //     formData.append('skills', input.skills);
    //     if(input.file) formData.append('file', input.file);

    //     try {
    //         dispatch(setLoading(true));
    //         const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
    //             headers :{
    //                 "Content-Type":"multipart/form-data"
    //             },
    //             withCredentials:true,
    //         });
    //         console.log(res.data);
    //         if(res.data.success){
    //             dispatch(setUser(res.data.user));
    //             toast.success(res.data.message);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         toast.error(error.response.data.message);
    //     } finally {
    //         setLoading(false);  // Update local loading state
    //         setOpen(false);  // Close the dialog after submission
    //     }
    // }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("firstName", input.firstName);
        formData.append("lastName", input.lastName);
        formData.append("email", input.email);
        formData.append("phoneNo", input.phoneNo);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) formData.append("file", input.file);

        try {
            // Dispatch the async thunk for profile update
            setLoading(true);
            const resultAction = await dispatch(updateProfile(formData));

            if (updateProfile.fulfilled.match(resultAction)) {
                toast.success("Profile updated successfully");
            } else {
                toast.error(resultAction.payload || "Failed to update profile");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };


    return (
        <div>
            <Dialog open={open}>
                <DialogContent className='bg-white text-gray-800 sm:max-w-[425px]' onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 gap-4 items-center">
                                <Label htmlFor='name' className='text-right'>First Name</Label>
                                <Input id="name" name='firstName' value={input.firstName} onChange={changeEventHandler} className='col-span-3' />
                            </div>
                        </div>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 gap-4 items-center">
                                <Label htmlFor='name' className='text-right'>Last Name</Label>
                                <Input id="name" name='lastName' value={input.lastName} onChange={changeEventHandler} className='col-span-3' />
                            </div>
                        </div>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 gap-4 items-center">
                                <Label htmlFor='email' className='text-right'>Email</Label>
                                <Input id="email" name='email' type='email' value={input.email} onChange={changeEventHandler} className='col-span-3' />
                            </div>
                        </div>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 gap-4 items-center">
                                <Label htmlFor='number' className='text-right'>Number</Label>
                                <Input id="number" name='phoneNo' type='number' value={input.phoneNo} onChange={changeEventHandler} className='col-span-3' />
                            </div>
                        </div>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 gap-4 items-center">
                                <Label htmlFor='bio' className='text-right'>Bio</Label>
                                <Input id="bio" name='bio' value={input.bio} onChange={changeEventHandler} className='col-span-3' />
                            </div>
                        </div>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 gap-4 items-center">
                                <Label htmlFor='skills' className='text-right'>Skills</Label>
                                <Input id="skills" name='skills' value={input.skills} onChange={changeEventHandler} className='col-span-3' />
                            </div>
                        </div>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 gap-4 items-center">
                                <Label htmlFor='file' className='text-right'>Resume</Label>
                                <Input id="file" name='file' type='file' accept='application/pdf' onChange={fileChangeHandler} className='col-span-3' />
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button> :
                                    <Button type='submit' className='w-full my-4 border border-black rounded-md bg-purple-400 hover:border-violet-600 hover:border-2 hover:bg-violet-500'>Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog
