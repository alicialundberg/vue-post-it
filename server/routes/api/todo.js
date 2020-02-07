const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
  const todos = await loadTodosCollection();
  res.send(await todos.find({}).toArray());
});

// Add Post
router.post('/', async (req, res) => {
    const todos = await loadTodosCollection();
    await todos.insertOne({
      todoTitle: req.body.title,
      todoNote: req.body.note
    });
    res.status(201).send();
  });
  
  // Delete Post
  router.delete('/:id', async (req, res) => {
    const todos = await loadTodosCollection();
    await todos.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send({});
  });

  router.put('/update/:id', async (req, res) => {
    const todos = await loadTodosCollection();
    console.log(req.params.id);
    todos.updateOne(
      { _id: new mongodb.ObjectID(req.params.id) },
      { $set: { "todoTitle": req.body.title, "todoNote": req.body.note }}, 
      function (err, doc) {
      if (err)
        return console.error(err);
      console.log("dokument har blivit uppdaterat!");
    }); 
    res.status(200).send({});
    })

  // Initialize database
  async function loadTodosCollection() {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://DBadmin:Karlskron4@miun-j3cpp.mongodb.net/test?retryWrites=true&w=majority";
    const client = await new MongoClient.connect(uri, {useNewUrlParser: true});
  
    return client.db("todolist").collection("todos");
  }
 

  
module.exports = router;