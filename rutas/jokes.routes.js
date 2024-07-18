const express = require('express');
const ControladorDeBromas = require('./../controladores/jokes.controller');
const routerJokes = express.Router();

routerJokes.get('/jokes', ControladorDeBromas.todosLosChistes);
routerJokes.get('/jokes/random', ControladorDeBromas.obtenerChisteAleatorio); // Mueve esta línea antes de la ruta con :id
routerJokes.get('/jokes/:id', ControladorDeBromas.obtenerUnChiste);
routerJokes.post('/jokes/new', ControladorDeBromas.agregarNuevoChiste);
routerJokes.put('/jokes/update/:id', ControladorDeBromas.actualizarUnChiste);
routerJokes.delete('/jokes/delete/:id', ControladorDeBromas.eliminarUnChiste);

module.exports = routerJokes;
