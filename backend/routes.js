const express = require('express');
const router = express.Router();
const heroRoutes = require('./routes/hero.routes.js');

router.route('/heroes')
    .post(heroRoutes.postHero)
    .get(heroRoutes.getHeroes);

router.route('/heroes/:heroId')
    .get(heroRoutes.getHero)
    .put(heroRoutes.putHero)
    .delete(heroRoutes.deleteHero);

module.exports = router;
