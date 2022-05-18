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
        var todo = req.body
        // todo.byUserId = req.session.user._id
        todo = await todoService.add(todo)

        // prepare the updated todo for sending out
        // todo.aboutUser = await userService.getById(todo.aboutUserId)

        // Give the user credit for adding a todo
        // var user = await userService.getById(todo.byUserId)
        // user.score += 10;
        // user = await userService.update(user)
        // todo.byUser = user
        // const fullUser = await userService.getById(user._id)

        // console.log('CTRL SessionId:', req.sessionID);
        // socketService.broadcast({type: 'todo-added', data: todo, userId: todo.byUserId})
        // socketService.emitToUser({type: 'todo-about-you', data: todo, userId: todo.aboutUserId})
        // socketService.emitTo({type: 'user-updated', data: fullUser, label: fullUser._id})

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
    addTodo
}