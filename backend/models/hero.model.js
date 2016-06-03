const mongoose = require('mongoose');

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Hero', {
    name: {type: String, required: true}
});
