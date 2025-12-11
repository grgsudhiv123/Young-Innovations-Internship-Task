import { footerConstant } from '../../utils/constants.js';

function footerComp() {
    const footerLinks = document.getElementById('footer-items-container');
    footerLinks.innerHTML = footerConstant
        .map(
            (element) => `
    <div class="flex flex-col gap-5">
        <p class="font-medium text-base leading-[150%] text-white">${
            element.header
        }</p>
        ${
            element.contents
                ? `
            <ul class="space-y-3">
            ${element.contents
                .map(
                    (el) => `
                 <li class="group w-fit text-gray-400 font-normal text-sm leading-[150%]">
                     <a href="${el.link}">${el.item1}</a>
                    <span class="block max-w-0 group-hover:max-w-full w-full h-px bg-gray-300 transition-all duration-300"></span>
                </li>
            `,
                )
                .join('')}
                </ul>
                `
                : ``
        }
    </div>
  `,
        )
        .join('');
}

export default footerComp;
