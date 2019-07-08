const express = require("express");
const router = express.Router();
const Spots = require("../models/Spots");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
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
      res.redirect("/");
    })
    .catch(err => {
      next(err);
    });
});

//shows all destinations from spots of friends - friendsSpots.hbs
router.get("/friendsSpots", (req, res, next) => {
  res.render("friendsSpots");
});

//shows all spots of one destination of friends - friendsDestination.hbs
router.get("/friendDestination", (req, res, next) => {
  res.render("friendDestination");
});

//shows one spot - spotCard.hbs
router.get("/spotCard", (req, res, next) => {
  res.render("spotCard");
});

module.exports = router;
