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

const All_locations_Link = document.querySelector("#all-locations-link a");
const All_locations_dropdown = document.querySelector("#drop-down-all-locations-links");

let hide_Timeout;

// Handlers for hover
function showDropdown() {
  clearTimeout(hide_Timeout);
  All_locations_dropdown.style.display = "flex";
  All_locations_Link.style.cursor="pointer"
}

function hideDropdown() {
  hide_Timeout = setTimeout(() => {
    All_locations_dropdown.style.display = "none";
  }, 100);
}

// Click handler for mobile
function toggleDropdownClick() {
  if (All_locations_dropdown.style.display === "none" || !All_locations_dropdown.style.display) {
    All_locations_dropdown.style.display = "flex";
  } else {
    All_locations_dropdown.style.display = "none";
  }
}

// Add hover events
function addHoverEvents() {
  All_locations_Link.addEventListener("mouseenter", showDropdown);
  All_locations_Link.addEventListener("mouseleave", hideDropdown);
  All_locations_dropdown.addEventListener("mouseenter", showDropdown);
  All_locations_dropdown.addEventListener("mouseleave", hideDropdown);
}

// Remove hover events
function removeHoverEvents() {
  All_locations_Link.removeEventListener("mouseenter", showDropdown);
  All_locations_Link.removeEventListener("mouseleave", hideDropdown);
  All_locations_dropdown.removeEventListener("mouseenter", showDropdown);
  All_locations_dropdown.removeEventListener("mouseleave", hideDropdown);
}

// Setup for screen size
function handleResponsiveBehavior(e) {
  if (e.matches) {
    // Mobile screen: Remove hover, add click toggle
    removeHoverEvents();
    All_locations_Link.addEventListener("click", toggleDropdownClick);
  } else {
    // Desktop: Use hover events
    All_locations_Link.removeEventListener("click", toggleDropdownClick); // Avoid duplicate
    addHoverEvents();
    All_locations_dropdown.style.display = "none"; // Reset
  }
}
// Match media query
const mediaQuery = window.matchMedia("(max-width: 580px)");
// Run on load
handleResponsiveBehavior(mediaQuery);
// Listen for changes (resizing)
mediaQuery.addEventListener("change", handleResponsiveBehavior);

document.addEventListener("click", (event) => {
  const isClickInsideLink = All_locations_Link.contains(event.target);
  const isClickInsideDropdown = All_locations_dropdown.contains(event.target);

  // If click is outside both link and dropdown, hide the dropdown
  if (!isClickInsideLink && !isClickInsideDropdown) {
    All_locations_dropdown.style.display = "none";
  }
});

async function loadData() {
  const response = await fetch("./Database.json");
  data = await response.json(); // Assign it here
  // console.log(data);
  our_job_posts(data.All_Data.job_recruitments, "");
  return data.All_Data.job_recruitments;
}
loadData();

function our_job_posts(jobs, updated_info) {
  const job_card = document.getElementById("jobs-list-box");
  job_card.innerHTML = "";
  if (jobs.length > 0) {
    for (let i = 0; i < jobs.length; i++) {
      let card = document.createElement("div");
      card.className = "card";
      card.onclick = function () {
        window.location.href = `${"Jd_Description.html"}?id=${jobs[i].id}`;
      };
      let designation = document.createElement("a");
      designation.id = "designation";
      let experience = document.createElement("p");
      experience.id = "experience";
      let location = document.createElement("p");
      location.id = "location";
      designation.textContent = jobs[i].designation;
      experience.innerText = jobs[i].experience;
      location.innerText = jobs[i].location;
      job_card.appendChild(card);
      card.appendChild(designation);
      card.appendChild(experience);
      card.appendChild(location);
    }
  } else {
    job_card.innerHTML = `<p id="error-message">
    No Result Found!
  </p>`;
  }
}
async function updated_loadData() {
  const response = await fetch("./Database.json");
  data = await response.json(); // Assign it here
  // console.log(data.All_Data.job_recruitments);
  return Promise.resolve(data.All_Data.job_recruitments);
}

async function get_location_Data(city) {
  const changed_all_locations = document.getElementById("all-locations");
  changed_all_locations.innerText = city;
  const updated_data = await updated_loadData();
  // console.log(updated_data[0]);

  const filteredData = updated_data.filter(
    (person) => person.location.toLowerCase() == city.toLowerCase()
  );
  console.log(filteredData);
  // window.location.reload()
  our_job_posts(filteredData, 0);
}
