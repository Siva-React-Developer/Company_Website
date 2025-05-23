const topBtn = document.getElementById("top-up-button");

// Show button after scrolling down 100px

window.onscroll = function () {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;
  // console.log(scrollTop,windowHeight,docHeight);

  if (
    document.body.scrollTop > 400 ||
    document.documentElement.scrollTop > 400
  ) {
    topBtn.style.display = "flex";
  } else {
    topBtn.style.display = "none";
  }
};

function scrollTotop() {
  // Smooth scroll to top
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}