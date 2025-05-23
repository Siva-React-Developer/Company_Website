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

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const page_title=params.get("title")
// console.log(id);

if (page_title) {
      // Set the <title> tag
      document.title = decodeURIComponent(page_title);
    }

async function loadData(card_id) {
  const response = await fetch("Database.json");
  data = await response.json(); // Assign it here
  // console.log(data);
  All_Services_Info(data.All_Data.cards_data[card_id]);
}
loadData(id - 1);

function All_Services_Info(getData) {
  const service_tittle = document.getElementById("service-title");
  const service_info = document.getElementById("service-decription");
  const service_img = document.getElementById("service-image");
  service_tittle.innerText = getData.title;
  service_info.innerText = getData.description;
  service_img.src = getData.image;

  const key_points_list = document.getElementById("key-points");
  const key_points = document.createElement("ol");
  key_points.id = "key_point";
  key_points_list.appendChild(key_points);
  for (let i = 0; i < getData.full_description.length; i++) {
    // console.log(getData.full_description[i].key_point);
    const key_point = document.createElement("li");
    key_point.id = "key_point_text";
    key_points.appendChild(key_point);
    key_point.innerText = getData.full_description[i].key_point;
    for (
      let j = 0;
      j < getData.full_description[i].sub_key_points.length;
      j++
    ) {
      const sub_key_points = document.createElement("ul");
      const sub_key_point_text = document.createElement("li");
      sub_key_point_text.id = "key_point_text";
      sub_key_points.id = "sub_key_point_text";
      key_point.appendChild(sub_key_points);
      sub_key_points.appendChild(sub_key_point_text);
      sub_key_point_text.innerText =
        getData.full_description[i].sub_key_points[j];
    }
  }
}
