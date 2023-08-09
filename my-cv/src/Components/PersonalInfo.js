import { Form, Input, Button, Upload, message } from "antd";
import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";

function PersonalInfo() {
  const [firsName, setFirsName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const user = JSON.parse(localStorage.getItem("my-cv-users"));

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (file) => {
    setLoading(true);

    // Simulate image upload delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Here, you can handle the actual image upload to your server or storage service

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("api/user/upload", {
        method: "POST",
        body: formData,
      });

      
      const data = await response.json();
      console.log(data.imageUrl);
      // Mettre à jour l'URL de l'image dans l'état
      setProfileImage(data.imageUrl);
      console.log(data.imageUrl);

      setLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <h5>Personal Details</h5>
      <hr />
      <div className="row">
        <div className="col-md-12">
        <Form.Item label="Upload Image:">
  <Upload
    name="image"
    listType="picture-card"
    showUploadList={false}
    customRequest={({ file, onSuccess }) => {
      handleImageUpload(file)
        .then(() => {
          onSuccess();
          message.success("Image uploaded successfully!");
        })
        .catch((error) => {
          console.error("Image upload failed:", error);
          message.error("Image upload failed.");
        });
    }}
  >
    {profileImage ? (
      <div>
        <img
          src={user.data.profileImage}
          alt="Uploaded"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
        <p>Image Preview</p>
      </div>
    ) : (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    )}
  </Upload>
</Form.Item>

{/* Ajoutez une autre balise img ici pour afficher l'image de profil */}
<div>
  {profileImage && (
    <div>
      <img
        src={profileImage}
        alt="Profile"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
      <p>Image Preview</p>
    </div>
  )}
</div>

        </div>

        <div className="col-md-4">
          <Form.Item
            name="firsName"
            label="First Name :"
            rules={[
              {
                required: true,
                message: "Missing First Name",
              },
            ]}
          >
            <input
              value={firsName}
              onChange={(e) => setFirsName(e.target.value)}
            />
          </Form.Item>
        </div>
        <div className="col-md-4">
          <Form.Item
            name="lastname"
            label="Last Name :"
            rules={[
              {
                required: true,
                message: "Missing Last Name",
              },
            ]}
          >
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Item>
        </div>
        <div className="col-md-4">
          <Form.Item
            name="email"
            label="Email :"
            rules={[
              {
                required: true,
                message: "Missing Email",
              },
            ]}
          >
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
        </div>
        <div className="col-md-4">
          <Form.Item
            name="mobile"
            label="Mobile Phone :"
            rules={[
              {
                required: true,
                message: "Missing Mobile Phone",
              },
            ]}
          >
            <input value={mobile} onChange={(e) => setMobile(e.target.value)} />
          </Form.Item>
        </div>
        <div className="col-md-4">
          <Form.Item
            name="country"
            label="Country :"
            rules={[
              {
                required: true,
                message: "Missing Country",
              },
            ]}
          >
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Item>
        </div>
        <div className="col-md-4">
          <Form.Item
            name="city"
            label="City :"
            rules={[
              {
                required: true,
                message: "Missing City",
              },
            ]}
          >
            <input value={city} onChange={(e) => setCity(e.target.value)} />
          </Form.Item>
        </div>
        <div className="col-md-12">
          <Form.Item
            name="ProfessionalSummary"
            label="Professional Summary :"
            required
          >
            <TextArea />
          </Form.Item>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
