const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    _id: Schema.Types.ObjectId,
	title: String
	
});

module.exports = mongoose.model('hotel',hotelSchema);