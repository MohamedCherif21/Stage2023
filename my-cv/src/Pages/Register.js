import React, { useEffect, useState } from "react";
import { Form, Spin, message } from "antd";
import "../Ressources/Authentification.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post("api/user/register", values);
      setLoading(false);
      message.success("registration successefull");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("registration failedd");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("my-cv-users")) {
      navigate("/home");
    }
  });
  return (
    <div className="auth-parent">
      {loading && <Spin size="large" />}
      <Form layout="vertical" onFinish={onFinish}>
        <h1>Register</h1>
        <hr />
        <Form.Item name="username" label="Username">
          <input type="text" name="name" value="username" />
        </Form.Item>

        <Form.Item name="password" label="Password">
          <input type="password" />
        </Form.Item>

        <Form.Item name="cpassword" label="Confirm Password">
          <input type="password" />
        </Form.Item>

        <div className="d-flex align-items-center justify-content-between">
          <Link to="/Login"> click Here to Login </Link>
          <button type="primary" htmltype="Submit">
            Register
          </button>
        </div>
      </Form>
    </div>
  );
}

export default Register;
