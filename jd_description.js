async function loadComponent(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  const scripts = tempDiv.querySelectorAll("script");

  scripts.forEach((script) => {
    const newScript = document.createElement("script");
    if (script.src) {
      newScript.src = script.src;
    } else {
      newScript.textContent = script.textContent;
    }
    document.body.appendChild(newScript);
  });
}

loadComponent("navbar", "Shared/Navbar.html");
loadComponent("footer", "Shared/Footer.html");
loadComponent("scroll-to-top", "Shared/Top_Up_Button.html");

const urlParams = new URLSearchParams(window.location.search);
const jobId = urlParams.get("id");
// console.log(jobId);


if (jobId) {
  // Now you have the jobId, you need to fetch the full job details
  fetchJobDetails(jobId);
} else {
  // Handle the case where no job ID is provided in the URL
  console.error("No job ID found in the URL.");
  // Optionally display an error message to the user
}

async function fetchJobDetails(id) {
  // console.log(id);
  
  try {
    const response = await fetch('./DataBase.json'); // Adjust the path to your JSON file
    const jobs = await response.json();
    const selectedJob =jobs.All_Data.job_recruitments.filter(job => job.id == id);
    // console.log(jobs);
  
    if (selectedJob) {
      // Now you have the full job details in the 'selectedJob' object
      displayJobDetails(selectedJob);
    } else {
      console.error(`Job with ID ${id} not found.`);
      // Optionally display an error message to the user
    }
  } catch (error) {
    console.error("Error fetching job data:", error);
    // Optionally display an error message to the user
  }
}
function displayJobDetails(params) {
  // console.log(params);
  const designation_or_role=document.getElementById('role')
  const work_time=document.getElementById('time')
  const level_of_post=document.getElementById('level-of-post')
  const experience_level=document.getElementById('experience')
  const location=document.getElementById('location')
  const job_description=document.getElementById('jd')
  designation_or_role.innerText=params[0].designation
  job_description.innerText=params[0].jd
  experience_level.innerText=params[0].experience
  work_time.innerText=params[0].work_time
  location.innerText=params[0].location
  level_of_post.innerText=params[0].level_of_post
  get_all_jd_skills('ul-of-resonsibilitis',params[0].key_responsibilities,"responsibilites")
  get_all_jd_skills('ul-of-primary-skills',params[0].primary_skills,"primary-skills")
  get_all_jd_skills('ul-of-qualification',params[0].secondary_skills,"secondary_skills")
  const responsibilities_box=document.getElementById('ul-of-resonsibilitis')
}
function get_all_jd_skills(id,len,given_id,attribute){
  const responsibilities_box=document.getElementById(id)
  for (let index = 0; index < len.length; index++) {
    const responsibilites_list=document.createElement('li')
    responsibilites_list.id=given_id
    responsibilites_list.innerText=len[index]
    responsibilities_box.appendChild(responsibilites_list)
  }
}