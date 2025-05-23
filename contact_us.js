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

  const scriptURL =                       
      "https://script.google.com/macros/s/AKfycbwA7VcjTaTo0820gMoD68j2ZF40l6n4MPXkA5hf43e0tKb_PUmz74I05Uh6iiXWvJTR/exec";
      const form = document.forms["doubt-form"];
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        var formData = new FormData(form);
        var terms_conditions = document.getElementById("terms_and_conditions").checked;

        fetch(scriptURL, { method: "POST", body: formData })
          .then((response) => {
            alert("Done ,Submitted Successfully.");
            form.reset();
          })
          .catch((error) => {
            alert("Error ,Something went wrong. please try again!");
          });
      });