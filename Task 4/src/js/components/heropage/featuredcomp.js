import { featuredConstants } from "../../constants.js";

function featured() {
  const featuredContainer = document.getElementById("featured-container");

  featuredContainer.innerHTML = featuredConstants
    .map(
      (element) => `
        <div class="col-span-6 lg:col-span-3 flex flex-row items-start md:items-center gap-2 md:gap-4">
            ${element.icon}
            <div class="flex flex-col gap-1 md:gap-2">
                <p class="font-semibold text-sm lg:text-base leading-[120%]">${element.header}</p>
                <p class="font-normal text-xs md:text-sm leading-[150%] text-gray-400">${element.desc}</p>
            </div>
        </div>
  `
    )
    .join("");
}

export default featured;
