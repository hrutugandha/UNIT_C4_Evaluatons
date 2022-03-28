const express = require('express');
const {register,login} = require('./contollers/auth.controller')
const userController = require('./contollers/user.controller');
const todoController = require('./contollers/todo.controller');

const app = express();

app.use(express.json());

app.use("/user",userController);
app.post('/register',register);
app.post('/login',login);
app.use('/todo', todoController);

app.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));

app.get('/auth/google/callback',passport.authenticate('google',{failureredirect:'/login', session:true}),

  function (req, res) {
      const token = generateToken(req.user)

      return res.status(200).send({user:req.user,token:token})
  }
);

module.exports = app;