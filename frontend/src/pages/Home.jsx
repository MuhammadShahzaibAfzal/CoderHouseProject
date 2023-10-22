import React from "react";
import { Button, Card } from "../components";
import headingImage from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const startRegister = () => {
    navigate("/register");
  };
  return (
    <div className="cardWrapper bgPrimary">
      <Card title="Welcome to Coder House" image={headingImage}>
        <p>
          We’re working hard to get Codershouse ready for everyone! While we
          wrap up the finishing youches, we’re adding people gradually to make
          sure nothing breaks :)
        </p>

        <Button title="Get Started" onClick={startRegister} />

        <span className="primary">Have an invite text ?</span>
        <Link to="/login" className="link">
          Login
        </Link>
      </Card>
    </div>
  );
};

export default Home;
