const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getTodo, addTodo, updateTodo, getTodos, deleteTodo } = require('./todo.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getTodos)
router.get('/:id', getTodo)
router.post('/', log, requireAuth, addTodo)
router.put('/', log, requireAuth, updateTodo)
router.delete('/:id', requireAuth, deleteTodo)

module.exports = router