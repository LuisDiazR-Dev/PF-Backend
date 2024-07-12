# Rutas de Usuarios

Este documento proporciona una breve explicación del uso de las rutas, consultas (queries) y el cuerpo de las solicitudes (body) para el equipo de Frontend.

## Definición de Rutas

Las rutas para gestionar las solicitudes relacionadas con los usuarios están definidas utilizando Express Router. A continuación se presentan las rutas y sus métodos asociados.

### `GET "/"`

Ruta para obtener todos los usuarios.

#### Query Parameters (opcional)

- `search`: Filtra usuarios por username o email.

#### Ejemplo de Uso

```http
GET /users ---> Obtiene todos los usuarios
GET /users?search=John ---> Obtiene los usuarios por busqueda de username y email
```

### `GET "/:id"`

Ruta para obtener el usuario por id.

#### Params

- `:id`: por id del usuario

#### Ejemplo de Uso

```http
GET /users/:id ---> Obtiene todos el usuario por id
```

### `POST "/"`

Ruta para crear usuario.

#### Body

Se debe enviar el modelo de usuario con los siguientes datos:

- userName
- email
- password
- bio (opcional)
- image (url)

#### Ejemplo de Uso

```http
GET /users/:id ---> Obtiene todos el usuario por id
```
