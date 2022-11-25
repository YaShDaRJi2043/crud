import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const history = useNavigate();
  const [inp, setInp] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    city: "",
    age: "",
  });
  console.log(inp);

  const uservalue = (e) => {
    const { name, value } = e.target;
    setInp({ ...inp, [name]: value });
  };

  const addData = async (e) => {
    e.preventDefault();

    const { fname, lname, email, phone, city, age } = inp;

    if (fname == "") {
      toast("please enter your fname!", {
        position: "top-center",
      });
    } else if (lname == "") {
      toast("please enter your lname!", {
        position: "top-center",
      });
    } else if (email == "") {
      toast("please enter your email!", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast("please enter valid email!", {
        position: "top-center",
      });
    } else if (phone == "") {
      toast("please enter your phone!", {
        position: "top-center",
      });
    } else if (city == "") {
      toast("please enter city!", {
        position: "top-center",
      });
    } else if (age == "") {
      toast("please enter age!", {
        position: "top-center",
      });
    } else {
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname,
          lname,
          email,
          phone,
          city,
          age,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (data.status == 405) {
        alert("enter invaid details");
      } else {
        setInp({
          ...inp,
          fname: "",
          lname: "",
          email: "",
          phone: "",
          city: "",
          age: "",
        });
        history("/");
      }
    }
  };
  return (
    <>
      <Form>
        <div className="d-flex justify-content-evenly mt-5">
          <div className="col-5">
            <l>Name</l>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                size="lg"
                type="text"
                placeholder="Enter Name"
                name="fname"
                onChange={uservalue}
                value={inp.fname}
              />
            </Form.Group>
          </div>
          <div className="col-5">
            <l>Last Name</l>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                size="lg"
                type="text"
                placeholder="Enter Last Name"
                name="lname"
                onChange={uservalue}
                value={inp.lname}
              />
            </Form.Group>
          </div>
        </div>
        <div className="d-flex justify-content-evenly">
          <div className="col-5">
          <l>Email</l>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                size="lg"
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={uservalue}
                value={inp.email}
              />
            </Form.Group>
          </div>
          <div className="col-5">
          <l>Phone</l>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                size="lg"
                type="text"
                placeholder="Enter Phone"
                name="phone"
                onChange={uservalue}
                value={inp.phone}
              />
            </Form.Group>
          </div>
        </div>
        <div className="d-flex justify-content-evenly mb-4">
          <div className="col-5">
          <l>City</l>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                size="lg"
                type="text"
                placeholder="Enter City"
                name="city"
                onChange={uservalue}
                value={inp.city}
              />
            </Form.Group>
          </div>
          <div className="col-5">
          <l>Age</l>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                size="lg"
                type="text"
                placeholder="Enter Age"
                name="age"
                onChange={uservalue}
                value={inp.age}
              />
            </Form.Group>
          </div>
        </div>
        <Button
          className="col-10 justify-content-center d-flex m-auto"
          onClick={addData}
        >
          SUBMIT
        </Button>
      </Form>
      <ToastContainer />
    </>
  );
};

export default Register;
