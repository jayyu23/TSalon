const express = require('express')
const router = express.Router();
const ArticleModel = require('../models/article');

router.get('/articles/:id', (req, res) => {
    console.log('hi')
    article_id = req.params.id
    ArticleModel.findById(id).exec().then((result) => {
        content = result.content;
        res.send(content);
    });
});

module.exports = router;