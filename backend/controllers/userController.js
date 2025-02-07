import { User } from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, phoneNo, email, password, role } = req.body;
        if (!firstName || !phoneNo || !email || !password || !role) {
            return res.status(400).json({ message: "Please fill in all required fields.", success: false });
        }

        let profilePhotoUrl = "https://th.bing.com/th?id=OIP.D_pgY0PtN8xkegp9PqCZ8AHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"; 
        const file = req.file;
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            profilePhotoUrl = cloudResponse.secure_url; 
        }

        const user = await User.findOne({ email });
        if (user) {
            console.log(user);
            return res.status(400).json({ message: "User already exists with same email", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = User.create({
            firstName,
            lastName,
            phoneNo,
            email,
            password: hashedPassword,
            role,
            profile : {
                profilePhoto : profilePhotoUrl
            }
        });
        console.log("Signup complete");
        res.status(201).json({ message: "Signup successfull", newUser, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ message: "Please fill in all the necessary fields.", success: false });
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Incorrect Email or Password.", success: false });
        }

        const isSamePass = bcrypt.compare(password, user.password);
        if (!isSamePass) {
            return res.status(400).json({ message: "Incorrect Email or Password.", success: false });
        }

        if (role !== user.role) {
            return res.status(400).json({ message: "No such account in current role", success: false });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            profile: user.profile,
            phoneNo: user.phoneNo,
        }

        console.log("Log In complete");
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome, ${user.firstName}`,
            user,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

// export const updateProfile = async (req, res) => {
//     try {
//         const {firstName, lastName, email, phoneNo, bio, skills} = req.body;
//         const file = req.file;
//         // if(!firstName || !phoneNo || !email || !lastName || !skills || !bio){
//         //     return res.status(400).json({message: "Please fill in all required fields.", success : false});
//         // }
//         let skillsArray;
//         if(skills){
//             skillsArray = skills.split(",");
//         }
//         let userId = req.id;
//         let user = await User.findById(userId);

//         if(!user){
//             return res.status(400).json({message: "User Not found", success : false});
//         }

//         if(firstName) user.firstName = firstName;
//         if(lastName) user.lastName = lastName;
//         if(email) user.email = email;
//         if(phoneNo) user.phoneNo = phoneNo;
//         if(bio) user.profile.bio = bio;
//         if(skills) user.profile.skills = skillsArray;

//         //resume

//         await user.save();

//         user = {
//             _id : user._id,
//             email : user.email,
//             role : user.role,
//             firstName : user.firstName,
//             lastName : user.lastName,
//             profile : user.profile
//         }
//         console.log("Updation complete");

//         return res.status(201).json({message : "User updated successfully", user, success:true});

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({message : "Internal server error", success : false});
//     }
// };

export const updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNo, bio, skills } = req.body;
        const file = req.file;
        const fileUri = getDataUri(file);

        // Upload to Cloudinary with error handling
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        console.log(cloudResponse);

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }

        let userId = req.id;
        let user = await User.findById(userId);


        if (!user) {
            return res.status(400).json({ message: "User Not found", success: false });
        }

        // Update fields only if they exist in the request body
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;
        if (phoneNo) user.phoneNo = phoneNo;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url; //cloudinary URL
            user.profile.resumeName = file.originalname; //original file name of resume
        }

        await user.save();

        // Prepare user object for response
        user = {
            _id: user._id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            profile: {
                bio: user.profile.bio,
                skills: user.profile.skills,
                resume: user.profile.resume,             // cloudinary URL
                resumeName: user.profile.resumeName, // original file name of resume
            },
            phoneNo: user.phoneNo
        };

        return res.status(201).json({ message: "User updated successfully", user, success: true });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};
