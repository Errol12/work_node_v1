const Hotel = require('../models/Hotel');
const Room = require('../models/Room');

const addHotel = (id,hotel_title) => {
    return new Promise(function(resolve,reject){
        var newHotel = new Hotel();
        newHotel._id = id;
        newHotel.title = hotel_title;
        newHotel.save(function(err,insertedHotel){
		    if(err){
			    console.log('Error in saving hotel');
		    }else{
			    resolve(insertedHotel);
		    }
	    })
    })
}


const updateHotel = (hotel_id,hotel_title) => {
    return new Promise(function(resolve,reject){
        Hotel.findByIdAndUpdate(hotel_id,
            {
                $set: {	title: hotel_title }
            },
            {
                new: true
            },
            function(err,updatedHotel){
                if(err){
                    res.send("Error updating hotel");
                }else{
                    resolve(updatedHotel);
                }
            }
            );    
    })
}

const deleteHotel = (hotel_id) => {
    return new Promise(function(resolve,reject){
        
        Hotel.findByIdAndRemove(hotel_id,function(err,deletedHotel){
			if(err){
                console.log(err);
			}else{
				resolve(deletedHotel);
			}
		});
    })
}

module.exports = {
    addHotel,
    updateHotel,
    deleteHotel
}