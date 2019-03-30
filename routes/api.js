const express = require('express');
const router = express.Router();
const mongoose =  require('mongoose');

const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const User = require('../models/User');
const getAvailableDates = require('../functions/getAvailableDates');

const db ="mongodb://localhost:27017/PeopleInteractive";
mongoose.Promise = global.Promise;
mongoose.connect(db,{ useNewUrlParser: true },function(err){
	if(err){
		console.error("Error! "+ err);
	}
	else
	{
		console.log("Success");
	}
});

router.get('/',function(req,res){
	res.send('api works');
});

//Add a hotel
router.post('/hotel/add',function(req,res){
    
    console.log('Add a hotel');
    var newHotel = new Hotel();
    newHotel._id = new mongoose.Types.ObjectId();
    newHotel.title = req.body.title;
    newHotel.save(function(err,insertedHotel){
		if(err){
			console.log('Error in saving hotel');
		}else{
			res.json(insertedHotel);
		}
	})
});

//Update a hotel by id
router.put('/hotel/update/',function(req,res){
	console.log('Update a hotel');
	Hotel.findByIdAndUpdate(req.body.id,
	{
		$set: {	title: req.body.title }
	},
	{
		new: true
	},
	function(err,updatedHotel){
		if(err){
			res.send("Error updating hotel");
		}else{
			res.json(updatedHotel);
		}
	}
	);
});

//Delete a hotel by id 
router.delete('/hotel/delete/:id',function(req,res){
    console.log('Deleting a Hotel');
    console.log(req.params);
		Hotel.findByIdAndRemove(req.params.id,function(err,deletedHotel){
			if(err){
			res.send("Error deleting Hotel");
			}else{
				res.json(deletedHotel);
			}
		});
});

//Add a room
router.post('/hotel/:id/room/add',function(req,res){
    
    console.log('Add a room');
    var newRoom = new Room();
    newRoom.room_no = req.body.number;
    newRoom.hotel_id = req.params.id;
    newRoom.save(function(err,insertedRoom){
		if(err){
			console.log('Error in saving room');
		}else{
			res.json(insertedRoom);
		}
	})
});


//Add a user
router.post('/user/add',function(req,res){
    
    console.log('Add a user');
    var newUser = new User();
    newUser.name = req.body.name;
    newUser.save(function(err,insertedUser){
		if(err){
			console.log('Error in saving user');
		}else{
			res.json(insertedUser);
		}
	})
});

//Update user
router.put('/user/update/',function(req,res){
	console.log('Update a user');
	User.findByIdAndUpdate(req.body.id,
	{
		$set: {	name: req.body.name }
	},
	{
		new: true
	},
	function(err,updatedUser){
		if(err){
			res.send("Error updating user");
		}else{
			res.json(updatedUser);
		}
	}
	);
});

//Delete User
router.delete('/user/delete/:id',function(req,res){
    console.log('Deleting a User');
    console.log(req.params);
		User.findByIdAndRemove(req.params.id,function(err,deletedUser){
			if(err){
			res.send("Error deleting user");
			}else{
				res.json(deletedUser);
			}
		});
});



//Book room for user of a specific date range
router.post('/user/room/book',function(req,res){
    
	console.log('Add a Booking');
	Room.findByIdAndUpdate(req.body.room_id, {
            $push: {"reserved_dates": {user_id: req.body.user_id,start_date: req.body.start_time, end_date: req.body.end_time}}
        }, {
            safe: true,
            new: true
        }, function(err, room){
            if(err){
                res.send(err);
            } else {
                res.json(room);
            }
        });
});

//Fetch all available hotel rooms for a specific date range
router.post('/get/available/rooms',function(req,res){
		console.log('check available');
		console.log(req.body.to.substring(0,10));
	getAvailableDates.getAvailableDates(req.body.from,req.body.to)
												.then(data => {
														res.json(data);
												}).catch(error => { console.log(error);})	
});

router.post('/get/available/rooms1',function(req,res){
	console.log('check available');
	console.log(req.body.to.substring(0,10));
Booking.find()
				.where('start_time').gt(req.body.to.substring(0,10))
				.where('end_time').lt(req.body.from.substring(0,10))
				.select('room_id')
				.exec(function(err,getrooms){
					if(err){
						console.log(err);
					}
					else{
						res.json(getrooms);
					}});	
});

router.post('/api/rooms', function(req, res) {

	Room.find({
			type: req.body.roomType,
			beds: req.body.beds,
			max_occupancy: {$gt: req.body.guests},
			cost_per_night: {$gte: req.body.priceRange.lower, $lte: req.body.priceRange.upper},
			reserved: { 

					//Check if any of the dates the room has been reserved for overlap with the requsted dates
					$not: {
							$elemMatch: {from: {$lt: req.body.to.substring(0,10)}, to: {$gt: req.body.from.substring(0,10)}}
					}

			}
	}, function(err, rooms){
			if(err){
					res.send(err);
			} else {
					res.json(rooms);
			}
	});

});

module.exports = router;