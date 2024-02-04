const mongoose = require('mongoose');

const Schema = mongoose.Schema;
	
const movieSchema = new Schema({
  title: String,
  releaseYear: {type: Number, default: 2000},
  mpaaRating: {
    type: String, 
    required: true,
    enum: ['G', 'PG', 'PG-13', 'R'] },
  cast: [String],
  nowShowing: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);