(() => {
  const imageStrip = document.getElementById("image-strip");
  const container = document.getElementById("scroll-container");
  let prevBtn = document.getElementById("prev");
  let nextBtn = document.getElementById("next");

  const visibleImages = 5;
  let totalImages = 0;
  let index = 0;
  let interval;

  async function loadImages() {
    const response = await fetch("./DataBase.json");
    const data_info = await response.json();
    const urls = data_info.All_Data.our_clients;
    // console.log(urls);

    totalImages = urls.length;

    // Duplicate images for seamless scrolling
    const allImages = urls.concat(urls);
    allImages.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      imageStrip.appendChild(img);
    });

    startAutoScroll();
  }

  function scrollToIndex(idx, smooth = true) {
    if (!smooth) {
      imageStrip.style.transition = "none";
    } else {
      imageStrip.style.transition = "transform 0.5s ease";
    }
    imageStrip.style.transform = `translateX(-${idx * 250}px)`;
  }

  function startAutoScroll() {
    interval = setInterval(() => {
      index++;
      scrollToIndex(index);

      if (index >= totalImages) {
        // Reset to start for infinite loop
        setTimeout(() => {
          scrollToIndex(0, false);
          index = 0;
        }, 500); // wait for transition to finish
      }
    }, 5000);
  }

  function stopAutoScroll() {
    clearInterval(interval);
  }

  prevBtn.addEventListener("click", () => {
    stopAutoScroll();
    index = (index - 1 + totalImages * 2) % (totalImages * 2);
    scrollToIndex(index);
    startAutoScroll();
  });

  nextBtn.addEventListener("click", () => {
    stopAutoScroll();
    index++;
    scrollToIndex(index);

    if (index >= totalImages) {
      setTimeout(() => {
        scrollToIndex(0, false);
        index = 0;
      }, 500);
    }

    startAutoScroll();
  });

  container.addEventListener("mouseenter", stopAutoScroll);
  container.addEventListener("mouseleave", startAutoScroll);

  loadImages();
})();
