const router = require("express").Router();

module.exports = (Car, User) => {

  //Olika tester, ej klart
  router.get("/", (req, res) => {
   // res.render("main", { title: "Main!" });
      //Car.find({}, (error, results) =>{ 
       User.find({}, (error, results) =>{ 
    res.json(results);
    });
  });

  router.get("/cars", (req, res) => {
    Car.find({}, (err, cars) => {
      console.log("Get cars!");
      res.render("cars", { allCars: cars, title: "CARS" });
    });
  });

  router.get("/userInformation", (req, res) => {
    User.find({}, (err, users) => {
      if (err) console.log(err);
      console.log(users);
      res.render("userInformation", { title: "User info!!!!" });
    });
  });
//Ej klart!//Fredrick
 router.get("/booked", (req, res) => {
    Car.find({}, (err, cars) => {
      var CarBookedBy = cars[2].bookedBy;
      User.find({}, (err, users) => {
        var UserbookedBy = users[0]._id;
        var name;
       // if(CarBookedBy===UserbookedBy)
          name=users[0].firstName +" "+users[0].lastName ;
     console.log("Booked Cars! "+ CarBookedBy +" " +UserbookedBy +" "+name);
      res.render("booked", {  title: "BOOKED", boo: cars, name});
       });
    });
  });

  router.post("/userInformation", (req, res) => {
    let newUser = new User(req.body);

    newUser.save((err) => {
      if (!err) {
        console.log("Success!");
        console.log(newUser);
        res.render("userInformation", { userInfo: newUser, title: "User info!" });
      } else {
        console.log("Uh-oh!");
        console.log(err);
        res.render("userInformation", { errorInfo: err, title: "Something went wrong." });
      }
    });
  });

 
 //Ej klart//Fredrick
  router.patch('/:id', (req, res) => {
  Car.findByIdAndUpdate(req.params.id,
  //User.findByIdAndUpdate(req.params.id,  
  {
    //booked: req.body.booked,
    //bookedFr: req.body.bookedFr,
    //bookedTo: req.body.bookedTo
    bookedBy: req.body.bookedBy
  } ,{new: true} 
  ,(error, result) =>{
    if(error)res.send(error);
    res.send(result);
  });
});
  //delete
router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (error, result) =>{
    if(error)res.send(error);
    res.send(result + "Successfully removed!");
  });
});
  return router;
}
