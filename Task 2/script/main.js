import { DestinationConstants, ServicesConstant } from "./utils/constants.js";

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
