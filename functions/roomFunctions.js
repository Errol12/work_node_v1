const Room = require('../models/Room');

const getAvailableDates = (start_date,end_date) =>
{
    return new Promise(function(resolve,reject){
        Room.find({
            reserved_dates: { 
                
                $not: {
                        $elemMatch: {start_date: {$lte: start_date.substring(0,10)}, end_date: {$gte: end_date.substring(0,10)}}
                }
        
        }
        },function(err,getrooms){
            if(err){
                console.log(err);
            }
            else{
                //res.json(getrooms);
                resolve(getrooms)
            }
        })
    });
}


const addRoom = (room_no,hotel_id) => {
    return new Promise(function(resolve,reject){
        var newRoom = new Room();
        newRoom.room_no = room_no;
        newRoom.hotel_id = hotel_id;
        newRoom.save(function(err,insertedRoom){
		    if(err){
			    console.log('Error in saving room');
		    }else{
			    resolve(insertedRoom);
		    }
	    })
    })
}

const bookRoom = (room_id,user_id,start_date,end_date) => {
    return new Promise(function(resolve,reject){
        Room.findByIdAndUpdate(room_id, {
            $push: {"reserved_dates": {user_id: user_id,start_date: start_date, end_date: end_date}}
        }, {
            safe: true,
            new: true
        }, function(err, room){
            if(err){
                console.log('Error in saving room');
            } else {
                resolve(room);
            }
        });


    })
}


module.exports = {
    getAvailableDates,
    addRoom,
    bookRoom
}