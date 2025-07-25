function slider() {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.getElementById("prevBtn");
  const btnRight = document.getElementById("nextBtn");
  const dotContainer = document.getElementById("dotsContainer");
  const slider = document.getElementById("slider");

  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="w-3 h-3 bg-gray-400 rounded-full focus:outline-none transition duration-300" data-slide="${i}"></button>`,
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll("#dotsContainer button")
      .forEach((dot) =>
        dot.classList.toggle("bg-gray-700", dot.dataset.slide == slide),
      );
  };

  const goToSlide = function (slide) {
    slider.style.transform = `translateX(-${slide * 100}%)`;
  };

  const nextSlide = function () {
    curSlide = (curSlide + 1) % maxSlide;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    curSlide = (curSlide - 1 + maxSlide) % maxSlide;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  dotContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      curSlide = Number(e.target.dataset.slide);
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  });
}

slider();
