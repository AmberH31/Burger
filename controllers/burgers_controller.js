var express = require("express");
var path = require("path");
var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  // burger.all(function(data) {
  //   var hbsObject = {
  //     burgers: data
  //   };
  //   console.log("object", hbsObject);
  //   res.render("index", hbsObject);
  // });
  // res.sendFile(path.join(__dirname, "../public/index.html"));
  res.render("index");
});

router.post("/api/burgers", function(req, res) {
  burger.create(req.body.name, function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update(
    {
      devoured: req.body.devoured
    },
    condition,
    function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

//delete
router.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.delete(
    // {
    //   sleepy: req.body.sleepy
    // },
    condition,
    function(result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

// Export routes for server.js to use.
module.exports = router;
