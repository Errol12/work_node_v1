const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

const hotelSchema = new Schema({
	name: String
	
});

module.exports = mongoose.model('hotel',hotelSchema,'hotels');


const roomSchema = new Schema({
    room_no: String,
    hotel_id: [
        {type: Schema.Types.ObjectId, ref: 'hotel'}
      ]
    
});

module.exports = mongoose.model('room',roomSchema,'rooms');

const roomBookingSchema = new SVGAElement({
    room_id: [
        {type: Schema.Types.ObjectId, ref: 'room'}
      ],
    start_time: String,
    end_time: String
})

module.exports = mongoose.model('roomBooking',roomBookingSchema);