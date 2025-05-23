const servicesLink = document.getElementById("services-link");
const dropdown = document.getElementById("drop-down-services-links");

let hideTimeout; // shared timeout

servicesLink.addEventListener("mouseenter", () => {
  clearTimeout(hideTimeout); // cancel any hide
  dropdown.style.display = "flex";
});

servicesLink.addEventListener("mouseleave", () => {
  hideTimeout = setTimeout(() => {
    dropdown.style.display = "none";
  }, 100); // short delay so cursor can move to dropdown
});

dropdown.addEventListener("mouseenter", () => {
  clearTimeout(hideTimeout); // keep it visible
  dropdown.style.display = "flex";
});

dropdown.addEventListener("mouseleave", () => {
  hideTimeout = setTimeout(() => {
    dropdown.style.display = "none";
  }, 100);
});

const currentPage = window.location.pathname.split("/").pop();

// Highlight the matching nav link
document.querySelectorAll(".nav-link").forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

const hamburger = document.getElementById("hamburger");
const navbar3 = document.getElementById("navbar-3");

hamburger.addEventListener("click", (event) => {
  if (navbar3.style.display === "flex") {
    navbar3.style.display = "none";
    hamburger.innerHTML = "&#9776;";
  } else {
    navbar3.style.display = "flex";
    hamburger.innerHTML = "&times;"
  }
});

document.addEventListener("click", (event) => {
  if (!navbar3.contains(event.target) && event.target !== hamburger) {
    navbar3.style.display = "none";
    hamburger.innerHTML = "&#9776;";
  }
});

// Save scroll position on link click
// document.addEventListener('DOMContentLoaded', () => {
//   document.querySelectorAll('a').forEach(link => {
//     link.addEventListener('click', () => {
//       sessionStorage.setItem('scrollY', window.scrollY);
//     });
//   });
// });