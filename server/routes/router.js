const express = require("express");
const collection = require("../model/useSchema");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../Middleware/Authenticate");

//get the user data
router.get("/getData", async (req, res) => {
  try {
    const getdata = await collection.find();
    // console.log(getdata);
    res.status(202).json(getdata);
  } catch (error) {
    console.log(error + "error");
    res.status(404).json("no data found");
  }
});

//post data
router.post("/register", async (req, res) => {
  console.log(req.body);
  const { fname, lname, email, phone, city, age } = req.body;
  console.log(fname, lname, email, phone, city, age);

  try {
    if (!fname || !lname || !email || !phone || !city || !age) {
      res.status(405).json({ status: 405, messge: "fill all details" });
    }

    const preuser = await collection.findOne({
      email: email,
    });

    console.log(preuser);
    if (preuser) {
      res.status(405).json({ status: 405, messge: "already enter email" });
    } else {
      const data = new collection({
        fname,
        lname,
        email,
        phone,
        city,
        age,
      });

      //here password bcrypc

      const finalData = await data.save();
      res.status(201).json({ status: 201, finalData });
    }
  } catch (error) {
    res.status(405).json({ status: 405, messge: "enter valid value" });
  }
});

//get individualdata
router.get("/getData/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const user = await collection.findById({ _id: id });
    console.log(user);
    res.status(201).json(user);
    // console.log(id);
  } catch (error) {
    console.log("data error");
    res.status(404).json("error" + error);
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    console.log(id);
    const deltUser = await collection.findByIdAndDelete({ _id: id });
    console.log(deltUser);
    res.status(201).json({ status: 201, deltUser });
  } catch (error) {
    console.log("data error");
    res.status(404).json("error" + error);
  }
});

//update data
router.put("/edit/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const UpdateUser = await collection.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    console.log(UpdateUser);
    res.status(201).json(UpdateUser);
  } catch (error) {
    console.log("data error");
    res.status(404).json("error" + error);
  }
});

// user login api
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   console.log(email, password);
//   try {
//     if (!email || !password) {
//       res.status(404).json("fill all data");
//     }

//     const uservalid = await collection.findOne({ email: email });

//     if (uservalid) {
//       const checkuser = await bcrypt.compare(password, uservalid.password);
//       console.log(checkuser);

//       if (!checkuser) {
//         res.status(404).json({ status: 404, messge: "invalid detail" });
//       } else {
//         // token genrate
//         const token = await uservalid.genrateAuthtoken();
//         console.log(token);
//         //cookie genrate
//         res.cookie("usercookie", token, {
//           expires: new Date(Date.now() + 9000000),
//           httpOnly: true,
//         });
//         res.status(201).json({ status: 201, token, uservalid });
//       }
//     }
//   } catch (error) {
//     console.log("data error");
//     res.status(404).json("error" + error);
//   }
// });

// valid userd
// router.get("/validuser", authenticate, async (req, res) => {
//   try {
//     const validuser = await collection.findOne({ _id: req.userId });
//     res.status(201).json({ status: 201, validuser });
//   } catch (error) {
//     res.status(404).json({ status: 404, error });
//   }
// });

//user logout
// router.get("/logout", authenticate, async (req, res) => {
//   try {
//     req.rootUser.tokens = req.rootUser.tokens.filter((ele, i) => {
//       return ele.token !== req.token;
//     });

//     //cookie clear
//     res.clearCookie("usercookie", { path: "/" });

//     req.rootUser.save();
//     res.status(201).json({ status: 201, messge: "user logout" });
//   } catch (error) {
//     res.status(404).json({ status: 404, error });
//   }
// });

module.exports = router;
