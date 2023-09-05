import React, { useEffect, useState } from "react";
import { Form, message ,Spin} from "antd";
import "../Ressources/Authentification.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  

  const [loading, setLoading]= useState(false)
  const navigate = useNavigate()
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const user = await axios.post("api/user/login", values);
      setLoading(false);
      message.success("login successful");
      localStorage.setItem("my-cv-users", JSON.stringify(user));
  
      // Vérifiez le rôle de l'utilisateur et redirigez en conséquence
      if (user.data.firsName === "admin") {
        navigate('/admin'); // Redirige vers /admin pour l'administrateur
      } else {
        navigate('/home'); // Redirige vers /home pour les utilisateurs non administrateurs
      }
    } catch (error) {
      setLoading(false);  
      message.error("login failed");
    }
  };


  useEffect(()=>{
    if(localStorage.getItem("my-cv-users"))
    {
      navigate('/home')
    }
  });



  return (
    <div className="auth-parent">
      {loading && (<Spin size="large"/>)}
      <Form layout="vertical" onFinish={onFinish}>
        <h1>Login</h1>
        <hr />
        <Form.Item name="email" label="Email">
          <input  type="text" name="name" value="email"/>
        </Form.Item>

        <Form.Item name="password" label="Password">
          <input type="password" />
        </Form.Item>

        <div className="d-flex align-items-center justify-content-between">
          <Link to="/Register"> Click Here to Register </Link>
          <Link to="/forgot-password">Mot de passe oublié ?</Link>
          <br/>
          <button type="primary" htmltype="Submit">
            Login
          </button>
        </div>
      </Form>
    </div>
  );
}

export default Register;