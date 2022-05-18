import { Todo, Todos } from '../models/Todo.model';
import { asyncStorageService } from './async-storage.service';
import { storageService } from './storage.service';
import { utilService } from './util.service';
import { httpService } from './http.service';

const TODOS: Todos = [
    {
        _id: utilService.makeId(),
        createdAt: Date.now() - 100000,
        content: 'Buy guy a birthdate cake!',
        isDone: false,
        importance: 3
    },
    {
        _id: utilService.makeId(),
        createdAt: Date.now() - 200000,
        content: 'Finish homework',
        isDone: false,
        importance: 1
    },
    {
        _id: utilService.makeId(),
        createdAt: Date.now() - 300000,
        content: 'Get some rest',
        isDone: false,
        importance: 5
    },
    {
        _id: utilService.makeId(),
        createdAt: Date.now() - 350000,
        content: 'Go to the dentist',
        isDone: false,
        importance: 4
    },
    {
        _id: utilService.makeId(),
        createdAt: Date.now() - 400000,
        content: 'Go on a date with Oshra',
        isDone: false,
        importance: 1
    },
    {
        _id: utilService.makeId(),
        createdAt: Date.now() - 250000,
        content: 'Build some server with express',
        isDone: false,
        importance: 2
    },
    {
        _id: utilService.makeId(),
        createdAt: Date.now() - 150000,
        content: 'Upload to Github!',
        isDone: false,
        importance: 1
    },
    {
        _id: utilService.makeId(),
        createdAt: Date.now() - 150000,
        content: 'Remove some tasks',
        isDone: false,
        importance: 3
    },
    {
        _id: utilService.makeId(),
        createdAt: Date.now() - 150000,
        content: 'Workout',
        isDone: false,
        importance: 4
    },
    {
        _id: utilService.makeId(),
        createdAt: Date.now() - 150000,
        content: 'Go to the beach',
        isDone: false,
        importance: 2
    },
]

const KEY = 'todoDb';

export const todoService = {
    query,
    getById,
    remove,
    save,
    getEmptyTodo,
    toggleTodo
}

async function toggleTodo(id: string) {
    const todo = await getById(id)
    todo.isDone = !todo.isDone
    return await save(todo)
}

async function query(): Promise<Todo[] | undefined> {
    // if (!storageService.load(KEY)) storageService.store(KEY, TODOS)
    // return asyncStorageService.query(KEY)
    return await httpService.get('todo/')
}

function getById(id: string): Promise<Todo | undefined> {
    return asyncStorageService.get(KEY, id)
}

function remove(id: string) {
    return asyncStorageService.remove(KEY, id)
}

function save(todo: Todo): Promise<Todo> {
    try {
        const prm = (todo._id) ? asyncStorageService.put(KEY, todo) : asyncStorageService.post(KEY, todo)
        return prm
    } catch (err) {
        console.log(err);
        throw err
    }
}

function getEmptyTodo(): Promise<Todo> {
    return new Promise((res, rej) => {
        res({
            _id: '',
            createdAt: 0,
            content: '',
            isDone: false,
            importance: 1
        })
    })
}