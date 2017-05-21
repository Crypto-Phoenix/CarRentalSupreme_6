const router = require("express").Router();

module.exports = (Car, User) => {

  router.get("/", (req, res) => {
    res.render("main", { title: "Main!" });
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

  return router;
}
