let applicants = [];

let jobRequirements = {
    requiredSkills: [],
    minExperience: 0
};

document.getElementById('applicantForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim());
    const experience = parseInt(document.getElementById('experience').value);
    
    applicants.push({ name, email, skills, experience });
    displayApplicants();
    document.getElementById('applicantForm').reset();
});


document.getElementById('requirementForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    jobRequirements.requiredSkills = document.getElementById('requiredSkills').value.split(',').map(skill => skill.trim());
    jobRequirements.minExperience = parseInt(document.getElementById('minExperience').value);
    
    filterApplicants();
    document.getElementById('requirementForm').reset();
});


function displayApplicants() {
    const applicantList = document.getElementById('applicantList');
    applicantList.innerHTML = '';
    
    applicants.forEach(applicant => {
        const li = document.createElement('li');
        li.textContent = `${applicant.name} - ${applicant.email} - Skills: ${applicant.skills.join(', ')} - Experience: ${applicant.experience} years`;
        applicantList.appendChild(li);
    });
}


function filterApplicants() {
    const filteredApplicantList = document.getElementById('filteredApplicantList');
    filteredApplicantList.innerHTML = '';
    
    const filteredApplicants = applicants.filter(applicant => {
        const hasRequiredSkills = jobRequirements.requiredSkills.every(skill => applicant.skills.includes(skill));
        const hasRequiredExperience = applicant.experience >= jobRequirements.minExperience;
        return hasRequiredSkills && hasRequiredExperience;
    });
    
    filteredApplicants.forEach(applicant => {
        const li = document.createElement('li');
        li.textContent = `${applicant.name} - ${applicant.email} - Skills: ${applicant.skills.join(', ')} - Experience: ${applicant.experience} years`;
        filteredApplicantList.appendChild(li);
    });
}
