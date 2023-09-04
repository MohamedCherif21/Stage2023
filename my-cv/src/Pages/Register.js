import React, { useEffect, useState } from "react";
import { Form, Spin, message } from "antd";
import "../Ressources/Authentification.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const validatePassword = (_, value) => {
    if (value && value.length < 8) {
      return Promise.reject(
        "Le mot de passe doit contenir au moins 8 caractères."
      );
    }
    return Promise.resolve();
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post("api/user/register", values);
      setLoading(false);
      message.success("Inscription réussie");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Échec de l'inscription");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("my-cv-users")) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="auth-parent">
      {loading && <Spin size="large" />}
      <Form layout="vertical" onFinish={onFinish}>
        <h1>Register</h1>
        <hr />
        <Form.Item name="email" label="Email">
          <input type="text" name="name" value="email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ validator: validatePassword }]}
        >
          <input type="password" />
        </Form.Item>
        <Form.Item name="cpassword" label="Confirm Password">
          <input type="password" />
        </Form.Item>
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/Login">Cliquez ici pour vous connecter</Link>
          <button type="primary" htmltype="submit">
            S'inscrire
          </button>
        </div>
        <br></br>
        <GoogleOAuthProvider clientId="431723207763-v0k3q4rph3abckr3cgt4si6og1kif0cv.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const decoded = jwt_decode(credentialResponse.credential);
                console.log(decoded);

                // Envoie les données au serveur pour créer le compte
                await axios.post("api/user/auth/google/callback", decoded);
                setLoading(false);
                message.success("Inscription réussie");
                navigate("/login");
                // Effectuez des actions supplémentaires si nécessaires
              } catch (error) {
                setLoading(false);
                message.error("Échec de l'inscription");
              }
            }}
            onError={() => {
              message.error("Échec de l'inscription");
            }}
          />
        </GoogleOAuthProvider>
      </Form>
    </div>
  );
}

export default Register;
