
const pg = require('pg');
var Sequelize=require ('sequelize');
var app  = require('express')();// Express App include
var http = require('http').Server(app); // http server
var env = app.get('env') == 'development' ? 'dev' : app.get('env');
pg.defaults.ssl = process.env.DATABASE_URL != undefined;
var port = process.env.PORT || 8086;
var bodyParser = require("body-parser"); // Body parser for fetch posted data

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); // Body parser use JSON data
var express = require('express');
var router = express.Router();

var sequelize = new Sequelize('d34eq7hbv7sgol', 'sqhjzsiqgxutpn', '0ae8dd772f6a2be1e836e8dd9257cd7735a6b38a152e6abd83faf61457c250ea', {
    host: 'ec2-107-22-235-167.compute-1.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    dialectOptions:{
      ssl:true
    },
    DATABASE_URL:'postgres://sqhjzsiqgxutpn:0ae8dd772f6a2be1e836e8dd9257cd7735a6b38a152e6abd83faf61457c250ea@ec2-107-22-235-167.compute-1.amazonaws.com:5432/d34eq7hbv7sgol?ssl=true'
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  var Birds= sequelize.define('bird_table', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
    },
    name: {
    type:Sequelize.STRING
    },
    family: {
    type:Sequelize.STRING,
    },
    continents:{
    type:Sequelize.STRING,
    },
    added:{
    type: Sequelize.STRING
    },
    visible:{
    type:Sequelize.STRING,
    defaultValue:false
    },
    createdAt:{
    type:Sequelize.DATE,
   },
    updatedAt:{
    type:Sequelize.DATE,
   }
    
     });

  
  //Applying Birds table to database

  sequelize
  .sync({ force: true })
  .then(function(err) {
    console.log('It worked!table created successfully');
  }, function (err) { 
    console.log('An error occurred while creating the table:', err);
  });

sequelize.sync({ force: true }).then(function () {
   Birds.create({
  id:'1',
  name:'Peacock',
  family:'Family',
  continents:'india',
  added:'2017-10-04',
  visible:'true'
  }).then(function(){
  console.log('Data successfully inserted');
  })
});

 
  var express = require('express'),
bodyParser = require('body-parser');
  app.get('/Getbird',function(req,res){
    var data = {
        "Data":""
    };
     sequelize.query("SELECT * FROM bird_tables where visible=:visible", { replacements: { visible: 'true' },type: sequelize.QueryTypes.SELECT})
  .then(function(Birds,err,rows,fields) {
    // We don't need spread here, since only the results will be returned for select queries
    //if(rows.length!=0){
    if(Birds){
    
            data["Data"] = Birds;
            // data["Data"] = rows;
            res.json(data);

            //res.json({"err" : false, "message" : "success",data});
        }
        else{
          res.status(404).json(data);
        }
        


        
  });
});

app.post('/Postbird',function(req,res){
    var id = req.body.id;
    var name = req.body.name;
    var family= req.body.family;
    var continents = req.body.continents;
     var added= req.body.added;
      var visible= req.body.visible;
     
      console.log(req.body);
    
    console.log(id);
    var data = {
        "Data":""
    };
   if(!!id&& !!name && !!family && !!continents && !!added && !!visible) {
sequelize.query("INSERT INTO bird_tables (id,name,family,continents,added,visible) VALUES('" + id+ "','" + name+ "','" + family + "','" + continents+ "','" + added+ "','" + visible+ "')",[id,name,family,continents,added,visible],{type: sequelize.QueryTypes.INSERT}).then(function(Birds,err) {
    
 if(!!err){
                data["Data"] = "Error Adding data";
            }else{
                //data["Data"] = 0;
                data["Data"] = "Bird Added Successfully";
            }
            res.json(data);
        });
    }else{
        data["Data"] = "Please provide all required data of bird";
        //res.json(404).data);
res.status(400).json(data);
    }
});


app.put('/Putbird', function(req,res){
  
     var id = req.body.id;
     var name= req.body.name;
      var data = {
  
        "Data":""
      };
  
      if(!!id&& !!name ) {
  sequelize.query("UPDATE bird_tables set name= '"+name+"' where id= '"+id+"' ",[id,name],{type: sequelize.QueryTypes.UPDATE}).then(function(Birds,err) {
      
   if(!!err){
                  data["Data"] = "Error Adding data";
              }else{
                  data["Data"] = "Bird Updated Successfully";
              }
              res.json(data);
          });
      }else{
          data["Data"] = "Please provide all required data of bird";
          res.status(404).json(data);
      
  }
  });

app.delete('/Deletebird', function(req,res){
  
     var id = req.body.id;
     
      var data = {
  
        "Data":""
      };
  
      if(!!id) {
  sequelize.query("DELETE from  bird_tables where id= '"+id+"' ",[id],{type: sequelize.QueryTypes.DELETE}).then(function(Birds,err) {
      
   if(!!err){
                  data["Data"] = "Error Adding data";
              }else{
                  data["Data"] = "Bird Deleted Successfully";
              }
              res.json(data);
          });
      }else{
          data["Data"] = "Please provide all required data of bird";
          res.status(404).json(data);
    
      
  }
  });







  // app.use('/api', router);
   app.listen(port);
console.log('Magic happens on port ' + port);