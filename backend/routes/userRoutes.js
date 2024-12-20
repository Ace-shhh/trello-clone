const express = require('express');
const routes = express.Router();
const userController = require('../controller/userController');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;
const multer = require('multer')
const upload = multer({dest: 'uploads/'})

const authenticateToken = async(req,res, next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.status(401).json({message : 'Token missing, access denied'});
    jwt.verify(token, SECRET_KEY, (err, user)=>{
        if (err) return res.status(403).json({message: 'invalid or expired token'});
        req.user = user;
        next();
    })
};

routes.post('/register', userController.registerUser);
routes.post('/login', userController.userLogin);
routes.post('/search', userController.searchUsers);
routes.get('/profile', authenticateToken, (req, res)=>{
    res.status(200).json({message: 'Access granted', user: req.user})
})
routes.post('/searchMembers', userController.searchUsersById);
routes.patch('/userUpdate/:id', authenticateToken, userController.updateUser);
routes.patch('/otherWorkspaces', userController.updateOtherWorkspaces)
routes.put('/userInfo/:id', upload.single('profilePicture'), userController.updateUserInfo);
module.exports = routes;