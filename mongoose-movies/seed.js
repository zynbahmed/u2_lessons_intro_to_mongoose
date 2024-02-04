require('dotenv').config();  // Necessary if connection string is in a .env file
require('./config/database');  // Execute the code to connect to the db 

const Movie = require('./models/movie');

// Define an async function to create the movie in the database 
const createMovie = async () => {
  try {

    const doc = await Movie.create({
      title: 'Star Wars - A New Hope',
      releaseYear: 1977,
      mpaaRating: "PG",
      cast: ["Mark Hamill", "Carrie Fisher", "Harrison Ford"],
      nowShowing: true
    });

    console.log("Done creating movie", doc);
  } catch (err) {
    console.error(err);
  }
};

// Call the async function
createMovie();