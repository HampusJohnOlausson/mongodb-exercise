import express from 'express';
import postRouter from './routes/post.router.js';
import userRouter from './routes/user.router.js';
import mongoose from 'mongoose';
import cookiesession from 'cookie-session';
import "express-async-errors";
const port = process.env.PORT || 6000;

const app = express();
 
app.use(cookiesession({
    name: 'session',
    secret: 'h3110fri3nd',
    secure: 'false',
    maxAge: 10000 * 60,
    httpOnly: true,
}))

const url = "mongodb+srv://hampusOlausson:Kurt3234Olsson@cluster0.so03q.mongodb.net/node?retryWrites=true&w=majority";
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(url, options)
.then((result) => app.listen(port))
.catch((err) => {console.log(err);})

app.use(express.json());
app.use('api/posts', postRouter);
app.use('api/users', userRouter);
app.use(express.static("/client"));
app.use(express.urlencoded({ extended: true }));

