const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

const roomBookingSchema = new Schema({
    room_id: [
        {type: Schema.Types.ObjectId, ref: 'room'}
      ],
    start_time: String,
    end_time: String
})

module.exports = mongoose.model('roomBooking',roomBookingSchema);