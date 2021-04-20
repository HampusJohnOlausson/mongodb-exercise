import express from 'express';
const router = express.Router();
import Product from '../models/product.js';


router.get('/addProduct',(req, res) => {
    const product = new Product({
      title: 'Shirt',
      price: 299
    });

    product.save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      })
})


router.get('/', (req, res) => {
  Product.find()
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      console.log(err);
  })
})

router.get('/single', (req, res) => {
  Product.findById("607ebf8fdc6e320582423641")
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      console.log(err);
    })
})

router.delete('/:id', (req, res) => {
  res.send(products);
});

router.put('/:id', (req, res) => {
    res.send(products);
})

export default router;