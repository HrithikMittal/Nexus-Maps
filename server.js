var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Maps = require("./app/models/maps");
var MongoClient = require("mongodb").MongoClient;

// Configure app for bodyParser()
// lets us grab data from the body of POST
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// Set up port for server to listen on
var port = process.env.PORT || 3000;

var url = "mongodb://adhi:password123@ds141796.mlab.com:41796/signup";

//API Routes
MongoClient.connect(url, (err, client) => {
  const dbo = client.db("signup");

  var router = express.Router();

  // Routes will all be prefixed with /API
  app.use("/api", router);

  //MIDDLE WARE-
  router.use(function(req, res, next) {
    console.log("FYI...There is some processing currently going down");
    next();
  });

  // test route
  router.get("/", function(req, res) {
    res.json({
      message: "Welcome hi !"
    });
  });

  router
    .route("/points")
    .post(function(req, res) {
      var point = new Maps();
      point.bname = req.body.bname;
      point.pno = req.body.pno;
      point.latitude = req.body.latitude;
      point.longitude = req.body.longitude;

      dbo.collection("locations").insertOne(point, function(err, res) {
        if (err) throw err;
      });
      res.json({
        message: "User was successfully Add Location"
      });
    })
    .get(function(req, res) {
      dbo
        .collection("locations")
        .find({})
        .toArray(function(err, result) {
          if (err) throw err;
          for (var i = 0; i < result.length; i++) {
            console.log(" Latitude is " + result[i].latitude);
            console.log(" Longitude is " + result[i].longitude);
            //res.send does not work here
          }
        });
    });
});
// Fire up server
app.listen(port);

// print friendly message to console
console.log("Server listening on port " + port);
