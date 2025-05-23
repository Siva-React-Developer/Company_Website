 // Declare outside

async function loadData() {
  const response = await fetch("DataBase.json");
  data = await response.json(); // Assign it here
//   console.log(data.All_Data.our_clients);
  our_clients(data.All_Data.our_clients);
}
loadData();

function our_clients(array) {
    // const image_data=array
    const scroll_images = document.getElementById("clients-comapany-images");
    for (let index = 0; index < array.length; index++) {
      const image = document.createElement("img");
      image.id = "clients-images";
      image.src = array[index].client_image;
      if (index == array.length - 1) {
        image.style.marginRight = "0px";
      }
      scroll_images.appendChild(image);
    }
  }
  
  function scrollImages(distance) {
    const container = document.getElementById("clients-comapany-images");
    container.scrollBy({
      left: distance,
      behavior: "smooth",
    });
  }
  
  let scrolled_images;
  scrolled_images = setInterval(() => {
    scrollImages(225);
  }, 3000);
  
  const stop_scrolling = document.getElementById("clients-comapany-clients");
  stop_scrolling.addEventListener("mouseenter", () => {
    if (true) {
      // your condition here
      clearInterval(scrolled_images);
    }
  });
  stop_scrolling.addEventListener("mouseleave", () => {
    if (true) {
      // your condition here
      scrolled_images = setInterval(() => {
        scrollImages(225);
      }, 3000);
    }
  });

// function restoreScroll() {
//   const y = sessionStorage.getItem('scrollY');
//   if (y !== null) {
//     setTimeout(() => {
//       window.scrollTo(0, parseInt(y));
//       sessionStorage.removeItem('scrollY');
//     }, 100); // adjust delay if needed
//   }
// }