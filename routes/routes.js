const router = require("express").Router();
var moment = require('moment');

module.exports = (Car, User) => {

  let chosenCarByUser;
  let newDateFr;
  let newDateTo;

  //-----------------//
  //    MAIN PAGE    //
  //-----------------//
  router.get("/", (req, res) => {
    res.render("main", { title: "Main!" });
  });


  //------------------//
  //    ADMIN PAGE    //
  //------------------//

  router.get("/admin", (req, res) => {
    Car.find({
    }, (err, cars) => {
      res.render("admin", { allCars: cars });
    });
  })
  .post('/cars/_carId', (req, res) => {
    for (let carId in req.body) {
      // Get ID from user-selected car.
      chosenCarByUser = req.body[carId];
    }
    Car.findByIdAndRemove(chosenCarByUser, (err, result) => {
      if (err)
        console.log(err); });
      res.redirect("../admin");
    });



  //-----------------------------//
  //    CALENDAR BOOKING PAGE    //
  //-----------------------------//
  router.get("/bookingCalendar", (req, res) => {
    res.render("bookingCalendar", { title: "Booking Calendar" });
  })
  .post("/bookingCalendar", (req, res) => {
    // Push chosen dates to a temporary array,
    // then put them in two separate variables.
    let tmpDateChoice = [];
    for (let dates in req.body) {
      tmpDateChoice.push(req.body[dates]);
    }
    for (let date in tmpDateChoice) {
      newDateFr = tmpDateChoice[0];
      newDateTo = tmpDateChoice[1];
    }
    res.redirect("cars");
  });


  //------------------------//
  //    CAR BOOKING PAGE    //
  //------------------------//
  router.get("/cars", (req, res) => {
    // Find all cars that are not booked during the users date choice.
    Car.find({
      "booked.bookedFr": { $not: { $gt: newDateFr, $lt: newDateTo } },
      "booked.bookedTo": { $not: { $gt: newDateFr, $lt: newDateTo } }
    }, (err, cars) => {
      // Show the available cars
      res.render("cars", { allCars: cars, title: "CARS" });
    });
  })
  .post("/cars", (req, res) => {
    // Get ID from user selected car.
    for (let carId in req.body) {
      chosenCarByUser = req.body[carId];
    }
    res.redirect("userInformation");
  });


  //-----------------------------//
  //    USER INFORMATION PAGE    //
  //-----------------------------//
  router.get("/userInformation", (req, res) => {
    User.find({}, (err, users) => {
      res.render("userInformation", { title: "User information" });
    });
  })
  .post("/userInformation", (req, res) => {
    // Create new user.
    let newUser = new User(req.body);

    // If not error, update the chosen car with booking dates
    // and the users ID.
    // If error, show the user what went wrong.
    newUser.save((err) => {
      if (!err) {
        Car.findByIdAndUpdate(chosenCarByUser, {
          booked: {
            bookedFr: new Date(newDateFr),
            bookedTo: new Date(newDateTo)
          },
          bookedBy: newUser._id
        },
        (err, result) => {
          if (err) console.log(err);
        });
        res.redirect("booked");
      } else {
        let errMessage = err.message.slice(24).split(", ").reverse();
        let errTitle = "You missed to fill in " + errMessage.length + " field(s).";
        res.render("userInformation", { errorTitle: errTitle, errorMessage: errMessage, title: "Something went wrong." });
      }
    });
  });


  //------------------------//
  //    BOOKED CARS PAGE    //
  //------------------------//
  /* Check if a car i booked and if so print this and date and person */
  router.get("/booked", (req, res) => {
    Car.find({}, (err, cars) => {
      User.find({}, (err, users) => {
        let bookedCarByPerson = [];
        let tmp;

        for (let i in cars) {
          // Get ID from car of booked car
          let tmpCar = cars[i].bookedBy;

          for (let j in users) {
            // Get ID of user
            tmp = users[j]._id;
            // Check if user and ID has equality and exclude undefined
            if (tmp == tmpCar && tmp != undefined) {
              bookedCarByPerson.push("Car: " + cars[i].brand + ". Booked from: " +
              moment(cars[i].booked.bookedFr).format('YYYY-MM-DD') + " to " +
              moment(cars[i].booked.bookedTo).format('YYYY-MM-DD') + " by " +
              users[j].firstName + " " + users[j].lastName);
            }
            else if (tmp != tmpCar && tmp == undefined) bookedCarByPerson.push("No cars are booked.");
          }
        }
        res.render("booked", { title: "BOOKED", bookedCarByPerson});
      });
    });
  })
  .patch("/booked/:id", (req, res) => {
    for (let i in req.body) {
      //var tmp = req.body[i];
      //console.log(tmp);
      Car.findByIdAndUpdate(req.params.id, {
        bookedBy: "",
        booked:  {
          bookedFr: null,
          bookedTo: null
        }
      }, (error, results) => {
        res.send(results);
      });
    }
    //res.redirect("userInformation");
    res.render("booked", { title: "BOOKED" });
  });




/*temporära, endast till för Postman etc*/

  router.patch('/:id', (req,res) => {
    Car.findByIdAndUpdate(req.params.id,
    {
      bookedBy: req.body.bookedBy,
      booked:  {
      bookedFr: req.body.bookedFr,
      bookedTo: req.body.bookedTo
    },
    },
    (error, result) => {
      if(error) res.send(error);
      res.send(result);
    });
  });

  router.get("/cf", (req, res) => {
         Car.find({}, (error, results) =>{
     //  User.find({}, (error, results) =>{
    res.json(results);
    });
  });
  router.get("/ust", (req, res) => {
    User.find({}, (err, users) => {
      if (err) console.log(err);
      console.log(users);
      res.json(users);
    });
  });

  router.post('/newCar', (req, res) => {
    var car = new Car(req.body);
    car.save((error, results)=>{
      if(error) res.send(error.errors.title.message);
      res.send(results);
    });
  });
  return router;
};


    // router.patch('/userInformation', (req, res) => {
    //   console.log("gveoingebroi");
    //   Car.findByIdAndUpdate(bookedCar,
    // //     //User.findByIdAndUpdate(req.params.id,
    //     {
    //       /*
    //       brand: req.body.brand
    //       model: req.body.model
    //       seats: req.body.seats
    //       gearbox: req.body.gearbox
    //       railing: req.body.railing
    //       price: req.body.price
    //       */
    //       booked: true,
    //     } //, {new: true}
    //     ,(error, result) =>{
    //       if(error)res.send(error);
    //       console.log(result);
    //       res.send(result);
    //     });
    //   });
    // console.log(req.body.radioButton);
    //
    // Car.find({}, (err, cars) => {
    //   console.log(cars[this.booked]);
    // });


