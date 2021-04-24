import express from 'express';
import User from "../models/user.js";
import bcrypt from 'bcrypt';
import mongoose from 'mongoose'
const userRouter = express.Router();


userRouter.get('/loggedIn', (req, res) => {

   
    if(req.session){
        res.status(200).send(req.session.username)
        
    } else {
        res.status(401).send('Nobody has logged in');
    }

})

userRouter.get('/loggedIn/role', (req, res) => {

    if(req.session){
        res.status(200).send(req.session.role);
    } else {
        res.status(404).send('User not found')
    }
})

userRouter.post('/register', (req, res) => {

    const { userName, password } = req.body;
    const existingUsers = User.find({userName});

    for(let i = 0; i < existingUsers.length; i++){
        if(existingUsers[i].userName === req.body.userName){
            return res.status(400).json("Username already exists");
        }
    }

    const hashedPassword = bcrypt.hash(password, 10);

    // if(password !== req.body.rePassword){
    //     return res.status(406).json('Password was incorrect')
    // }

    const newUser = new User({
      _id: mongoose.Types.ObjectId(),
      userName: userName,
      password: hashedPassword,
      role: 'user',
    });

    newUser.save();
    res.status(201).json(newUser);
})


export default userRouter;