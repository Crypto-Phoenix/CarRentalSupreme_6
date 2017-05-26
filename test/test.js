const assert = require('assert');
const app = require('../server.js');
const request = require('supertest');
const chai = require('chai');
const should = chai.should();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ 
  extended: false 
}));

describe('Test', () => {

  describe('GET routes', () => {
      it('Check json', (done) => {
		  request(app)
		  .get('/booked')
		  .expect('Content-Type', /html/)
		  .expect({'view engine': 'pug'})
		  .expect('Content-Type', /json/)
		   .expect(200);
		   //console.log(app);
		  done();
		  });
		
	it('Check object', (done) => {
		request(app)
		.get('/booked')
		.end((err, res) => {
			res.status.should.equal(200);
			res.should.be.an('object');
			should.exist(res.body);
			done(err);
			});
			});
	
		   });


	});