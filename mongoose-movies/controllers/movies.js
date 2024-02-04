const Movie = require('../models/movie');

const newMovie = (req, res) => {
    let title = "Add new Movie";
	res.render('movies/new', { title });
}

const create = async(req, res) => {

    if (req.body.cast){
        req.body.cast = req.body.cast.split(',');
    }

    req.body.nowShowing = !!req.body.nowShowing

    for(let key in req.body){
        if(req.body[key] == ''){
            delete req.body[key]
        }
    }

    try {
        await Movie.create(req.body);
        res.redirect('movies/new')
    } catch (error) {
        console.log(error)
        res.redirect('movies/new')
    }
}

const index = async (req, res) => {

    try {
        const movies = await Movie.find({})
        const title = "All Movies"
        res.render('movies/index', { movies, title });
    } catch (error){
        console.log(error)
        res.redirect('/')
    }
};


module.exports = {
    new: newMovie,
    create,
    index
};