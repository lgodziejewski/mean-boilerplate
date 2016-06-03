const Hero = require('../models/hero.model');

// Create endpoint /api/heroes for POST
exports.postHero = (req, res) => {
    //Create new instance of hero model
    var hero = new Hero();

    //Set the properties
    hero.name = req.body.name;

    hero.save((err) => {
        if (err) {
            res.status(400).json({error: 'Bad request'});
            return;
        }
        res.json(hero);
    });
};

// Create endpoint /api/heroes for GET
exports.getHeroes = (req, res) => {
    Hero.find((err, heroes) => {
        if (err) {
            res.status(400).json({error: 'Bad request'});
            return;
        }
        res.json(heroes);
    });
};

// Create endpoint /api/heroes/:heroId for GET
exports.getHero = (req, res) => {
    // Use the Hero model to find a specific hero
    Hero.findById(req.params.heroId, (err, hero) => {
        if (err) {
            res.status(400).json({error: 'Bad request'});
            return;
        }
        res.json(hero);
    });
};

// Create endpoint /api/heroes/:heroId for PUT
exports.putHero = (req, res) => {
    Hero.findById(req.params.heroId, (err, hero) => {

        if (err) {
            res.status(400).json({error: 'Bad request'});
            return;
        }

        hero.name = req.body.name;

        hero.save((err) => {
            if (err) {
                res.status(400).json({error: 'Bad request'});
                return;
            }
            res.json(hero.toJSON());
        });
    });
};

// Create endpoint /api/heroes/:heroId for DELETE
exports.deleteHero = (req, res) => {

    Hero.findByIdAndRemove(req.params.heroId, (err, hero) => {
        if (err) {
            res.status(400).json({error: 'Bad request'});
            return;
        }
        res.json(hero.toJSON());
    });
};
