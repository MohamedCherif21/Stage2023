import React from "react";
import "../../Ressources/template2.css"; 


function Template2() {
  const user = JSON.parse(localStorage.getItem("my-cv-users"));
  return (
    <div className="cv-template">
      <div className="top">
        <h1>
          {user.data.firsName.toUpperCase()} {user.data.lastname.toUpperCase()}
          <img src={`http://localhost:3000/${(user.data.image)}`} alt="Uploaded"  className="profile-image" />
        </h1>
          <p>Email: {user.data.email}</p>
          <p>Mobile: {user.data.mobile}</p>
          <p>City: {user.data.city}</p>
      
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
                {education.dateRange} 
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
                 {employment.dateRangeemployment} 
                 <br></br>
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
              {project.dateRangeexperience} 
                 <br></br>
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
