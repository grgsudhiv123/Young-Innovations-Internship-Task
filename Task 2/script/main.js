import {
  BookTripSteps,
  DestinationConstants,
  footerConstant,
  logosSrc,
  ServicesConstant,
} from "./utils/constants.js";
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
console.log(booktripsteps);
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
        <div class="logos__img">
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
