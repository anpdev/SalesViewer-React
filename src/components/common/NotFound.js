import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h2>404 Not Found !</h2>
      <Link to="dashboard" className="btn btn-light btn-sm">
        <span className="glyphicon glyphicon-home"></span>
        Take Me Home
      </Link>
      
    </div>
  );
}

export default NotFound;
