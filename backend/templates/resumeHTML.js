export function generateHTMLResume(data) {
  const personalInfo = data.personalInfo || {};
  const education = data.education || [];
  const experience = data.experience || [];
  const projects = data.projects || [];
  const achievements = data.achievements || [];
  const skills = data.skills || {};

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @page { margin: 0; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Times New Roman', serif; 
      font-size: 10pt; 
      line-height: 1.3; 
      color: #000; 
    }
    .container { 
      max-width: 8.27in; 
      margin: 0 auto; 
      padding: 0.6in 0.7in; 
    }
    h1 { 
      font-size: 20pt; 
      text-align: center; 
      margin-bottom: 3pt; 
      font-weight: bold; 
      letter-spacing: 0.5pt;
    }
    .contact { 
      text-align: center; 
      margin-bottom: 10pt; 
      font-size: 9pt; 
      color: #333;
    }
    .contact a {
      color: #000;
      text-decoration: none;
    }
    h2 { 
      font-size: 11pt; 
      border-bottom: 1.2pt solid #000; 
      margin-top: 12pt; 
      margin-bottom: 5pt; 
      padding-bottom: 2pt;
      font-weight: bold; 
      text-transform: uppercase;
      letter-spacing: 0.8pt;
    }
    .entry { 
      margin-bottom: 8pt; 
      page-break-inside: avoid;
    }
    .entry-header { 
      display: flex; 
      justify-content: space-between; 
      font-weight: bold; 
      font-size: 10pt;
    }
    .entry-subheader { 
      display: flex; 
      justify-content: space-between; 
      font-style: italic; 
      font-size: 9pt; 
      color: #333;
    }
    ul { 
      margin-left: 18pt; 
      margin-top: 3pt; 
      padding-left: 0;
    }
    li { 
      margin-bottom: 2pt; 
      line-height: 1.2;
    }
    .skills-section { 
      margin-top: 6pt; 
    }
    .skills-row { 
      margin-bottom: 4pt; 
      line-height: 1.3;
    }
    .skills-label { 
      font-weight: bold; 
      display: inline; 
      min-width: 120px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>${personalInfo.name || 'Your Name'}</h1>
    <div class="contact">
      ${personalInfo.email ? `<a href="mailto:${personalInfo.email}">${personalInfo.email}</a>` : ''}
      ${personalInfo.phone ? ` | ${personalInfo.phone}` : ''}
      ${personalInfo.linkedin ? ` | <a href="${personalInfo.linkedin}">LinkedIn</a>` : ''}
      ${personalInfo.github ? ` | <a href="${personalInfo.github}">GitHub</a>` : ''}
      ${personalInfo.portfolio ? ` | <a href="${personalInfo.portfolio}">Portfolio</a>` : ''}
    </div>

    ${education.length ? `
      <h2>Education</h2>
      ${education.map(edu => `
        <div class="entry">
          <div class="entry-header">
            <span>${edu.institution}</span>
            <span>${edu.years}</span>
          </div>
          <div class="entry-subheader">
            <span>${edu.degree}</span>
            <span>${edu.location}</span>
          </div>
        </div>
      `).join('')}
    ` : ''}

    ${experience.length ? `
      <h2>Experience</h2>
      ${experience.map(exp => `
        <div class="entry">
          <div class="entry-header">
            <span>${exp.position}</span>
            <span>${exp.company}</span>
          </div>
          <div class="entry-subheader">
            <span>${exp.location}</span>
            <span>${exp.duration}</span>
          </div>
          <ul>
            ${(exp.responsibilities || []).map(resp => `<li>${resp}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    ` : ''}

    ${projects.length ? `
      <h2>Projects</h2>
      ${projects.map(proj => `
        <div class="entry">
          <div class="entry-header">
            <span>${proj.name}</span>
            <span><em>${proj.technologies}</em></span>
          </div>
          <ul>
            ${(proj.description || []).map(desc => `<li>${desc}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    ` : ''}

    ${achievements.length ? `
      <h2>Achievements</h2>
      <ul>
        ${achievements.map(ach => `<li>${ach}</li>`).join('')}
      </ul>
    ` : ''}

    <h2>Technical Skills</h2>
    <div class="skills-section">
      ${skills.languages ? `<div class="skills-row"><span class="skills-label">Languages:</span> ${skills.languages}</div>` : ''}
      ${skills.frameworks ? `<div class="skills-row"><span class="skills-label">Frameworks:</span> ${skills.frameworks}</div>` : ''}
      ${skills.tools ? `<div class="skills-row"><span class="skills-label">Tools:</span> ${skills.tools}</div>` : ''}
      ${skills.databases ? `<div class="skills-row"><span class="skills-label">Databases:</span> ${skills.databases}</div>` : ''}
    </div>
  </div>
</body>
</html>`;
}
