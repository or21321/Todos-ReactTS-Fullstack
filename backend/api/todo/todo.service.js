const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try {
        // const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('todo')
        // const todos = await collection.find(criteria).toArray()
        // var todos = await collection.aggregate([
        //     {
        //         $match: criteria
        //     },
        //     {
        //         $lookup:
        //         {
        //             localField: 'byUserId',
        //             from: 'user',
        //             foreignField: '_id',
        //             as: 'byUser'
        //         }
        //     },
        //     {
        //         $unwind: '$byUser'
        //     },
        //     {
        //         $lookup:
        //         {
        //             localField: 'aboutUserId',
        //             from: 'user',
        //             foreignField: '_id',
        //             as: 'aboutUser'
        //         }
        //     },
        //     {
        //         $unwind: '$aboutUser'
        //     }
        // ]).toArray()
        // todos = todos.map(todo => {
        //     todo.byUser = { _id: todo.byUser._id, fullname: todo.byUser.fullname }
        //     todo.aboutUser = { _id: todo.aboutUser._id, fullname: todo.aboutUser.fullname }
        //     delete todo.byUserId
        //     delete todo.aboutUserId
        //     return todo
        // })
        const todos = await collection.find({}).toArray()
        console.log('todos from service', todos);
        return todos
    } catch (err) {
        logger.error('cannot find todos', err)
        throw err
    }

}

async function remove(todoId) {
    try {
        // const store = asyncLocalStorage.getStore()
        // const { userId, isAdmin } = store
        const collection = await dbService.getCollection('todo')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(todoId) }
        // if (!isAdmin) criteria.byUserId = ObjectId(userId)
        await collection.deleteOne(criteria)
    } catch (err) {
        logger.error(`cannot remove todo ${todoId}`, err)
        throw err
    }
}


async function add(todo) {
    try {
        // const todoToAdd = {
        //     byUserId: ObjectId(todo.byUserId),
        //     aboutUserId: ObjectId(todo.aboutUserId),
        //     txt: todo.txt
        // }
        const todoToAdd = {
            ...todo,
            createdAt: Date.now()
        }
        const collection = await dbService.getCollection('todo')
        await collection.insertOne(todoToAdd)
        return todoToAdd;
    } catch (err) {
        logger.error('cannot insert todo', err)
        throw err
    }
}

// function _buildCriteria(filterBy) {
//     const criteria = {}
//     if (filterBy.byUserId) criteria.byUserId = filterBy.byUserId
//     return criteria
// }

module.exports = {
    query,
    remove,
    add
}


