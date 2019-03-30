const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

const roomBookingSchema = new Schema({
    room_id: {type: Schema.Types.ObjectId, ref: 'room'},
    user_id: {type: Schema.Types.ObjectId, ref: 'user'},
    reserved_dates: [
        {   
            user_id: {type: Schema.Types.ObjectId, ref: 'user'},
            start_date: String,
            end_date: String
        }
    ]
})

module.exports = mongoose.model('roomBooking',roomBookingSchema);