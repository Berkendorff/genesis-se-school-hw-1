const express = require('express');
const router = express.Router();

const btcRate = require('../lib/rater');

const secureRoutes = () => {
    router.get(
        '/btcRate',
        async (req, res) => {
            const rate = (await btcRate()).toFixed(2);
            res.json({
                message: `BTC Rate: ${rate} UAH`,
                btcRate: rate
            })
        },
    );

    return router;
}

module.exports = secureRoutes;