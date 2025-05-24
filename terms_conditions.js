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

const params = new URLSearchParams(window.location.search);
const key_name = params.get("name");
const type=params.get("type")
// console.log(key_name);

async function loadData(card_id) {
  const response = await fetch("./DataBase.json");
  data = await response.json(); // Assign it here
  //   console.log(data);
  terms_conditions(data.All_Data[card_id]);
}
loadData(key_name);

const info_type=document.getElementById("terms-conditions-heading")
info_type.innerText=type

function terms_conditions(getData) {
  // console.log(getData);
  const key_points_list = document.getElementById("terms-conditions-points");
  const key_points = document.createElement("ol");
  key_points.id = "key_points";
  key_points_list.appendChild(key_points);
  for (let i = 0; i < getData.length; i++) {
    const key_point = document.createElement("li");
    key_point.id = "key_point_text";
    key_points.appendChild(key_point);
    key_point.innerText = getData[i].title;
    const sub_key_info_list = document.createElement("ul");
    const sub_key_info = document.createElement("li");
    // sub_key_info.style.listStyle="none"
    sub_key_info.id = "sub_key_info";
    sub_key_info_list.id = "sub_key_info_list";
    key_point.appendChild(sub_key_info_list);
    sub_key_info_list.appendChild(sub_key_info);
    sub_key_info.innerText = getData[i].info;
    if (getData[i].key_points.length > 0) {
      for (let j = 0; j < getData[i].key_points.length; j++) {
        const sub_key_points = document.createElement("ul");
        const sub_key_points_text = document.createElement("li");
        sub_key_points_text.id = "sub_key_points_text";
        sub_key_points.id = "sub_key_points";
        sub_key_points_text.innerText=getData[i].key_points[j]
        key_point.appendChild(sub_key_points);
        sub_key_points.appendChild(sub_key_points_text);
      }
    } else {
      continue;
    }
  }
}
