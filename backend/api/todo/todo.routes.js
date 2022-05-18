const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {log} = require('../../middlewares/logger.middleware')
const {addTodo, getTodos, deleteTodo} = require('./todo.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getTodos)
router.post('/',  log, requireAuth, addTodo)
router.delete('/:id',  requireAuth, deleteTodo)

module.exports = router