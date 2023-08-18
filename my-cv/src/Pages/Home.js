import React from "react";
import DefaultLayout from "../Components/DefaultLayout";
import templatesimple from "../Ressources/templates/templatesimple.png";
import template2 from "../Ressources/templates/template2.png";
import "../Ressources/templates.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const user = JSON.parse(localStorage.getItem("my-cv-users"));
  localStorage.setItem("my-cv-users", JSON.stringify(user));
  const navigate = useNavigate();
  const templates = [
    {
      title: "Simple CV",
      image: templatesimple,
    },
    {
      title: "Colored CV",
      image: template2,
    },
    // Add more templates as needed
  ];

  return (
    <DefaultLayout>
      <div className="row home">
        {templates.map((template, index) => (
          <div key={index} className="col-md-4 template">
            <div className="template-image">
              <img src={template.image} height={400} alt="" />
            </div>
            <div className="text">
              <p>{template.title}</p>
              <button onClick={() => navigate(`/templates/${index + 1}`)}>TRY</button>
            </div>
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
}

export default Home;
