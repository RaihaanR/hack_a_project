import React from "react";
import "./Profile.css";

const Profile = ({ name, email }) => {
  return (
    <div>
      <h1 className="name">{name}</h1>
      <h1 className="block">{email}</h1>
    </div>
  );
};

export default Profile;
