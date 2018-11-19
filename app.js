const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const movieModel = require('./movieModel');

mongoose.connect("mongodb://localhost/dbname", { useNewUrlParser: true })

app.use(bodyParser.json());

app.use('/', express.static('angular'))

app.get('/api/movie', function (req, res) {
    movieModel.find(function (err, movies) {
        return res.json(movies);
    });
});

app.get('/api/movie/:id', function (req, res) {
    movieModel.findOne({_id: req.params.id}, function (err, movie) {
        return res.json(movie);
    });
},);
app.post('/api/movie', function (req, res) {
    var movie = new movieModel({
        title : req.body.title,
        genre : req.body.genre,
        description : req.body.description,
        imageurl : req.body.imageurl

    });
    movie.save(function (err, movie) {
        res.json(movie);
    });
});
app.put('/api/movie/:id', function (req, res) {
    var id = req.params.id;
    movieModel.findOne({_id: id}, function (err, movie) {
        movie.title = req.body.title
        movie.genre = req.body.genre
        movie.description = req.body.description
        movie.save(function (err, movie) {
            return res.json(movie);
        });
    });
});
app.delete('/api/movie/:id', function (req, res) {
    var id = req.params.id;
    movieModel.findByIdAndRemove(id, function (err, movie) {
        return res.json();
    });
});


app.listen(2000, () => {
    console.log("Listening on port: 2000")
})
