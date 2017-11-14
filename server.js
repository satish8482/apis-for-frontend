var Hapi = require('hapi');
const server = new Hapi.Server();
var pg = require('pg');
var Sequelize=require ('sequelize');
var hapiparser = require("hapi-bodyparser"); 
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
    path: '/Getuser',
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
     sequelize.query("SELECT * FROM user_registration", { replacements: { visible: 'true' },type: sequelize.QueryTypes.SELECT})
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
    path:'/Postuser',
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
    var id= request.payload.id;
    var unameR = request.payload.unameR;
    var emailR = request.payload.emailR;
    var pwdR= request.payload.pwdR;
    //var continents = request.payload.continents;
    //var added= request.payload.added;
    //var visible= request.payload.visible;
    
     


    var data = {
        "Data":""
    };
  //  if( !!name && !!family && !!continents ) {
   if(!!id && !!unameR&&  !!emailR && !!pwdR) {
sequelize.query("INSERT INTO user_registration (id ,unameR , emailR , pwdR) VALUES('"+ id +"','" + unameR+ "','" + emailR+ "','" + pwdR + "')",[id ,unameR,emailR,pwdR],{type: sequelize.QueryTypes.INSERT}).then(function(Birds,err) {
    //sequelize.query("INSERT INTO birds (name,family,continents) VALUES('" + name+ "','" + family + "','" + continents+ "')",[name,family,continents],{type: sequelize.QueryTypes.INSERT}).then(function(Birds,err) {

    
 if(!!err){
                data.Data = "Error Adding data";
            }else{
                //data["Data"] = 0;
                data["Data"] = "User Added Successfully";
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
    path:'/Putuser',
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
        console.log("Called user PUT Method !!");
        var id = request.payload.id;
        var unameR = request.payload.unameR;
        var emailR= request.payload.emailR;
        var data = {
            "Data":""
    };
  
      if(!!id && !!unameR) {
  sequelize.query("UPDATE user_registration set unameR= '"+unameR+"' where id= '"+id+"' ",[unameR,id],{type: sequelize.QueryTypes.UPDATE}).then(function(Birds,err) {
      
   if(!!err){
                  data["Data"] = "Error Adding data";
              }else{
                  data["Data"] = "User Updated Successfully";
              }
              reply(data);
          });
      }else{
          data["Data"] = "Please provide all required data of user";
          reply.status(404).json(data);
      
  }

}
}
  });

server.route({
    method:'DELETE',
    path:'/Deleteuser',
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
    var id = request.payload.id;
    var data = {
        "Data":""
    };
  
    if(!!id) {
        sequelize.query("DELETE from  user_registration where id= '"+id+"' ",[id],{type: sequelize.QueryTypes.DELETE}).then(function(Birds,err) {
      
            if(!!err){
                  data["Data"] = "Error Adding data";
            }else{
                  data["Data"] = "User Deleted Successfully";
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