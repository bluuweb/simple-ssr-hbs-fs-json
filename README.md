# CRUD fileSystem + HBS

## Rutas

### Devolver todos los todos
```sh
GET /todos
```

### Agregar nuevo todo
```sh
POST /todos
```

body
```json
{
    "title": "nueva tarea"
}
```

### Eliminar todo
```sh
DELETE /todos/:id
```

### Actualizar todo
```sh
PUT /todos/:id
```

body
```json
{
    "title": "nueva tarea",
    "completed": true
}
```