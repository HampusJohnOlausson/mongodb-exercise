import express from 'express';
import Post from '../models/post.model.js';
const postRouter = express.Router();

postRouter.get("/", (req, res) => {
  res.send('hello');
  // Post.find().sort({ createdAt: -1 })
  //   .then((result) => {
  //     res.send(result);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

postRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  Post.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

postRouter.post('/',(req, res) => {
    
    const post = new Post(req.body.post);
    post.save()
      .then((result) => {
        res.send(result);
        // res.redirect('/products');
      })
      .catch((err) => {
         return console.log(err);
      })
})


postRouter.delete('/:id', (req, res) => {
    const id = req.params.id;

    Post.findByIdAndDelete(id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
});

postRouter.put('/:id', (req, res) => {

    const id = req.params.id;
    const currentProduct = Post.findById(id);

    Post.findByIdAndUpdate(id, {
      post: req.body.post,
    })
      .then((result) => {
        res.status(202).json(null);
      })
      .catch((err) => {
        console.log(err);
      });
})

export default postRouter;