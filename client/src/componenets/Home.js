import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";

const Home = () => {
  const [user, setUser] = useState([]);

  const getData = async () => {
    const res = await fetch("/getData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    setUser(data);
  };

  const deleteUser = async (id) => {
    console.log(id);
    const res = await fetch(`/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);

    if (data.status == 405) {
      console.log("error");
    } else {
      getData();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="main">
      <div className="btnn">
        <NavLink to="/register">
          <Button variant="primary">
            <AddIcon style={{ fontSize: "22px", marginTop: "-3px" }} />
            ADD DATA
          </Button>
        </NavLink>
      </div>
      <Table striped bordered hover className="big_table">
        <thead>
          <tr className="text-center">
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>email</th>
            <th>phone</th>
            <th>city</th>
            <th>age</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {user.map((ele, i) => {
            return (
              <tr>
                <td>{i + 1}</td>
                <td>{ele.fname}</td>
                <td>{ele.lname}</td>
                <td>{ele.email}</td>
                <td>{ele.phone}</td>
                <td>{ele.city}</td>
                <td>{ele.age}</td>
                <td className="d-flex justify-content-around">
                  <NavLink to={`/view/${ele._id}`}>
                    <Button variant="success">
                      <RemoveRedEyeIcon />
                    </Button>
                  </NavLink>
                  <NavLink to={`/edit/${ele._id}`}>
                    <Button variant="primary">
                      <EditIcon />
                    </Button>
                  </NavLink>
                  <Button variant="danger" onClick={() => deleteUser(ele._id)}>
                    <DeleteIcon />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Table striped bordered hover className="small_table">
        <tbody>
          {user.map((ele, i) => {
            return (
              <>
                <tr>
                  <th>Id</th>
                  <td>{i + 1}</td>
                </tr>
                <tr>
                  <th>First Name</th>
                  <td>{ele.fname}</td>
                </tr>
                <tr>
                  <th>Last Name</th>
                  <td>{ele.lname}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{ele.email}</td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>{ele.phone}</td>
                </tr>
                <tr>
                  <th>City</th>
                  <td>{ele.city}</td>
                </tr>
                <tr>
                  <th>Age</th>
                  <td>{ele.age}</td>
                </tr>
                <tr>
                  <th>Action</th>
                  <td className="d-flex justify-content-around">
                    <NavLink to={`/view/${ele._id}`}>
                      <Button variant="success">
                        <RemoveRedEyeIcon />
                      </Button>
                    </NavLink>
                    <NavLink to={`/edit/${ele._id}`}>
                      <Button variant="primary">
                        <EditIcon />
                      </Button>
                    </NavLink>
                    <Button
                      variant="danger"
                      onClick={() => deleteUser(ele._id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </td>
                </tr>
                <Divider  style={{ marginBottom: "5px", marginTop: "5px" }} />
              </>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Home;
