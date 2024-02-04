const Movie = require('../models/movie');

const newMovie = (req, res) => {
    let title = "Add new Movie";
	res.render('movies/new', { title });
}

const create = async(req, res) => {
    try {
        
	//In this code, the double negation (!!) is used to convert the value of req.body.nowShowing 
	//to a boolean. The reason for this is that HTML forms, when submitting a checked checkbox, 
        //send the value as the string "on." By using !!, it's converted to a boolean value:
        req.body.nowShowing = !!req.body.nowShowing;

	// Check if cast is provided and not an empty string
	if (req.body.cast) {
	  // Remove any whitespace at the start and end of cast
	  req.body.cast = req.body.cast.trim();
	  // Split cast into an array using a regular expression as a separator
	  req.body.cast = req.body.cast.split(/\s*,\s*/);
	}

	const movie = new Movie(req.body);

	// Additional processing before saving to the database
	if (movie.title) {
	  // Example: Convert the title to uppercase before saving
	  movie.title = movie.title.toUpperCase();
	}

        await movie.save();
        console.log(movie);
        // for now, redirect right back to new.ejs
        res.redirect('/movies/new');
      } catch (err) {
        console.error(err);
        res.redirect('/movies/new');
      }
}


module.exports = {
    new: newMovie,
    create
};