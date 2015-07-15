var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

/* GET home page. */
router.get('/zips', function(req, res, next) {



  // Connect to the db
  MongoClient.connect("mongodb://localhost:27017/scratch", function(err, db) {

  	var collection = db.collection('zips');

  	collection.count(function(err, count) {
  		console.log("There are " + count + " records in the scratch collection. Here they are:");

  		var myCursor = collection.find({'state':'MA'}).toArray(function(err, docs){
  			if (docs.length) {
  				console.log(docs.length);
	  			res.render('index', { title: 'Data', "documents": docs });
	  		} else {
	  			res.render('index', { title: 'Data', "documents": null });
	  		}
  		});
  		
  		//res.render('index', { title: 'Express', documents: documentArray });

  	});
  });

  
});

module.exports = router;
