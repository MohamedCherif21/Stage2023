import React from "react";
import "../../Ressources/templates.css"; // Assurez-vous que le chemin d'accès au fichier CSS est correct

function Template3() {
  const user = JSON.parse(localStorage.getItem("my-cv-users"));
  localStorage.setItem("my-cv-users", JSON.stringify(user));

  return (
    <div className="cv-template3"> {/* Remplacez "cv-template" par "cv-template3" */}
      <div className="top-section">
        <h1>
          {user.data.firstName.toUpperCase()} {user.data.lastName.toUpperCase()}
        </h1>
        <img
          src={`http://localhost:3000/${user.data.image}`} /* Modifiez "(user.data.image)" en "user.data.image" */
          alt="Uploaded"
          className="profile-image"
        />

        <div className="contact-info">
          <p>Email: {user.data.email}</p>
          <p>Mobile: {user.data.mobile}</p>
          <p>City: {user.data.city}</p>
        </div>
      </div>
      <br></br>
      <p>{user.data.professionalSummary}</p>

      <div className="skills-education-section"> {/* Remplacez "sections" par "skills-education-section" */}
        <h2>Skills & Education</h2>
        <hr />
        <div className="row">
          <div className="skills-col">
            <h3>Skills</h3>
            <ul>
              {user.data.skills.map((skill, index) => (
                <li key={index}>
                  {skill.skill} - {skill.degree}
                </li>
              ))}
            </ul>
          </div>
          <div className="education-col">
            <h3>Education</h3>
            <ul>
              {user.data.education.map((education, index) => (
                <li key={index}>
                  {education.dateRange}
                  <br></br>
                  {education.degree} <b>In</b> {education.institution}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="experience-projects-section"> {/* Remplacez "sections" par "experience-projects-section" */}
        <h2>Experience & Projects</h2>
        <hr />
        <div className="experience-section">
          {user.data.employment.map((employment, index) => (
            <div key={index} className="experience-item">
              <h3>Experience</h3>
              {employment.dateRange}
              <br></br>
              <p>Job: {employment.job}</p>
              <p>Employer: {employment.employer}</p>
              <p>City: {employment.city}</p>
            </div>
          ))}
        </div>
        <div className="projects-section">
          {user.data.projects.map((project, index) => (
            <div key={index} className="project-item">
              <h3>Projects</h3>
              {project.dateRange}
              <br></br>
              <p>Project: {project.projectName}</p>
              <p>Description: {project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Template3;
