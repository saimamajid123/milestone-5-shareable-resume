"use strict";
// Get references to the form and dispiay area
const form = document.getElementById('resume-form');
const resumeDisplayElement = document.getElementById('resume-display');
const shareablelinkContainer = document.getElementById('shareable-link-container');
const shareablelinkElement = document.getElementById('shareable-link');
const downloadpdfButton = document.getElementById('download-pdf');
// Handle form submission 
form.addEventListener('submit', (event) => {
    event.preventDefault(); //prevent page reload
    // coliect input values
    const username = document.getElementById('username').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('Phone').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('Skills').value;
    // save form data in localStorage with the username as the key
    const resumeData = {
        name,
        email,
        phone,
        education,
        experience,
        skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); // saving the data locally
    //Generate the resume content dynamically
    const resumeHTML = `
    <h2><b>Editable Resume</h2>
    <h3>personal Information</h3> 
    <p><b>Name:</b><span contenteditable="true">${name}</span></p>
    <p><b>Email:</b><span contenteditable="true">${email}</span></p>
    <p><b>Phone:</b><span contenteditable="true">${phone}</span></p>  
    
    <h3>Education</h3>
    <p contenteditable="true">${education}</p>

    <h3>Experience</h3>
    <p contenteditable="true">${experience}</p>             

    <h3>Skills</h3>
    <p contenteditable="true">${skills}</p> 
    `;
    //dispaly the generated resume
    resumeDisplayElement.innerHTML = resumeHTML;
    // Generate a shareable URLwith the username only
    const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;
    //Display the shareable link
    shareablelinkContainer.style.display = 'block';
    shareablelinkElement.href = shareableURL;
    shareablelinkElement.textContent = shareableURL;
});
//Handle PF download
downloadpdfButton.addEventListener('click', () => {
    window.print(); // This will open the print dialog and allow the user to save as PDF
});
// [Prefill the form based on the username in the URL
window.addEventListener('DOMContentloaded', () => {
    const urlparams = new URLSearchParams(window.location.search);
    const username = urlparams.get('username');
    if (username) {
        //Autofill form if data is found in locaIStorage
        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('Phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('Skills').value = resumeData.skills;
        }
    }
});
