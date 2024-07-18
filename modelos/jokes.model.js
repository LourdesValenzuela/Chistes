const mongoose = require('mongoose');

const CollectionJokes = mongoose.Schema({
    setup: {
        type: String,
        required: [true, 'El campo "setup" es obligatorio'],
        minlength: [10, 'El campo "setup" debe tener al menos 10 caracteres']
    },
    punchline: {
        type: String,
        required: [true, 'El campo "punchline" es obligatorio'],
        minlength: [3, 'El campo "punchline" debe tener al menos 3 caracteres']
    }
});

const Jokes = mongoose.model('broma', CollectionJokes);

module.exports = Jokes;

