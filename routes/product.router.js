import express from 'express';
const router = express.Router();

const products = [
    {
        "id": 1,
        "color": "red",
        "item": "shirt"
    }
];


router.get('/',(req, res) => {
    res.send(products);
})

router.get('/:id', (req, res) => {
  res.send(products);
});

router.post('/',(req, res) => {
  res.send(products);
});

router.delete('/:id', (req, res) => {
  res.send(products);
});

router.put('/:id', (req, res) => {
    res.send(products);
})

export default router;