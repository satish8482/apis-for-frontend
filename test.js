var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('./server').default;
var should=require('should');
var should = chai.should();
var request = require('request');
var expect=require('chai').expect;
chai.use(chaiHttp);

describe('Empty the databse', () => {
//Before each test we empty the database
  beforeEach((done) => { 
    d34eq7hbv7sgol.remove({}, (err) => { 
         done();         
      });     
  });
});


// Testing for get api 

describe('Get Api',function(){
it('display details of bird', function(done) {
  
   chai.request('http://localhost:8086/Get')
   .get('/')
   .end(function(err, res){
    expect(res.body).to.deep.equal({});
     res.should.have.status(200);

     done();
   });
   });   
  });

// For above api code getting the error : "Uncaught AssertionError: expected { Object (domain, _events, ...) } to have status code 200 but got 404"

//Testing with different code but for this also im getting timeout error.

describe ('Get Api by alternative code ', function (){

  
var baseUrl='http://localhost:8086';
it('Return  data', function(done){

   request.get({url: baseUrl +'/Getbird'},

  function(error , response , body) {

    if (!error && response.statusCode == 200){

      //this.timeout(15000); 
      setTimeout(done , 15000);

    


    expect(response.statusCode).to.equal(200);
    expect(res.body).to.eql({});

    console.log(body);
    done();
  }
  });
});
});

//Testing for Post api with input 

describe('Post api',function(){
it('should add a bird into databse POST', function(done) {
       chai.request('http://localhost:8086/Postbird')
          .post('/')
          .send({'id': '2', 'name': 'Peacock','family':'peacockfamily','continents':'us','added':'10-3-2017','visible':'true'})
          .end(function(err, res){
            res.should.have.status(200);
            done();
          });
        });
      });


//Testing for post api without input 

describe('Post api without data',function(){
  it('should not add a bird into databse', function(done) {
          chai.request('http://localhost:8086/Postbird')
            .post('/')
            .send({'id': '2', 'name': '','family':'peacockfamily','continents':'us','added':'10-3-2017','visible':'true'})
            .end(function(err, res){
              res.should.have.status(400);
              done();
            });
          });
        });

//Testing for PUT api with input

describe('Put api',function(){
  it('should update a bird details in databse', function(done) {
          chai.request('http://localhost:8086/Putbird')
            .put('/')
            .send({'id': '1','name':'sparrow'})
            .end(function(err, res){
              res.should.have.status(200);
              done();
            });
          });
        });

//Testing for Put api without input

describe('Put api without input',function(){
  it('should not update a bird details in databse', function(done) {
          chai.request('http://localhost:8086/Putbird')
            .put('/')
            .send({'id': '','name':'sparrow'})
            .end(function(err, res){
              res.should.have.status(404);
              done();
            });
          });
        });

//Testing for Delete api 

describe('Delete api with id',function(){
  it('should delete a bird from database', function(done) {
             chai.request('http://localhost:8086/Deletebird')
               .delete('/')
               .send({'id': '2'})
               .end(function(err, res){
                 res.should.have.status(200);
                 done();
               });
             });
           });

//Testing Delete api without input

describe('Delete api with out id',function(){
  it('should not delete a bird from database', function(done) {
          chai.request('http://localhost:8086/Deletebird')
            .delete('/')
            .send({'id': ''})
            .end(function(err, res){
              res.should.have.status(404);
              done();
            });
          });
        });