const express = require("express");
const router = express.Router();
const Spots = require("../models/Spots");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/friendsSpots", (req, res) => {
  Spots.find().then(spots => {
    const category = spots.map(x => x.destination);
    const cat = [...new Set(category)];
    res.render("friendsSpots", { cat, spots });
  });
});

router.get("/spots/add", (req, res, next) => {
  res.render("spotsAdd");
});

router.post("/spots/add", (req, res, next) => {
  const {
    name,
    destination,
    visitDate,
    status,
    category,
    price,
    comment,
    img,
    ranking
  } = req.body;

  Spots.create({
    name,
    destination,
    visitDate,
    status,
    category,
    price,
    comment,
    img,
    ranking
  })
    .then(() => {
      res.redirect("/spots/add");
    })
    .catch(err => {
      next(err);
    });
});

// //shows all destinations from spots of friends - friendsSpots.hbs
// router.get("/friendsSpots", (req, res, next) => {
//   res.render("friendsSpots");
// });

//shows all spots of one destination of friends - friendsDestination.hbs
router.get("/friendsDestination/:destinationId", (req, res, next) => {
  const destinationId = req.params.destinationId;
  Spots.find({ destination: destinationId }).then(spots => {
    res.render("friendsDestination", { spots });
  });
});

//shows one spot - spotCard.hbs
router.get("/spotCard", (req, res, next) => {
  res.render("spotCard");
});

module.exports = router;
