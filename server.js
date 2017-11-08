var Hapi = require('hapi');
const server = new Hapi.Server();
var pg = require('pg');
var Sequelize=require ('sequelize');
var hapiparser = require("hapi-bodyparser"); // Body parser for fetch posted data

//hapiparser.use(hapiparser.urlencoded({ extended: false })); 
//hapiparser.use(hapiparser.json()); // Body parser use JSON data

//var bodyParser = require("body-parser"); // Body parser for fetch posted data

//server.use(bodyParser.urlencoded({ extended: false })); 
//server.use(bodyParser.json()); // Body parser use JSON data
server.connection( {
    port: 8086
});

var sequelize = new Sequelize('da7hp8e4ufl1i', 'gxyuhqciwnazgl', '8418dd1a6ca5ad452c4d67a1135fac0f1800bb9df87e9c27b07456db82e20cf3', {
    host: 'ec2-184-72-223-199.compute-1.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    schema:'public',
    dialectOptions:{
    ssl:true
},
    DATABASE_URL:'postgres://gxyuhqciwnazgl:8418dd1a6ca5ad452c4d67a1135fac0f1800bb9df87e9c27b07456db82e20cf3@ec2-184-72-223-199.compute-1.amazonaws.com:5432/da7hp8e4ufl1i'
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

/*var Birds= sequelize.define('birds', {
  idd: {
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
  idd:'1',
  name:'Dove',
  family:'DoveFamily',
  continents:'india',
  added:'2017-10-04',
  visible:'true',
  createdAt:'2017-10-04',
  updatedAt:'2017-10-09'
  }).then(function(){
  console.log('Data successfully inserted');
  })
});
*/
 server.register([{
    register: require('hapi-bodyparser'),
    options: {
        // parser: { allowDots: true, strictNullHandling: true }, 
        // sanitizer: { 
        //     trim: true, 
        //     stripNullorEmpty: true  
        // }, 
        // merge: false,  
        // body: false  
    }
}], function (err) {
    // Insert your preferred error handling here... 
});







server.route({

    method: 'GET',
    path: '/hello',
    handler: ( req, res ) => {
        res( 'Hello World!' );
    }

});
server.route({

    method: 'GET',
    path: '/Getbird',
    config: {
    plugins: {
      body: { merge: false, sanitizer: { stripNullorEmpty: false } }
    },
    cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with'],
        credentials: true
    },
    handler: ( request, reply) => {
         var data = {
        
    };
     sequelize.query("SELECT * FROM birds_test", { replacements: { visible: 'true' },type: sequelize.QueryTypes.SELECT})
 .then(function(Birds,err,rows,fields) {
     //sequelize.query("SELECT * FROM birds_test")
  //.then(function(Birds,err,rows,fields) {
    // We don't need spread here, since only the results will be returned for select queries
    //if(rows.length!=0){
    if(Birds){
    console.log("Called Birds GET Method !!");
    data["Data"] = Birds;
    reply(data);
     
    }   
  });
}
}
});

server.route({
   
    method:'POST',
    path:'/Postbird',
    config: {
    plugins: {
      body: { merge: false, sanitizer: { stripNullorEmpty: false } }
    },
    cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with'],
        credentials: true

    },
     handler: ( request, reply ) => {

    console.log(request.payload);

    console.log("Called Birds POST Method !!");
    var idd = request.payload.idd;
    var name = request.payload.name;
    var family= request.payload.family;
    var continents = request.payload.continents;
    var added= request.payload.added;
    var visible= request.payload.visible;
     


    var data = {
        "Data":""
    };
  //  if( !!name && !!family && !!continents ) {
   if(!!idd&& !!name && !!family && !!continents && !!added && !!visible) {
sequelize.query("INSERT INTO birds_test (idd,name,family,continents,added,visible) VALUES('" + idd+ "','" + name+ "','" + family + "','" + continents+ "','" + added+ "','" + visible+ "')",[idd,name,family,continents,added,visible],{type: sequelize.QueryTypes.INSERT}).then(function(Birds,err) {
    //sequelize.query("INSERT INTO birds (name,family,continents) VALUES('" + name+ "','" + family + "','" + continents+ "')",[name,family,continents],{type: sequelize.QueryTypes.INSERT}).then(function(Birds,err) {

    
 if(!!err){
                data.Data = "Error Adding data";
            }else{
                //data["Data"] = 0;
                data["Data"] = "Bird Added Successfully";
            }
            reply(data);
        });
    }else{
        data["Data"] = "Please provide all required data of bird";
        //res.json(404).data);
 reply(data);
    }
    }
}
});

server.route({
    method:'PUT',
    path:'/Putbird',
    config: {
    plugins: {
      body: { merge: false, sanitizer: { stripNullorEmpty: false } }
    },
    cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with'],
        credentials: true

    },
     handler: ( request, reply ) => {
        console.log("Called Birds PUT Method !!");
        var idd = request.payload.idd;
        var name= request.payload.name;
        var data = {
            "Data":""
    };
  
      if(!!idd&& !!name ) {
  sequelize.query("UPDATE birds_test set name= '"+name+"' where idd= '"+idd+"' ",[idd,name],{type: sequelize.QueryTypes.UPDATE}).then(function(Birds,err) {
      
   if(!!err){
                  data["Data"] = "Error Adding data";
              }else{
                  data["Data"] = "Bird Updated Successfully";
              }
              reply(data);
          });
      }else{
          data["Data"] = "Please provide all required data of bird";
          reply.status(404).json(data);
      
  }

}
}
  });

server.route({
    method:'DELETE',
    path:'/Deletebird',
    config: {
    plugins: {
      body: { merge: false, sanitizer: { stripNullorEmpty: false } }
    },
    cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with'],
        credentials: true
    },
    handler: ( request, reply ) => {  
    console.log("Called Birds DELETE Method !!");
    var idd = request.payload.idd;
    var data = {
        "Data":""
    };
  
    if(!!idd) {
        sequelize.query("DELETE from  birds_test where idd= '"+idd+"' ",[idd],{type: sequelize.QueryTypes.DELETE}).then(function(Birds,err) {
      
            if(!!err){
                  data["Data"] = "Error Adding data";
            }else{
                  data["Data"] = "Bird Deleted Successfully";
            }
              reply(data);
          });
    }else{
          data["Data"] = "Please provide all required data of bird";
          reply.status(404).json(data);
    }
    }
}
});



server.start(err => {

    if (err) {

        // Fancy error handling here
        console.error( 'Error was handled!' );
        console.error( err );

    }

    console.log( `Server started at ${ server.info.uri }` );

});