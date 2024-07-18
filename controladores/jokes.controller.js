const Jokes = require('./../modelos/jokes.model');

// Función para obtener todos los chistes
module.exports.todosLosChistes = (req, res) => {
    Jokes.find()
        .then((listaChistes) => {
            return res.status(200).json(listaChistes);
        })
        .catch((error) => {
            return res.status(400).json(error);
        });
};

// Función para obtener un chiste por su ID
module.exports.obtenerUnChiste = (req, res) => {
    Jokes.findById(req.params.id)
        .then((chisteEncontrado) => {
            if (!chisteEncontrado) {
                res.statusMessage = 'Chiste no encontrado.';
                return res.status(404).json({ mensaje: 'Chiste no encontrado.' });
            }
            return res.status(200).json(chisteEncontrado);
        })
        .catch((error) => {
            return res.status(400).json(error);
        });
};

// Función para agregar un nuevo chiste
module.exports.agregarNuevoChiste = (req, res) => {
    const { setup, punchline } = req.body;

    if (!setup || !punchline) {
        return res.status(400).json({ mensaje: 'Por favor proporcione setup y punchline' });
    }

    if (setup.length < 10 || punchline.length < 3) {
        return res.status(400).json({ mensaje: 'El setup debe tener al menos 10 caracteres y la punchline al menos 3 caracteres.' });
    }

    Jokes.create(req.body)
        .then(nuevoChiste => res.status(201).json(nuevoChiste))
        .catch(error => res.status(400).json(error));
};

// Función para actualizar un chiste existente
module.exports.actualizarUnChiste = (req, res) => {
    const { setup, punchline } = req.body;

    if (!setup || !punchline) {
        return res.status(400).json({ mensaje: 'Por favor proporcione setup y punchline' });
    }

    if (setup.length < 10 || punchline.length < 3) {
        return res.status(400).json({ mensaje: 'El setup debe tener al menos 10 caracteres y la punchline al menos 3 caracteres.' });
    }

    Jokes.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((chisteActualizado) => {
            if (!chisteActualizado) {
                res.statusMessage = 'Chiste no encontrado.';
                return res.status(404).json({ mensaje: 'Chiste no encontrado.' });
            }
            return res.status(200).json(chisteActualizado);
        })
        .catch((error) => {
            return res.status(400).json(error);
        });
};

// Función para eliminar un chiste existente
module.exports.eliminarUnChiste = (req, res) => {
    Jokes.findByIdAndDelete(req.params.id)
        .then((chisteEliminado) => {
            if (!chisteEliminado) {
                res.statusMessage = 'Chiste no encontrado.';
                return res.status(404).json({ mensaje: 'Chiste no encontrado.' });
            }
            return res.status(204).end();
        })
        .catch((error) => {
            return res.status(400).json(error);
        });
};

// Función para obtener un chiste aleatorio
module.exports.obtenerChisteAleatorio = (req, res) => {
    Jokes.aggregate([{ $sample: { size: 1 } }])
        .then((chistesAleatorios) => {
            if (!chistesAleatorios || chistesAleatorios.length === 0) {
                return res.status(404).json({ mensaje: 'No se encontraron chistes.' });
            }
            res.status(200).json(chistesAleatorios[0]);
        })
        .catch((error) => {
            res.status(400).json(error);
        });
};





