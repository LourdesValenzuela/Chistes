const express = require('express');
const app = express();
const RouterJokes = require('./rutas/jokes.routes');

require('./configuracion/mongoose.config');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', RouterJokes);

app.listen(8080, () => {
    console.log('El servidor ya está encendido en el puerto 8080.')
});

