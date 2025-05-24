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
  const response = await fetch("./Database.json");
  data = await response.json(); // Assign it here
  // console.log(data);
  setUpScrollingImages(data.All_Data.scrolling_images);
  setUpCards(data.All_Data.cards_data);
}
loadData();

const imgElement = document.getElementById("heading-image-for-renuza-img");
const headingElement = document.getElementById(
  "heading-image-for-renuza-content-text-heading"
);
const infoElement = document.getElementById(
  "heading-image-for-renuza-content-text-paragraph"
);
function setUpScrollingImages(getData1) {
  let currentIndex = 0;
  setInterval(() => {
    currentIndex = (currentIndex + 1) % getData1.length;
    imgElement.src = getData1[currentIndex].image;
    headingElement.innerText = getData1[currentIndex].heading;
    infoElement.innerText = getData1[currentIndex].info;
  }, 5000);
}

let index = 0;
function Imagescroll(params) {
  // console.log(data.All_Data.scrolling_images[0].heading);
  index = (index + params) % data.All_Data.scrolling_images.length;
  imgElement.src = data.All_Data.scrolling_images[index].image;
  headingElement.innerText = data.All_Data.scrolling_images[index].heading;
  infoElement.innerText = data.All_Data.scrolling_images[index].info;
}

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

// document.addEventListener("DOMContentLoaded", () => {
//   document.querySelectorAll("a").forEach((link) => {
//     link.addEventListener("click", () => {
//       sessionStorage.setItem("scrollY", window.scrollY);
//     });
//   });
// });

// function restoreScroll() {
//   const y = sessionStorage.getItem('scrollY');
//   console.log(y);
  
//   if (y !== null) {
//     setTimeout(() => {
//       window.scrollTo(0, parseInt(y));
//       sessionStorage.removeItem('scrollY');
//     }, 100); // delay allows rendering to settle
//   }
// }