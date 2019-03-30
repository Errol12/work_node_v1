const Room = require('../models/Room');



const  getAvailableDates = (start_date,end_date) =>
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

module.exports = {
    getAvailableDates
}