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

  // restoreScroll();
}

loadComponent("navbar", "Shared/Navbar.html");
loadComponent("footer", "Shared/Footer.html");
loadComponent("scroll-to-top", "Shared/Top_Up_Button.html");
loadComponent("our-clients", "Shared/Our_Clients.html");

let data; // Declare outside

async function loadData() {
  const response = await fetch("./DataBase.json");
  data = await response.json(); // Assign it here
  // console.log(data);
  setUpScrollingImages(data.All_Data.scrolling_images);
  setUpCards(data.All_Data.cards_data);
}
loadData();

const sliderTrack = document.getElementById("sliderTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let list = [];
let currentSlide = 0;
let autoScrollInterval;
let isTransitioning = false;

function setUpScrollingImages(getData1) {
  list = getData1;
  list.forEach(({ image, heading_text, description }) => {
    createSlide(image, heading_text, description);
  });

  // Clone first slide and append at the end
  const { image, heading_text, description } = list[0];
  createSlide(image, heading_text, description);

  startAutoScroll();
}

function createSlide(image, heading_text, description) {

  const slide = document.createElement("div");
  slide.className = "slide";
  slide.style.backgroundImage = `url('${image}')`;

  const desc = document.createElement("div");
  desc.id = "description-box";
  const heading = document.createElement("p");
  heading.id = "heading";
  const info = document.createElement("p");
  info.id = "info";
  const buttons_box = document.createElement("div");
  buttons_box.id = "buttons-box";
  const explore_more_button = document.createElement("a");
  explore_more_button.id = "explore-more-button";
  const contact_us_button = document.createElement("a");
  contact_us_button.id = "contact-us-button";

  heading.textContent = heading_text;
  info.textContent = description;
  explore_more_button.textContent = "Explore More";
  explore_more_button.href="#"

  contact_us_button.textContent = "Contact Us";
  contact_us_button.href="Contact_Us.html"

  slide.appendChild(desc);
  sliderTrack.appendChild(slide);
  desc.appendChild(heading);
  desc.appendChild(info);
  desc.appendChild(buttons_box);
  buttons_box.appendChild(explore_more_button);
  buttons_box.appendChild(contact_us_button);
}

function showSlide(index) {
  const slideCount = list.length;
  sliderTrack.style.transition = "transform 0.8s ease-in-out";
  sliderTrack.style.transform = `translateX(-${index * 100}%)`;
  currentSlide = index;

  // If at the cloned last slide, reset after transition
  if (index === slideCount) {
    isTransitioning = true;
    setTimeout(() => {
      sliderTrack.style.transition = "none"; // remove transition
      sliderTrack.style.transform = `translateX(0%)`;
      currentSlide = 0;
      isTransitioning = false;
    }, 850); // must match transition time
  }
}

function nextSlide() {
  if (isTransitioning) return;
  showSlide(currentSlide + 1);
}

function prevSlide() {
  if (isTransitioning) return;
  if (currentSlide === 0) {
    currentSlide = list.length;
    sliderTrack.style.transition = "none";
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    setTimeout(() => {
      sliderTrack.style.transition = "transform 0.8s ease-in-out";
      showSlide(currentSlide - 1);
    }, 20);
  } else {
    showSlide(currentSlide - 1);
  }
}

function startAutoScroll() {
  stopAutoScroll();
  autoScrollInterval = setInterval(() => {
    nextSlide();
  }, 5000);
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

// Button logic
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);
[nextBtn, prevBtn].forEach((btn) => {
  btn.addEventListener("mouseenter", stopAutoScroll);
  btn.addEventListener("mouseleave", startAutoScroll);
});

function setUpCards(getData2) {
  let featured_services_cards_box = document.getElementById(
    "featured-services-cards-box"
  );
  for (let index = 0; index < 8; index++) {
    let card = document.createElement("div");
    card.id = "cards";
    let image = document.createElement("img");
    let title = document.createElement("p");
    title.id = "title";
    let description = document.createElement("p");
    description.id = "description";
    let know_more = document.createElement("button");
    know_more.id = "know-more";
    const head_title = encodeURIComponent(getData2[index].title);
    know_more.onclick = function () {
      window.location.href = `All_Services_data.html?id=${getData2[index].id}&title=${head_title}`;
    };
    image.src = getData2[index].image;
    title.innerText = getData2[index].title;
    description.innerText = getData2[index].description;
    know_more.innerText = "Know More";
    featured_services_cards_box.appendChild(card);
    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(know_more);
  }
}

const scriptURL =
  "https://script.google.com/macros/s/AKfycbwA7VcjTaTo0820gMoD68j2ZF40l6n4MPXkA5hf43e0tKb_PUmz74I05Uh6iiXWvJTR/exec";
const form = document.forms["doubt-form"];
form.addEventListener("submit", (e) => {
  e.preventDefault();
  var formData = new FormData(form);
  var terms_conditions = document.getElementById(
    "terms_and_conditions"
  ).checked;

  fetch(scriptURL, { method: "POST", body: formData })
    .then((response) => {
      alert("Done ,Submitted Successfully.");
      form.reset();
    })
    .catch((error) => {
      alert("Error ,Something went wrong. please try again!");
    });
});
