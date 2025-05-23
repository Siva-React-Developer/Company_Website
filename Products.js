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