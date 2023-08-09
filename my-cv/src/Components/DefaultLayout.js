import React from "react";
import "./../Ressources/DefaultLayout.css";
import { Button, Dropdown } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Cursor } from "mongoose";

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem('my-cv-users'));
  const navigate=useNavigate() ;
  
  const items = [
    {
      key: '1',
      label: (
        <Link to="/home">
          Home
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link to="/profile">
          Profile
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank"  rel="noopener noreferrer"  onClick={()=> {
        localStorage.removeItem('my-cv-users')
        navigate('/login')}}>
          Logout
        </a>
      ),
    },
  ];

  return (
    <div className="layout">
      <div className="header">
        <h1 onClick={()=> navigate('/home')} style={{cursor:'Pointer'}}>My CV </h1>
        <Dropdown menu={{ items }} placement="bottomLeft">
          <Button>{user.username}</Button>
        </Dropdown>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
}

export default DefaultLayout;
