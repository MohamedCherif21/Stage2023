import React, { useState } from "react";
import { Form, message } from "antd";
import axios from "axios";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
      await axios.post("api/user/forgot-password", values);
    }
  

  return (
    <div>
      <h1>Réinitialisation du mot de passe</h1>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="email" label="Adresse e-mail">
          <input type="email" />
        </Form.Item>
        <button type="primary" htmltype="submit" disabled={loading}>
          Réinitialiser le mot de passe
        </button>
      </Form>
    </div>
  );
}

export default ForgotPassword;
