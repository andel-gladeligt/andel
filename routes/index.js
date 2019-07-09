const express = require("express");
const router = express.Router();
const Spots = require("../models/Spots");
const User = require("../models/User");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile", (req, res, next) => {
  res.render("profile");
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

router.post("/user/add", (req, res, next) => {
  const { userSearch } = req.body;
  //suche nach eingabe aus form & suche nach user und dessen username

  User.findOne({ username: userSearch }).then(user => {
    //finde eingeloggten user und pushe object id des gesuchten users in array

    User.findOne({ _id: req.user._id }).then(loggedInUser => {
      if (user) {
        User.findOneAndUpdate(
          { _id: req.user._id },
          { $addToSet: { inspirations: user._id } },
          { new: true }
        )
          .then(updatedUser => {
            if (
              loggedInUser.inspirations.length ==
              updatedUser.inspirations.length
            ) {
              res.render("profile", {
                errorMessage: "You are already friends"
              });
            } else res.redirect("/profile");
          })
          .catch(err => {
            next(err);
          });
      } else {
        res.render("profile", { errorMessage: "No user found" });
      }
    });
  });
});

// //shows all destinations from spots of friends - friendsSpots.hbs
router.get("/friendsSpots", (req, res) => {
  Spots.find().then(spots => {
    const spotId = spots.map(x => x.destination);
    const cat = [...new Set(spotId)];
    res.render("friendsSpots", { cat, spots });
  });
});

//shows all spots of one destination of friends - friendsDestination.hbs
router.get("/friendsDestination/:destinationId", (req, res, next) => {
  const destinationId = req.params.destinationId;
  Spots.find({ destination: destinationId }).then(spots => {
    console.log(spots);
    res.render("friendsDestination", { spots });
  });
});

//shows one spot - spotCard.hbs
router.get("/spotCard/:spotId", (req, res, next) => {
  const spotId = req.params.spotId;
  Spots.find({ _id: spotId }).then(spots => {
    res.render("spotCard", { spots });
  });
});

router.get("/following", (req, res) => {
  User.findOne({ _id: req.user._id })
    .populate("inspirations")
    .then(user => {
      res.render("following", { user });
    });
});

router.get("/unfollow/:id", (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { inspirations: req.params.id } },
    { new: true }
  ).then(updatedUser => {
    console.log(updatedUser);
    res.redirect("/following");
  });
});
module.exports = router;
