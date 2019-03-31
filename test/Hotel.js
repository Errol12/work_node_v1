process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
const Hotel = require('../models/Hotel');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Hotels', () => {
    beforeEach((done) => { //Before each test we empty the database
        Hotel.remove({}, (err) => { 
           done();           
        });        
    });
/*
  * Test the /POST route
  */
 describe('/POST hotel', () => {
    it('it should not POST if error', (done) => {
        let hotel = {
            id: '1211',
            title: "NewIndiaHotel"
        }
      chai.request(server)
          .post('/api/hotel/add')
          .send(hotel)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });

});
});
