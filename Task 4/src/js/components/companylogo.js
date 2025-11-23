import { bookoffLogo, food, foodNetwork, gseries, mangoLogo, steps } from "../icons.js";

export function CompanyLogo() {
    const brandContainer = document.getElementById("brandLogo-container");
    const brandLogo = [
        steps, mangoLogo,food,foodNetwork,bookoffLogo,gseries
    ]

    brandContainer.innerHTML = brandLogo.map((logo,i)=>`
      <a href='#' class="col-span-2 w-full flex items-center justify-center relative">
        ${logo}
        ${
          i==brandLogo.length-1 ? "" : `<span class="hidden xl:block absolute right-0 w-px h-full bg-gray-100"></span>`
        }
      </a>
    `).join(``);
}
