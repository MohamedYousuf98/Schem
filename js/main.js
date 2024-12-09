// Custom Cursor
console.clear();

const { gsap } = window;

const cursorOuter = document.querySelector(".cursor-large");
const cursorInner = document.querySelector(".cursor-small");
let isStuck = false;
let mouse = {
  x: -100,
  y: -100,
};

let scrollHeight = 0;
window.addEventListener("scroll", function (e) {
  scrollHeight = window.scrollY;
});

let cursorOuterOriginalState = {
  width: cursorOuter.getBoundingClientRect().width,
  height: cursorOuter.getBoundingClientRect().height,
};

const buttons = document.querySelectorAll("main button");

buttons.forEach((button) => {
  button.addEventListener("pointerenter", handleMouseEnter);
  button.addEventListener("pointerleave", handleMouseLeave);
});

document.body.addEventListener("pointermove", updateCursorPosition);
document.body.addEventListener("pointerdown", () => {
  gsap.to(cursorInner, 0.15, {
    scale: 2,
  });
});
document.body.addEventListener("pointerup", () => {
  gsap.to(cursorInner, 0.15, {
    scale: 1,
  });
});

function updateCursorPosition(e) {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
}

function updateCursor() {
  gsap.set(cursorInner, {
    x: mouse.x,
    y: mouse.y,
  });

  if (!isStuck) {
    gsap.to(cursorOuter, {
      duration: 0.15,
      x: mouse.x - cursorOuterOriginalState.width / 2,
      y: mouse.y - cursorOuterOriginalState.height / 2,
    });
  }

  requestAnimationFrame(updateCursor);
}

updateCursor();

function handleMouseEnter(e) {
  isStuck = true;
  const targetBox = e.currentTarget.getBoundingClientRect();
  gsap.to(cursorOuter, 0.2, {
    x: targetBox.left,
    y: targetBox.top + scrollHeight,
    width: targetBox.width,
    height: targetBox.width,
    borderRadius: 0,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  });
}

function handleMouseLeave(e) {
  isStuck = false;
  gsap.to(cursorOuter, 0.2, {
    width: cursorOuterOriginalState.width,
    height: cursorOuterOriginalState.width,
    borderRadius: "50%",
    backgroundColor: "transparent",
  });
}

// Navbar
const sideMenu = document.getElementById("sideMenu");
function openMenu() {
  sideMenu.classList.add("side-menu-open");
}
function closeMenu() {
  sideMenu.classList.remove("side-menu-open");
}

// Dropdown Navbar
function toggleDropdown() {
  const dropdownContent = document.querySelector(".dropdown-content");
  dropdownContent.classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.closest(".nav-item")) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

// Video Section
const video = document.querySelector(".background-video");

video.addEventListener("click", function () {
  if (!video.paused) {
    video.pause();
  } else {
    video.play();
  }
});
// News Slider
$(document).ready(function () {
  var isRTL = $("html").attr("dir") === "rtl";

  $(".news-slider").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    rtl: isRTL,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const videoContainer = document.querySelector(".video-container");

  videoContainer.classList.add("initial");

  let timeoutId;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          clearTimeout(timeoutId);

          if (!videoContainer.classList.contains("fullscreen")) {
            timeoutId = setTimeout(() => {
              videoContainer.classList.add("fullscreen");
              videoContainer.classList.remove("hidden");
              videoContainer.style.maxWidth = "100%";
            }, 4700);
          }
        } else {
          clearTimeout(timeoutId);
          videoContainer.classList.remove("fullscreen");
          videoContainer.classList.add("hidden");
          videoContainer.style.maxWidth = "1200px";
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(videoContainer);
});

// Unlocking Section
let timeoutId;

window.addEventListener("scroll", function () {
  const section = document.querySelector(".unlocking-exceptional");
  if (section) {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top <= windowHeight * 0.8 && rect.bottom >= windowHeight * 0.2) {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        section.classList.add("scaled");
      }, 35);
    } else {
      clearTimeout(timeoutId);
      section.classList.remove("scaled");
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  const startCounting = (counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;

    const updateCount = () => {
      // Increase the increment value to speed up the counter
      const increment = Math.ceil(target / 100); // Lower number = faster count

      count += increment;

      if (count >= target) {
        counter.innerText = `+${target}K`;
      } else {
        counter.innerText = `+${count}K`;
        // Reduce the timeout to speed up the updates
        setTimeout(updateCount, 100); // Lower number = faster updates
      }
    };

    updateCount();
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounting(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  counters.forEach((counter) => observer.observe(counter));
});


/*
// Projects Effect
window.addEventListener("scroll", () => {
  document.querySelectorAll(".project-card img.project-img").forEach((img) => {
    const speed = 0.3;
    const offset = window.scrollY * speed;
    img.style.transform = `translateY(${offset}px)`;
  });
});
*/
//  Portofolio Section
$(document).ready(function () {
  function initializeSlider() {
    const isRtl = $("html").attr("dir") === "rtl";
    if ($(window).width() < 768) {
      if (!$(".portfolio-slider").hasClass("slick-initialized")) {
        $(".portfolio-slider").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 1000,
          dots: false,
          rtl: isRtl,
        });
      }
    } else {
      if ($(".portfolio-slider").hasClass("slick-initialized")) {
        $(".portfolio-slider").slick("unslick");
      }
    }
  }

  initializeSlider();
  $(window).resize(function () {
    initializeSlider();
  });
});

// One Selected News

const playButton = document.getElementById("playButton");
const playButtonBg = document.getElementById("playButtonBg");
function toggleVideo() {
  if (video.paused) {
    video.play();
    playButton.style.display = "none";
    playButtonBg.style.display = "none";
  } else {
    video.pause();
    playButton.style.display = "block";
    playButtonBg.style.display = "block";
  }
}
playButton.addEventListener("click", toggleVideo);
video.addEventListener("click", toggleVideo);

// header home slider
$(document).ready(function () {
  $(".slider-vedio-img").slick({
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    arrows: false,
    infinite: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  });
});

// Function to update the displayed language
function setLanguage(language) {
  const languageLabel = document.getElementById("selected-language");
  if (language === "en") {
    languageLabel.textContent = "English";
  } else if (language === "ar") {
    languageLabel.textContent = "العربية";
  }
}
