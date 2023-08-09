import React from "react";
import "../../Ressources/template2.css"; 



function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function Template2() {
  const user = JSON.parse(localStorage.getItem("my-cv-users"));
  return (
    <div className="cv-template">
      <div className="top">
        <h1>
          {user.data.firsName.toUpperCase()} {user.data.lastname.toUpperCase()}
        </h1>

        <div className="contact-info">
          <p>Email: {user.data.email}</p>
          <p>Mobile: {user.data.mobile}</p>
          <p>City: {user.data.city}</p>
        </div>
      </div>
      <br />
      <p>{user.data.ProfessionalSummary}</p>
      <br></br>

      {/* Two-Column Skills & Education Section */}
      <h2>Skills & Education</h2>
      <div className="section two-columns">
        
        <div className="column">
          <h2>Skills</h2>
          <ul>
            {user.data.skills.map((skills, index) => (
              <li key={index}>
                {skills.skill} - {skills.degree}
              </li>
            ))}
          </ul>
        </div>
        <div className="column">
          <h2>Education</h2>
          <ul>
            {user.data.education.map((education, index) => (
              <li key={index}>
                <b>From</b> {formatDate(education.dateRange[0])} <b>To</b>{" "}
                {formatDate(education.dateRange[1])}
                <br />
                {education.degree} <b>In</b> {education.institution}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <br></br>
      <br></br> 

      {/* Two-Column Experience / Projects Section */}
      <h2>Experience & Projects</h2>
      <div className="section two-columns">
        <div className="column">
          <h2>Experience</h2>
          <div className="experience-section">
            {user.data.employment.map((employment, index) => (
              <div key={index} className="experience-item">
                <div>
                  <b>From</b> {formatDate(employment.dateRangeemployment[0])}{" "}
                  <b>To</b> {formatDate(employment.dateRangeemployment[1])}{" "}
                </div>
                <p>Job: {employment.job}</p>
                <p>Employer: {employment.Employer}</p>
                <p>City: {employment.city}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="column">
          <h2>Projects</h2>
          <div className="projects-section">
            {user.data.Project.map((project, index) => (
              <div key={index} className="project-item">
                <div>
                  <b>From</b> {formatDate(project.dateRangeexperience[0])}{" "}
                  <b>To</b> {formatDate(project.dateRangeexperience[1])}{" "}
                </div>
                <p>Project: {project.Project}</p>
                <p>Description: {project.Descriptionproj}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Template2;
