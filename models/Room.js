const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    room_no: { type : String , unique : true },
    hotel_id:{type: Schema.Types.ObjectId, ref: 'hotel'},
    reserved_dates: [
        {   
            user_id: {type: Schema.Types.ObjectId, ref: 'user'},
            start_date: String,
            end_date: String
        }
    ]
      
    
});

module.exports = mongoose.model('room',roomSchema);