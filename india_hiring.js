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
loadComponent("our-clients", "Shared/Our_Clients.html");

let data; // Declare outside

async function loadData() {
  const response = await fetch("./Database.json");
  data = await response.json(); // Assign it here
  // console.log(data);
  our_interview_process(data.All_Data.interview_process_images);
}
loadData();

function our_interview_process(getData) {
  const step1 = document.getElementById(
    "recruitment-process-steps-box1-content"
  );
  const step2 = document.getElementById(
    "recruitment-process-steps-box2-content"
  );
  const step3 = document.getElementById(
    "recruitment-process-steps-box3-content"
  );

  const steps_list = [step1, step2, step3];

  let k = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      if (i == 2 && j == 2) {
        break;
      } else {
        let card = document.createElement("div");
        card.id = "card";
        let step_no = document.createElement("p");
        step_no.id = "step-no";
        let image = document.createElement("img");
        image.id = "image";
        let title = document.createElement("p");
        title.id = "title";
        let description = document.createElement("p");
        description.id = "description";
        image.src = getData[k].image;
        title.innerText = getData[k].heading;
        description.innerText = getData[k].info;
        step_no.innerText = getData[k].step_no;
        steps_list[i].appendChild(card);
        card.appendChild(step_no);
        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(description);
        k = k + 1;
      }
    }
  }
}
