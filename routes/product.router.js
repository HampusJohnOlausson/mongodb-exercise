import express from 'express';
const router = express.Router();
import Product from '../models/product.js';


router.get("/", (req, res) => {
  Product.find().sort({ createdAt: -1 })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Product.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/',(req, res) => {
    
    const product = new Product(req.body);
    product.save()
      .then((result) => {
        res.send(result);
        // res.redirect('/products');
      })
      .catch((err) => {
        console.log(err);
      })
})


router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Product.findByIdAndDelete(id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
});

router.put('/:id', (req, res) => {

    const id = req.params.id;
    Product.findByIdAndUpdate({id})
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
})

export default router;