const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;
const cloudinary = require('cloudinary').v2;
const fs = require('fs')
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types;

const userController = {

    registerUser : async(req, res)=>{
        const data = req.body;
        try{
            const newUser = new User({...data, profilePicture : data.username[0].toUpperCase()});
            await newUser.save();
            const token = jwt.sign({ id : newUser._id, username: newUser.username, email : newUser.email}, SECRET_KEY, { expiresIn: '1h'})

            res.status(201).json({message: 'User registered succesfully', token});
        }
        catch(error){
            res.status(500).json({message: 'Failed to register user', error: error});
            console.log(error)
        }
    },

    userLogin : async(req, res)=>{
        const {email , password, googleId} = req.body;

        if(googleId){
            try{
                const user = await User.findOne({googleId})
                .populate({
                    path: 'ownWorkspaces',
                    populate: {path : 'boards'},
                })
                .populate({
                    path: 'otherWorkspaces',
                    populate: {path : 'boards'},
                });

                if(!user){
                    res.status(404).json({message : 'User not found'});
                };

                res.status(200).json({user : user});
            }
            catch(error){
                res.status(500).json({message: 'Internal server error', error : error});
                console.log(error)
            }
        }
        else{
            try{
                const user = await User.findOne({email}) 
                .populate({
                    path: 'ownWorkspaces',
                    populate: { path : 'boards'} 
                })
                .populate({
                    path: 'otherWorkspaces',
                    populate: { path: 'boards'}
                })
                .select('+password');
    
                
                if(!user){
                    return res.status(404).json({message: 'User not found'})
                }
    
                const isMatch = await bcrypt.compare(password, user.password);
                if(!isMatch){
                    return res.status(401).json({message: 'Invalid password'});
                }
    
                const token = jwt.sign( 
                    {_id: user._id}, 
                    SECRET_KEY,
                    {expiresIn: '3h'}
                );
    
                user.password = undefined;
    
                res.status(200).json({ message: "Login succesful", token, user});
            }
            catch (error){
                res.status(500).json({message : "Login failed", error : error});
                console.log(error);
            }
        }
    },

    updateUser : async(req, res)=>{
        const {id} = req.params;
        const {ownWorkspaces, ...otherFields} = req.body;
        try{
            const user = await User.findByIdAndUpdate(
                id,
                {...otherFields, ownWorkspaces: ownWorkspaces},
                {new : true}
            ).populate('ownWorkspaces').populate('otherWorkspaces')
            if(!user){
                res.status(404).json({error : 'User not found'})
            }
            res.status(200).json({message: 'User updated', data : user});
        }
        catch(error){
            console.log(error);
        };
    },

    updateUserInfo : async(req, res)=>{
        const {id} = req.params;
        const {username, email, oldPassword, newPassword} = req.body;
        const profilePicture = req.file;

        try{
            const user = await User.findById(id).select('+password username email profilePicture');
            if(!user){
                return res.status(404).json({error : 'User not found'});
            };

            if(username && username.trim() && username !== user.username){
                user.username = username.trim();
            }
            if(email && email.trim() && email !== user.email){
                user.email = email.trim();
            };
            if(oldPassword && oldPassword.trim() && newPassword && newPassword.trim()){
                const isMatch = await bcrypt.compare(oldPassword, user.password);
                if(!isMatch){
                    return res.status(401).json({message: 'Invalid current Password'});
                };
                user.password = newPassword;
            }

            if(profilePicture){
                const uploadResult = await cloudinary.uploader.upload(profilePicture.path, {
                    folder : "profile_pictures",
                    use_filename : true,
                    unique_filename : true
                });

                user.profilePicture = uploadResult.secure_url;
                fs.unlink(profilePicture.path, (err)=>{
                    if(err) console.error("Failed to remove temporary file", err);
                })
            };

            const updatedUser = await user.save();
            updatedUser.password = undefined;

            res.status(200).json({message : "User updated Succesfully", data : updatedUser});
        }
        catch(error){
            res.status(500).json({message: 'Internal Server Error', error: error})
            console.log(error)
        }
    },

    searchUsers : async(req, res)=>{
        try{
            const {data} = req.body;

            const cleanedTerm = data.replace(/[^\w\s]/gi, "");
            if(!cleanedTerm){
                res.status(400).json({message: 'Please enter a valid search term'});
            };

            const regex = new RegExp(cleanedTerm, 'i');

            const users = await User.find({
                username : { $regex : regex}
            }).select('username email _id profilePicture')

            return res.status(200).json({data : users});
        }
        catch(error){
            res.status(500).json({message : 'Internal Server Error', error : error})
            console.error(error)
        }
    },

    searchUsersById : async(req, res)=>{
        const {userIds} = req.body; 
        try{
            const user = await User.find({ _id : { $in : userIds}}).select('username profilePicture email');
            if(!user){
                res.status(404).json({message: 'Users not found'});
            };
            res.status(200).json({data : user});
        }
        catch(error){
            res.status(500).json({message : 'Internal Server Error', error : error});
            console.log(error);
        };
    },

    updateOtherWorkspaces : async(req, res)=>{
        const {members, workspaceId} = req.body;
        try{
            const updatedUsers = await User.updateMany(
                {_id:{$in : members}},
                {$push : { otherWorkspaces : workspaceId}},
            );

            if(!updatedUsers){
                res.status(404).json({message : 'Users not found'});
            };

            res.status(200).json({message : 'Members successfully added', data : updatedUsers});
        }
        catch(error){
            res.status(500).json({message : 'Internal server error', error : error});
            console.log(error)
        }
    }
};


module.exports = userController;