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

let data; // Declare outside

async function loadData() {
  const response = await fetch("./DataBase.json");
  data = await response.json(); // Assign it here
  // console.log(data);
  setUpCards(data.All_Data.cards_data,"our-services-cards-box1",0, 1);
  setUpCards(data.All_Data.cards_data,"our-services-cards-box2",5, 7);
  setUpCards(data.All_Data.cards_data,"our-development-cards-box",2, 4);
}
loadData();

function setUpCards(getData,id,startIndex, endIndex) {
    let all_cards = document.getElementById(id);
  
    for (let i = startIndex; i <= endIndex; i++) {
      let card = document.createElement("div");
      card.id = "cards";
      let image = document.createElement("img");
      image.id = "image";
      let title = document.createElement("p");
      title.id = "title";
      let description = document.createElement("p");
      description.id = "description";
      let know_more = document.createElement("a");
      know_more.id = "know-more";
      const head_title = encodeURIComponent(getData[i].title);
      know_more.onclick = function () {
      window.location.href = `All_Services_data.html?id=${getData[i].id}&title=${head_title}`;
    };
      image.src = getData[i].image;
      title.innerText = getData[i].title;
      description.innerText = getData[i].description;
      know_more.innerText = "Know More";
      all_cards.appendChild(card);
      card.appendChild(image);
      card.appendChild(title);
      card.appendChild(description);
      card.appendChild(know_more);
    }
    
  }