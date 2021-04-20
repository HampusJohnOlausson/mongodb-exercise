import express from 'express';
import productRouter from './routes/product.router.js';
import mongoose from 'mongoose';

const app = express();

const url =
  "mongodb+srv://hampusOlausson:Kurt3234Olsson@cluster0.so03q.mongodb.net/node?retryWrites=true&w=majority";
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(url, options)
.then((result) => {
    console.log('connected to db');
}).catch((err) => {
    console.log(err);
})

app.use(express.json());

app.use('/products', productRouter);

app.listen(6000);