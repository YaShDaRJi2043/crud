import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const history = useNavigate();
  const goback = () => {
    history("/");
  };

  return (
    <>
      <h1>page not found</h1>
      <button onClick={goback}>Home</button>
    </>
  );
};  

export default Error;
