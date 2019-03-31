const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    _id: Schema.Types.ObjectId,
	title: { type : String , unique : true , required: true }
	
});

module.exports = mongoose.model('hotel',hotelSchema);