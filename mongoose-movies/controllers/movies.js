const Movie = require('../models/movie');

const newMovie = (req, res) => {
    let title = "Add new Movie";
	res.render('movies/new', { title });
}

const create = async(req, res) => {

    if (req.body.cast){
        req.body.cast = req.body.cast.split(',');
    }

    try {
        await Movie.create(req.body);
        res.redirect('movies/new')
    } catch (error) {
        console.log(error)
        res.redirect('movies/new')
    }
}


module.exports = {
    new: newMovie,
    create
};