const User = require('../models/user.model');

const Todo = require('../models/todo.model')

const app = require('../index');

const authenticate = require('../middleware/authenticate');
const authorise = require('../middleware/authorise');

const router = require('../contollers/user.controller')

router.post('/',authenticate, async (req, res) => {
    try{
        const todo = await User.create(req.body);

        return res.status(200).send(todo);

    }catch(err){
      return res.status(400).send({message: err.message});
    }
});

router.get('', async (req, res) => {
    try{
        const todo = await Todo.find().lean().exec();

        return res.status(200).send(todo);

    }catch(err){
      return res.status(400).send({message: err.message});
    }
});

router.post("/:id",authorise, (req,res) => {
    try{
        const todo = await Todo.create();

        return res.status(200).send(todo);

    }catch(err){
      return res.status(400).send({message: err.message});
    }
})

