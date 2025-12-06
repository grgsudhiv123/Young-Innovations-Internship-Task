import { navbarConstants } from '../../../utils/constants.js';

export function renderDropdown() {
    const dropdownContainer = document.getElementById('navbar-dropdwn');

    if (!dropdownContainer) {
        console.log('Error required elemnt not found');
        return;
    }

    const dropdownContents = navbarConstants
        .map(
            (list) => `
            <li class="relative">
                <button
                    type="button"
                    class=" flex flex-row gap-1 items-center cursor-pointer group"
                    >
                    <span class="font-medium text-sm leading-[150%] group-hover:text-gray-200 transform-all duration-150 ease-in-out"> ${list.header} </span>
                    ${list.contents ? `<i class="fa-solid fa-chevron-down text-xs transform-all duration-200 ease-in-out "></i>` : ''}
                </button>

                ${
                    list.contents
                        ? `
                    <div class="dropdownContents absolute w-fit h-fit bg-gray-800/80 -bottom-4 translate-y-full p-1 rounded-sm hidden transform-all duration-200 ease-in-out ">
                        <ul class="space-y-1 w-full">
                            ${list.contents
                                .map(
                                    (content) => `
                                <li class="w-full"><button data-btnlink=${content.link} class="w-full text-start whitespace-nowrap text-base px-2 py-1 hover:bg-gray-400/50 rounded-md cursor-pointer">${content.item}</button></li>
                                `,
                                )
                                .join('')}
                        </ul>
                    </div>
                    `
                        : ''
                }
            </li>
    `,
        )
        .join('');

    dropdownContainer.innerHTML = dropdownContents;

    handleNavdropBtns(dropdownContainer);
}

function handleNavdropBtns(dropdownContainer) {
    dropdownContainer.addEventListener('click', (e) => {
        const dropdownBtns = e.target.closest('button');
        const buttonIcon = dropdownBtns.querySelector('i');
        console.log('buttonIcon :', buttonIcon);
        const dropdownContentContainer = e.target.closest('.dropdownContents');

        if (dropdownBtns && !dropdownContentContainer) {
            const parentElement = e.target.closest('li');

            const content = parentElement.querySelector('.dropdownContents');
            const allContentContainer =
                document.querySelectorAll('.dropdownContents');

            const allIcon = dropdownContainer.querySelectorAll('i');
            if (allContentContainer && allIcon) {
                allContentContainer.forEach((dropdown) => {
                    if (dropdown !== content) {
                        dropdown.classList.add('hidden');
                    }
                });

                allIcon.forEach((icon) => {
                    if (icon !== buttonIcon) {
                        icon.classList.remove('rotate-180');
                    }
                });
            }

            if (content) {
                content.classList.toggle('hidden');
                buttonIcon.classList.toggle('rotate-180');
            }
        }

        if (dropdownContentContainer) {
            dropdownContentContainer
                .querySelectorAll('button[data-btnlink]')
                .forEach((button) => {
                    const link = button.dataset.btnlink;
                    button.addEventListener('click', () => {
                        console.log(link);
                    });
                });
        }
    });

    document.addEventListener('click', (e) => {
        if (!dropdownContainer.contains(e.target)) {
            dropdownContainer
                .querySelectorAll('.dropdownContents')
                .forEach((content) => {
                    content.classList.add('hidden');
                });
            dropdownContainer.querySelectorAll('i').forEach((icon) => {
                icon.classList.remove('rotate-180');
            });
        }
    });
}
