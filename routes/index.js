var express = require('express');
var router = express.Router();

var Book = require('../models/book');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Welcome to BookAPI'});
});

router.route('/books')
/* GET books listing. */
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
    })
    .post(function(req, res){
        var book = new Book(req.body);

        book.save();

        res.status(201).send(book);
    });

router.use('/:bookId', function(req, res, next){
    Book.findById(req.params.bookId, function (err, book) {
        if (err) {
            res.status(500).send(err);
        } else if(book){
            req.book = book;
            next();
        }else{
            res.status(404).send('No Book Found');
        }
    });
});

router.route('/:bookId')
/* GET a single book by id */
    .get(function (req, res) {
        res.json(req.book);
    })
    .put(function(req, res){

        req.book.title = req.body.title;
        req.book.author = req.body.author;
        req.book.genre = req.body.genre;
        req.book.read = req.body.read;
        req.book.save();
        res.json(book);
    });

module.exports = router;