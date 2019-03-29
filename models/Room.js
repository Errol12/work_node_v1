const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    room_no: String,
    hotel_id:{type: Schema.Types.ObjectId, ref: 'hotel'}
      
    
});

module.exports = mongoose.model('room',roomSchema);