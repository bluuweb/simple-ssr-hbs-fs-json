import express from 'express'
import { engine } from 'express-handlebars';
import todoRoutes from './routes/todo.route.js'
// import userRoutes from './routes/user.route.js'

const app = express()

const __dirname = import.meta.dirname

// static directory
app.use(express.static(__dirname + "/public"))

// handlebars
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', __dirname + '/views');

// habilitar el req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// /todos
app.use('/todos', todoRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('server andando...'))