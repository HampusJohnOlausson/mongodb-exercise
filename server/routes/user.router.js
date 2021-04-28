import express from 'express';
import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import mongoose from 'mongoose'
const userRouter = express.Router();
import "express-async-errors";


userRouter.get('/loggedIn', (req, res) => {
   
    if(req.session){
        const userSession = {userName: req.session.userName, password: req.session.password, _id: req.session.id}
        res.status(200).send(userSession);
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

userRouter.post('/register', async (req, res) => {

    const { userName, password } = req.body;
    const existingUsers = await User.find({userName});

    for(let i = 0; i < existingUsers.length; i++){
        if(existingUsers[i].userName === req.body.userName){
            return res.status(400).json("Username already exists");
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      _id: mongoose.Types.ObjectId(),
      userName: userName,
      password: hashedPassword,
      role: 'user',
    });

    await newUser.save();
    res.status(201).json(newUser);
})

userRouter.post('/login', async (req, res) => {

    const { userName, password } = req.body;
    const existingUsers = await User.find({userName});
    const user = existingUsers.find((u) => u.userName === userName);

    //checks if user and password are correct
    if(!user || !await bcrypt.compare(password, user.password)){
        return res.status(401).json('incorrect username or password');
    }

    //Creates session
    if(req.session) {
        req.session.username = userName, 
        req.session.id = user._id,
        req.session.role = user.role;
        res.status(200).json(null);
    }
})

userRouter.delete('/logOut', (req, res) => {

    req.session = null;
    res.status(201).json('Logout succesful');
})

userRouter.get("/allUsers", secureWithRole("admin"), async (req, res) => {
  const result = await User.find();
  res.status(200).json(result);
});

//middleware for secure endpoints
function secure(req, res, next) {
    if(req.session.userName){
        next();
    } else {
        res.status(401).json('You need to login to access')
    }
}

function secureWithRole(role){
    return [secure, async (req, res, next) => {
        if(req.session.role === role){
            next();
        } else {
            res.status(403).json('You dont have the authority to view this information');
        }
    }]
}

export default userRouter;

