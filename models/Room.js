const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    room_no: { type : String , unique : true , required: true},
    hotel_id:{type: Schema.Types.ObjectId, ref: 'hotel'},
    reserved_dates: [
        {   
            user_id: {type: Schema.Types.ObjectId, ref: 'user'},
            start_date: { type : String , required: true},
            end_date: { type : String ,  required: true}
        }
    ]
      
    
});

module.exports = mongoose.model('room',roomSchema);