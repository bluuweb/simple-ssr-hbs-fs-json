import { Router } from "express"
import { todoController } from "../controllers/todo.controller.js"

const router = Router()

// CRUD de un archivo JSON
// READ

// PATH = /todos

router.get('/', todoController.getTodos)

// CREATE
router.post('/', todoController.createTodo)

// DELETE
router.delete('/:id', todoController.deleteTodo)

// UPDATE
router.put('/:id', todoController.updateTodo)

// FORM EDIT
router.get('/edit/:id', todoController.formEditTodo)

export default router;