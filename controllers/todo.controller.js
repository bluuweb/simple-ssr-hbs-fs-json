import { readFile, writeFile } from 'fs/promises'
import { nanoid } from 'nanoid'

import path from "path"

// Ruta absoluta
const __dirname = import.meta.dirname
const pathFile = path.join(__dirname, "../data/todos.json")

const getTodos = async (req, res) => {
    try {
        const stringTodos = await readFile(pathFile, 'utf8')
        const todos = JSON.parse(stringTodos)
        return res.render("todos", { todos })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
}

const createTodo = async (req, res) => {
    try {
        const { title = '' } = req.body
        const newTodo = {
            id: nanoid(),
            title: title,
            completed: false
        }
        const stringTodos = await readFile(pathFile, 'utf8')
        const todos = JSON.parse(stringTodos)
        todos.push(newTodo)
        await writeFile(pathFile, JSON.stringify(todos))
        return res.redirect('/todos')
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
}

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params
        const stringTodos = await readFile(pathFile, 'utf8')
        const todos = JSON.parse(stringTodos)

        const todo = todos.find(item => item.id === id)
        if (!todo) return res.status(404).json({ ok: false, msg: "no se encontró el todo" })

        const newTodos = todos.filter(item => item !== todo)

        await writeFile(pathFile, JSON.stringify(newTodos))
        return res.json(newTodos)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
}

const updateTodo = async (req, res) => {
    try {
        const { id } = req.params
        const { title, completed } = req.body

        const stringTodos = await readFile(pathFile, 'utf8')
        const todos = JSON.parse(stringTodos)

        const todo = todos.find(item => item.id === id)
        if (!todo) return res.status(404).json({ ok: false, msg: "no se encontró el todo" })

        todo.title = title
        todo.completed = completed

        await writeFile(pathFile, JSON.stringify(todos))

        return res.json(todos)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
}

const formEditTodo = async (req, res) => {
    const { id } = req.params

    const stringTodos = await readFile(pathFile, 'utf8')
    const todos = JSON.parse(stringTodos)

    const todo = todos.find(item => item.id === id)
    if (!todo) return res.status(404).json({ ok: false, msg: "no se encontró el todo" })

    return res.render('todo-edit', { todo })
}

export const todoController = {
    getTodos,
    createTodo,
    deleteTodo,
    updateTodo,
    formEditTodo
}