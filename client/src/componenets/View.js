import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const View = () => {
  const history = useNavigate();

  const { id } = useParams();
  const [view, setView] = useState([]);


  const getuserdata = async () => {
    const res = await fetch(`/getData/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const userdata = await res.json();
    console.log(userdata);
    setView([...view, userdata]);
  };

  useEffect(() => {
    getuserdata();
  }, [id]);

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <Card className="w-25 mt-5 p-3">
          <Card.Body>
            <Card.Title className="text-center">
              <h1>View detail</h1>
            </Card.Title>
            <Card.Text>
              {view.map((ele, i) => {
                return (
                  <>
                    <div className="d-flex">
                      <div style={{ fontWeight: 700 }}>First Name:</div>
                      <div className="mx-2 mb-2">{ele.fname}</div>
                    </div>
                    <div className="d-flex">
                      <div style={{ fontWeight: 700 }}>Last Name:</div>
                      <div className="mx-2 mb-2">{ele.lname}</div>
                    </div>
                    <div className="d-flex">
                      <div style={{ fontWeight: 700 }}>Email:</div>
                      <div className="mx-2 mb-2">{ele.email}</div>
                    </div>
                    <div className="d-flex">
                      <div style={{ fontWeight: 700 }}>Phone:</div>
                      <div className="mx-2 mb-2">{ele.phone}</div>
                    </div>
                    <div className="d-flex">
                      <div style={{ fontWeight: 700 }}>City</div>
                      <div className="mx-2 mb-2">{ele.city}</div>
                    </div>
                    <div className="d-flex">
                      <div style={{ fontWeight: 700 }}>Age</div>
                      <div className="mx-2 mb-2">{ele.age}</div>
                    </div>
                  </>
                );
              })}
            </Card.Text>
            <NavLink to="/">
              <Button variant="primary">Go To HomePage</Button>
            </NavLink>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default View;
