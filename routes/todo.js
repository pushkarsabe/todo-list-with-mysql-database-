const express = require('express');

const router = express.Router();

const todoController = require('../controller/todo');

//to post the rout
router.post('/add-todo', todoController.postAddTodo);

router.delete('/delete-todo/:id', todoController.deleteTodo);

//to get all data
router.get('/get-todo', todoController.getAllData);

router.get('/get-todo/:id', todoController.getTodo);

module.exports = router;