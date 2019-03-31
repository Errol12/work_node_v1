const express = require('express');
const router = express.Router();
const mongoose =  require('mongoose');

const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const User = require('../models/User');
const hotelFunctions = require('../functions/hotelFunctions');
const roomFunctions = require('../functions/roomFunctions');

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
    
    hotelFunctions.addHotel(new mongoose.Types.ObjectId(),req.body.title)
												.then(data => {
														res.json(data);
												}).catch(error => { console.log(error);})


});


//Update a hotel by id
router.put('/hotel/update/',function(req,res){
	
	hotelFunctions.updateHotel(req.body.id,req.body.title)
												.then(data => {
														res.json(data);
												}).catch(error => { console.log(error);})
});

//Delete a hotel by id 
router.delete('/hotel/delete/:id',function(req,res){
	
	hotelFunctions.deleteHotel(req.params.id)
			.then(data => {
					res.json(data);
			}).catch(error => { console.log(error);})

});

//Add a room
router.post('/hotel/room/add',function(req,res){
    
    roomFunctions.addRoom(req.body.room_number,req.body.hotel_id)
			.then(data => {
					res.json(data);
			}).catch(error => { console.log(error);})
});






//Book room for user of a specific date range
router.post('/user/room/book',function(req,res){
    
	roomFunctions.bookRoom(req.body.room_id,req.body.user_id,req.body.start_time,req.body.end_time)
		.then(data => {
				res.json(data);
		}).catch(error => { console.log(error);})

});

//Fetch all available hotel rooms for a specific date range
router.post('/get/available/rooms',function(req,res){
		
	roomFunctions.getAvailableDates(req.body.start_time,req.body.end_time)
												.then(data => {
														res.json(data);
												}).catch(error => { console.log(error);})	
});


//Add a user
router.post('/user/add',function(req,res){
    
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
	
	User.findByIdAndRemove(req.params.id,function(err,deletedUser){
			if(err){
			res.send("Error deleting user");
			}else{
				res.json("User deleted ");
			}
		});
});


module.exports = router;