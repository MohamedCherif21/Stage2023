import React from "react";
import "../../Ressources/template3.css"; 


function ContactInfo({ email, mobile, city }) {
  return (
    <div className="contact-info">
      <p>Email: {email}</p>
      <p>Mobile: {mobile}</p>
      <p>City: {city}</p>
    </div>
  );
}

function Skill({ skill, degree }) {
  return <li>{skill} - {degree}</li>;
}

function Education({ dateRange, degree, institution }) {
  return (
    <li>
      {dateRange} <br />
      {degree} <b>à</b> {institution}
    </li>
  );
}

function Experience({ dateRange, job, Employer, city }) {
  return (
    <div className="experience-item">
      <h3>Expérience</h3>
      {dateRange} <br />
      <p>Poste: {job}</p>
      <p>Employeur: {Employer}</p>
      <p>Ville: {city}</p>
    </div>
  );
}

function Project({ dateRange, projectName, description }) {
  return (
    <div className="project-item">
      <h3>Projets</h3>
      {dateRange} <br />
      <p>Projet: {projectName}</p>
      <p>Description: {description}</p>
    </div>
  );
}

function ProfessionalCVTemplate() {
  const user = JSON.parse(localStorage.getItem("my-cv-users"));
  localStorage.setItem("my-cv-users", JSON.stringify(user));

  return (
    <div className="professional-cv-template">
      <div className="cv-header">
        <h1>
          {user.data.firsName.toUpperCase()} {user.data.lastname.toUpperCase()}
        </h1>
        <img
          src={`http://localhost:3000/${user.data.image}`}
          alt="Uploaded"
          className="profile-image"
        />
        <ContactInfo {...user.data} />
      </div>
      <br />
      <p>{user.data.ProfessionalSummary}</p>

      <div className="cv-section">
        <h2>Compétences & Éducation</h2>
        <hr />
        <div className="row">
          <div className="col-md-6">
            <h3>Compétences</h3>
            <ul>
              {user.data.skills.map((skills, index) => (
                <Skill key={index} {...skills} />
              ))}
            </ul>
          </div>
          <div className="col-md-6">
            <h3>Éducation</h3>
            <ul>
              {user.data.education.map((education, index) => (
                <Education key={index} {...education} />
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="cv-section">
        <h2>Expérience & Projets</h2>
        <hr />
        <div className="experience-section">
          {user.data.employment.map((employment, index) => (
            <Experience key={index} {...employment} />
          ))}
        </div>
        <div className="projects-section">
          {user.data.Project.map((project, index) => (
            <Project key={index} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfessionalCVTemplate;
