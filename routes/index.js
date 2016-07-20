var express = require('express');
var router = express.Router();
var Book = require('../models/book');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Welcome to BookAPI'});
});

/* GET books listing. */
router.route('/books')
    .get(function (req, res) {
        var query = {};

        if(req.query.title){
            query.title = req.query.title;
        }
        if(req.query.author){
            query.author = req.query.author;
        }
        if(req.query.genre){
            query.genre = req.query.genre;
        }
        if(req.query.read){
            query.read = req.query.read;
        }

        Book.find(query, function (err, books) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(books);
            }
        });
    });

router.route('/books/:bookId')
    .get(function (req, res) {

        Book.findById(req.params.bookId, function (err, book) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(book);
            }
        });
    });

module.exports = router;
