const Todo = require('../model/todo');

exports.getAllData = async (req, res) => {
    try {
        let alltodo = await Todo.findAll();
        if (!alltodo) {
            return res.status(400).json({ message: 'Todos not found' });
        }
        res.status(200).json({ allData: alltodo });
    } catch (err) {
        console.log("get todo error = " + JSON.stringify(err));
        res.status(400).json({ error: err });
    }
}

exports.postAddTodo = async (req, res, next) => {
    try {
        const todoname = req.body.todoname;
        console.log('todo name = ' + todoname);

        const newTodo = await Todo.create({
            name: todoname,
        });
        console.log('newTodo = ' + JSON.stringify(newTodo));

        res.status(201).json({ newTodoData: newTodo });

    } catch (err) {
        console.log("post todo error = " + JSON.stringify(err));
        res.status(500).json({
            error: err,
        })
    }
}

exports.getTodo = async (req, res) => {
    try {
        const id = req.params.id;
        console.log('getTodo id = ' + id);

        const particularTodo = await Todo.findOne({ where: { id: id } });
        console.log('particularTodo = ' + JSON.stringify(particularTodo));

        if (!particularTodo) {
            return res.status(400).json({ message: 'Todo not found' });
        }
        res.status(200).json({ particularTodoData: particularTodo });

    } catch (err) {
        console.log("error = " + JSON.stringify(err));
        res.status(500).json({ message: 'Failed to get todo' })
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;
        console.log('deleteTodo id = ' + id);

        const particularTodo = await Todo.findAll({ where: { id: id } });
        console.log('particularTodo = ' + JSON.stringify(particularTodo));
        if (!particularTodo) {
            return res.status(400).json({ message: 'Todo not found' });
        }

        //delete todo
        await Todo.destroy({ where: { id: id } });
        res.status(200).json({ message: 'Todo deleted successfully' });

    } catch (err) {
        console.log("error = " + JSON.stringify(err));
        res.status(500).json({ message: 'Failed to delete todo' });
    }
}