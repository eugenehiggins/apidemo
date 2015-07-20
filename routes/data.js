var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

/* GET zip code data. */
router.get('/zips', function(req, res, next) {

  // Connect to the db
  MongoClient.connect("mongodb://localhost:27017/scratch", function(err, db) {

  	var collection = db.collection('zips');

  	collection.count(function(err, count) {
  		console.log("There are " + count + " records in the scratch collection. Here they are:");

  		var myCursor = collection.find({'state':'MA'}).toArray(function(err, docs){
  			if (docs.length) {
	  			res.render('index', { title: 'Data', "documents": docs });
	  		} else {
	  			res.render('index', { title: 'Data', "documents": null });
	  		}
  		});
  	});
  });

});

/* GET data home. */
router.get('/', function(req, res, next) {

  // Connect to the db
  MongoClient.connect("mongodb://localhost:27017/zips", function(err, db) {
    var collection = db.collection('zips');

    collection.count(function(err, count) {
      console.log("There are " + count + " records in the zips collection. Here they are:");

      

      var myCursor = collection.find().toArray(function(err, docs){
        if (docs.length) {
          res.render('data', { title: 'Data', "documents": docs });
        } else {
          res.render('index', { title: 'Data', "documents": null });
        }
      });
    });

  	/*var adminDb = db.admin();
  	adminDb.listDatabases(function (err, dbs){

  		if (dbs.databases.length > 0) {
  			res.render('data', { title: 'Data Home', "databases": dbs.databases });
  		} else {
  			res.render('data', { title: 'Data Home', "databases": null });
  		}
  		
  	});*/

  	
  });

});

/* GET data home. */
router.get('/:state', function(req, res, next) {

  // Connect to the db
  MongoClient.connect("mongodb://localhost:27017/zips", function(err, db) {
    var collection = db.collection('zips');

    var state = req.params.state;

    collection.count(function(err, count) {
      console.log("There are " + count + " records in the zips collection. Here they are:");

      var myCursor = collection.find({'state' : state}).toArray(function(err, docs){
        if (docs.length) {
          res.render('data', { title: 'Data', "state": docs });
        } else {
          res.render('index', { title: 'Data', "state": null });
        }
      });
    });
    
  });

});

module.exports = router;
