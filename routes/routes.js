const router = require("express").Router();
var moment = require('moment');
//app.locals.moment = require('moment');

module.exports = (Car, User, Booking) => {

  let chosenCarByUser;
  // let tmpNonBookedCar;

  router.get("/", (req, res) => {
    res.render("main", { title: "Main!" });
  });



  /*
    INTE FÄRDIG, HJÄLP GÄRNA TILL HÄR!
  */
  //-----------------------------//
  //    CALENDAR BOOKING PAGE    //
  //-----------------------------//
  router.get("/bookingCalendar", (req, res) => {
    console.log("GET /bookingCalendar");
    // let tmpBookFr = req;
    // let tmpBookTo;
    // Car.find({}, (err, cars) => {
    //   for (let i in cars) {
    //     if (cars[i].bookedFr == undefined) {
    //       tmpNonBookedCar = cars[i]._id;
    //     }
    //   }
    // });
    res.render("bookingCalendar", { title: "Booking Calendar" });
  })
  .post("/bookingCalendar", (req, res) => {
    let newBooking = new Booking(req.body);
    newBooking.save((err) => {
      if (err) console.log(err);
    });
    console.log(newBooking);
    console.log("POST /bookingCalendar -> redirect to cars");
    res.redirect("cars");
  });


  //------------------------//
  //    CAR BOOKING PAGE    //
  //----------------- ------//
  router.get("/cars", (req, res) => {
    console.log("GET /cars");
    Car.find({}, (err, cars) => {
      res.render("cars", { allCars: cars, title: "CARS" });
    });
  })
  .post("/cars", (req, res) => {
    console.log("POST /cars -> redirect to userInformation");
    for (let carId in req.body) {
      chosenCarByUser = carId;
    }
    res.redirect("userInformation");
  });


  //-----------------------------//
  //    USER INFORMATION PAGE    //
  //-----------------------------//
  router.get("/userInformation", (req, res) => {
    console.log("GET /userInformation");
    User.find({}, (err, users) => {
      if (err) console.log(err);
      res.render("userInformation", { title: "User info!!!!" });
    });
  })
  .post("/userInformation", (req, res) => {
    console.log("POST /userInformation ??? REDIRECT for verifying?");
    let newUser = new User(req.body);
    newUser.save((err) => {
      if (!err) {
        Car.findByIdAndUpdate(chosenCarByUser, {
          // bookedFr: req.body.bookedFr,
          // bookedTo: req.body.bookedTo,

          /* TILLFÄLLIGA DATUM */
          bookedFr: "2017-05-27T00:00:00.000Z",
          bookedTo: "2017-05-27T00:00:00.000Z",
          bookedBy: newUser._id,
          booked: true
        },
        (err, result) => {
          if (err) console.log(err);
        });
        console.log("Success!");
        res.render("userInformation", { userInfo: newUser, title: "User info!" });
      } else {
        // console.log(err);
        res.render("userInformation", { errorInfo: err, title: "Something went wrong." });
      }
    });
  });


  //------------------------//
  //    BOOKED CARS PAGE    //
  //------------------------//
  /* Check if a car i booked and if so print this and date and person*/
  router.get("/booked", (req, res) => {
    Car.find({}, (err, cars) => {
      User.find({}, (err, users) => {
        let bookedCarByPerson = [];
        let tmp;
        for (let i in cars) {
          //Get id from car of booked car
          let tmpCar = cars[i].bookedBy;
          for (let j in users) {
            //get id of user
            tmp = users[j]._id;
            //Check if user and id has equality and exclude undefined
            if (tmp == tmpCar && tmp != undefined) {
              bookedCarByPerson.push("Car: "+ cars[i].brand+". Booked from: "+
              moment(cars[i].bookedFr).format('YYYY-MM-DD') +" to "+
              moment(cars[i].bookedFr).format('YYYY-MM-DD') +" by "+
              users[j].firstName+" "+users[j].lastName);
            }
            else if (tmp != tmpCar && tmp == undefined) bookedCarByPerson.push("No cars is booked");
          }
        }
        res.render("booked", { title: "BOOKED", bookedCarByPerson});
      });
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
