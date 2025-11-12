import {
  BookTripSteps,
  DestinationConstants,
  footerConstant,
  logosSrc,
  ServicesConstant,
} from "./utils/constants.js";

// prevent scroll

function preventDefault(e) {
  e.preventDefault();
}

const scrollOption = { passive: false };

function preventScroll() {
  window.addEventListener("scroll", preventDefault, scrollOption);
  window.addEventListener("wheel", preventDefault, scrollOption);
  window.addEventListener("touchmove", preventDefault, scrollOption);
}

function allowScroll() {
  window.removeEventListener("scroll", preventDefault);
  window.removeEventListener("wheel", preventDefault);
  window.removeEventListener("touchmove", preventDefault);
}

// navbar

function navBarScroll(scrollY) {
  const navbar = document.querySelector(".header");

  if (scrollY > 80) {
    navbar.classList.add("navbar__animation");
  } else {
    navbar.classList.remove("navbar__animation");
  }
}
window.addEventListener("scroll", function () {
  var scrollY = window.scrollY;
  navBarScroll(scrollY);
});

// sidebar

const sidebar = document.querySelector(".sidebar");
const menubtn = document.querySelector(".nav__menu-btn");

console.log(sidebar);

menubtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  preventScroll();
  console.log("clicked");
});

const menuCloseIcon = document.querySelector(".nav__menuclose-icon");
menuCloseIcon.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  allowScroll();
  console.log("Menu close icon clicked");
});

window.addEventListener("click", function (e) {
  // dropdown
  if (
    (!dropbtn.contains(e.target) && !myDropDown.contains(e.target)) ||
    navSearch.contains(e.target)
  ) {
    myDropDown.classList.remove("dropdown-show");
    chevronDown.classList.remove("rotated");
  }
});

// services section

// destinations section
const destination_section = document.querySelector(".destinations__card");

destination_section.innerHTML += DestinationConstants.map(
  (element) => `
    <div class="destinations__card-group">
        <div class="destinations__card-img" >
            <img src="${element.img}" alt="Destination card image :${element.img}"/>
        </div>
        <div class="destinations__card-info">
            <div class="destinations__cardinfo-1">
                <p>${element.location}</p>
                <p>&#x24; ${element.cost}</p>
            </div>
            <div class="destinations__cardinfo-2">
                <p> 
                    <i aria-label="Location arrow" class="fa-solid fa-location-arrow"></i> 
                   <span>${element.total_days} days trip </span>
                </p>
            </div>
        </div>
    </div>
    `
).join("");

// book trips section

const booktripsteps = document.querySelector(".booktrip__steps");
booktripsteps.innerHTML = BookTripSteps.map(
  (element) => `
        <div class="booktrip__info-group">
            <div class="booktrip__icon-container">
                <img src="${element.icon}" alt="Book trip icons : ${element.icon}"/>
            </div>
            <div class="booktrip__info">
                <h3>${element.header}</h3>
                <p>${element.desc}</p>
            </div>  
        </div>
     `
).join("");

// logo section

const logosection = document.querySelector(".logos");
logosection.innerHTML = logosSrc
  .map(
    (element) => `
        <div class="logos__img ">
            <img src="${element.src}" alt="${element.name} image : ${element.src}"/>
        </div>
`
  )
  .join("");

// footer

const footerLinkSection = document.querySelector(".footer__links-container");
footerLinkSection.innerHTML = footerConstant
  .map(
    (element) => `
    <div class="footer__links">
        <h3>${element.header}</h3>
        <ul class="footer__links-group">
            ${element.data
              .map(
                (links) => `
                        <li>
                            <a href="${links.link}">${links.name}</a>
                        </li>
                    `
              )
              .join("")}
        </ul>
    </div>
    `
  )
  .join("");

// animate

const animateUPElements = document.querySelectorAll(".animation--fadeup");
const animateDownElements = document.querySelectorAll(".animation--fadedown");
const animateLeftElements = document.querySelectorAll(".animation--fadeleft");
const animateRightElements = document.querySelectorAll(".animation--faderight");
const animatePupelements = document.querySelectorAll(".animate-p--fadeup");
const animateHdownelements = document.querySelectorAll(".animate-h--fadedown");
const destinationDecore = document.querySelectorAll(
  ".destination-decore--animation"
);

const rotateFront = document.querySelectorAll(".animate-rotateFront");
const rotateBack = document.querySelectorAll(".animate-rotateBack");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
});

animateDownElements.forEach((entries) => observer.observe(entries));
animateUPElements.forEach((entries) => observer.observe(entries));
animateLeftElements.forEach((entries) => observer.observe(entries));
animateRightElements.forEach((entries) => observer.observe(entries));
animatePupelements.forEach((entries) => observer.observe(entries));
animateHdownelements.forEach((entries) => observer.observe(entries));
destinationDecore.forEach((entries) => observer.observe(entries));
rotateFront.forEach((entries) => observer.observe(entries));
rotateBack.forEach((entries) => observer.observe(entries));
