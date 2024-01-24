const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [];

app.get('/', (req, res) => {
    res.send(`
    <h1> Personajes </h1>
    <ul>
    ${usuarios
            .map(
                (usuario) => `<li> id: ${usuario.id} | Nombre: ${usuario.nombre} | Procedencia: ${usuario.procedencia} </li>`
            )
            .join('')}
    </ul>
    <form action = "/usuarios" method = "post">
    <label for "nombre"> Nombre </label>
    <input type = "text" id = "nombre" name = "nombre" required>
    <label for "procedencia"> Procedencia </label>
    <input type = "text" id = "procedencia" name = "procedencia" required>
    <button type = submit> Agregar personaje </button>
    </form>
    <a href = "/usuarios"> Usuarios (formato json) </a>`)
});
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.post('/usuarios', (req, res) => {
    const newUser = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        procedencia: req.body.procedencia
    };
    usuarios.push(newUser);
    res.redirect('/');

})


app.listen(3000, () => {
    console.log('Express está escuchando en el puerto 3000');
})