//   router.get('/cancel', (req,res) => {
//     var tmp;
//   Car.find()
//   .where('booked').equals('true')
//   .exec((error, result) => {
//     tmp=result;
//     res.json(tmp);
//   });
// });



// router.patch('/:id', (req, res) => {
// -  Car.findByIdAndUpdate(req.params.id,
// -  //User.findByIdAndUpdate(req.params.id,
// -  {
// -   /*
// -    brand: req.body.brand
// -    model: req.body.model
// -    seats: req.body.seats
// -    gearbox: req.body.gearbox
// -    railing: req.body.railing
// -    price: req.body.price*/
// -    booked: req.body.booked,
// -    bookedFr: req.body.bookedFr,
// -    bookedTo: req.body.bookedTo,
// -    bookedBy: req.body.bookedBy
// -  } ,{new: true}
// -  ,(error, result) =>{
// -    if(error)res.send(error);
// -    res.send(result);
// -  });
// -});



// router.post('/newCar', (req, res) => {
// var car = new Car(req.body);
// car.save((error, results)=>{
//   if(error) res.send(error.errors.title.message);
//   res.send(results);
// });
// });
//
//
//   //delete
// router.delete('/:id', (req, res) => {
//   User.findByIdAndRemove(req.params.id, (error, result) =>{
//     if(error)res.send(error);
//     res.send(result + "Successfully removed!");
//   });
// });
//   return router;
// }
