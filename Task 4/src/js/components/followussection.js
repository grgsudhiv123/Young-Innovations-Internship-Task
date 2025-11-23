import { followUsConstants } from "../constants.js";

export function FollowUsSection() {

    const followUsContainer = document.getElementById("followus-container");
    followUsContainer.innerHTML = followUsConstants.map((links)=>`
       <div class="col-span-2 overflow-hidden rounded-[10px] aspect-square relative group cursor-pointer ">
        <img src=${links.imgURL} alt="followus : ${links.imgURL}" class="w-full h-full object-cover object-center" />
        <div class="absolute top-0 right-0 w-full h-full flex justify-center items-center bg-(--bg-green) opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out">
            <a href=${links.url} class="group/link">
                <i class="fa-brands fa-instagram text-sm md:text-lg lg:text-2xl text-white group-hover/link:text-gray-800 transition-all duration-200 ease-in-out"></i>
            </a>
        </div>
       </div>
    `).join("");
}