const logger = require('../../services/logger.service')
// const userService = require('../user/user.service')
const socketService = require('../../services/socket.service')
const todoService = require('./todo.service')

async function getTodos(req, res) {
    try {
        const todos = await todoService.query(req.query)
        res.send(todos)
    } catch (err) {
        logger.error('Cannot get todos', err)
        res.status(500).send({ err: 'Failed to get todos' })
    }
}

async function getTodo(req, res) {
    try {
        const todo = await todoService.getById(req.params.id)
        res.send(todo)
    } catch (err) {
        logger.error('Failed to get todo', err)
        res.status(500).send({ err: 'Failed to get todo' })
    }
}

async function deleteTodo(req, res) {
    try {
        await todoService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete todo', err)
        res.status(500).send({ err: 'Failed to delete todo' })
    }
}


async function addTodo(req, res) {
    try {
        console.log('Hey addTodo');
        var todo = req.body
        todo = await todoService.add(todo)
        console.log('todo', todo);
        res.send(todo)

    } catch (err) {
        console.log(err)
        logger.error('Failed to add todo', err)
        res.status(500).send({ err: 'Failed to add todo' })
    }
}

async function updateTodo(req, res) {
    try {
        console.log('updateTodo');
        var todo = req.body
        todo = await todoService.update(todo)
        console.log('todo', todo);
        res.send(todo)

    } catch (err) {
        console.log(err)
        logger.error('Failed to add todo', err)
        res.status(500).send({ err: 'Failed to add todo' })
    }
}

module.exports = {
    getTodos,
    deleteTodo,
    addTodo,
    updateTodo,
    getTodo
}