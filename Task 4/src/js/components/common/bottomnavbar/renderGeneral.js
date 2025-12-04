export function general(container) {
    if (!container) {
        console.log('Error, bottom navbar container not found');
        return;
    }
    container.innerHTML = `
    <div class="h-full w-full">
            <h2 class="text-lg font-semibold mb-1">General</h2>
            <div id="generalContainer" class="mt-5">
                <div id="" class="flex w-full flex-col gap-4">
                    <!-- Language section -->
                    <div class="p-1">
                        <h2 class="mb-1 text-base font-medium leading-[150%] text-gray-700">Choose Language</h2>
                        <button id="languageDropdownBtn" type="button" class="px-4 py-3 w-full border border-gray-500 bg-gray-50 rounded-lg flex justify-between">
                            <span>
                                <i class="fa-solid fa-language text-sm text-gray-400"></i>
                            </span>
                            <span class="w-full text-center text-base text-gray-700 font-semibold">Language</span>
                            <span><i id="dropDwnCheveron" class="fa-solid fa-chevron-down text-sm text-gray-400 transform-all duration-300 ease-in-out"></i></span>
                        </button>
                        <ul id="languageDropdown" class="mt-2 max-h-0 overflow-hidden transform-all duration-500 ease-in-out">
                            <div class="border border-gray-200 p-1 rounded-lg space-y-1">
                            <li>
                                <button type="button" data-language="English" class="px-4 py-3 w-full border border-gray-200 rounded-lg flex justify-between">
                                    <span>
                                         <i class="fa-solid fa-flag-usa text-sm text-gray-400"></i>
                                    </span>
                                    <span id="Value" class="w-full text-center text-base text-gray-500 font-semibold">English</span>
                                </button>
                            </li>
                            <li>
                                <button type="button" data-language="French" class="px-4 py-3 w-full border border-gray-200 rounded-lg flex justify-between">
                                    <span>
                                       <i class="fa-solid fa-language text-sm text-gray-400"></i>
                                    </span>
                                    <span id="Value" class="w-full text-center text-base text-gray-500 font-semibold">French</span>
                                </button>
                            </li>
                            <li>
                                <button type="button" data-language="Espaniol" class="px-4 py-3 w-full border border-gray-200 rounded-lg flex justify-between">
                                    <span>
                                        <i class="fa-solid fa-pepper-hot text-sm text-gray-400"></i>
                                    </span>
                                    <span id="Value" class="w-full text-center text-base text-gray-500 font-semibold">Espaniol</span>
                                </button>
                            </li>
                            <li>
                                <button type="button" data-language="Chinese" class="px-4 py-3 w-full border border-gray-200 rounded-lg flex justify-between">
                                    <span>
                                        <i class="fa-solid fa-yin-yang text-sm text-gray-400"></i>
                                    </span>
                                    <span id="Value" class="w-full text-center text-base text-gray-500 font-semibold">Chinese</span>
                                </button>
                            </li>
                            </div>
                        </ul>
                    </div>

                    <!-- Language section -->
                    <div class="p-1">
                        <h2 class="mb-1 text-base font-medium leading-[150%] text-gray-700">Account</h2>
                        <button id="languageDropdownBtn" type="button" class="px-4 py-3 w-full border border-gray-500 bg-gray-50 rounded-lg flex justify-center gap-4">
                            <span>
                                <i class="fa-solid fa-arrow-right-from-bracket text-sm text-gray-400"></i>
                            </span>
                            <span class="text-center text-base text-gray-700 font-semibold">Sign in</span>
                        </button>
                        <button type="button" class="px-4 py-3 mt-2 w-full flex justify-center border border-gray-500 bg-gray-400 rounded-lg gap-4">
                            <span>
                                <i class="fa-solid fa-user-plus text-sm text-gray-100"></i>
                            </span>
                            <span class=" text-center text-base text-gray-100 font-semibold">Sign in</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    `;

    handleGeneralBtns();
}

function handleGeneralBtns() {
    const languageDropdownBtn = document.getElementById('languageDropdownBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    const cheveron = document.getElementById('dropDwnCheveron');

    languageDropdownBtn.addEventListener('click', () => {
        languageDropdown.classList.toggle('max-h-[500px]');
        cheveron.classList.toggle('rotate-180');
    });

    const languageBtnIcon = languageDropdownBtn.querySelectorAll('span')[0];
    const languageContent = languageDropdownBtn.querySelectorAll('span')[1];

    const buttons = languageDropdown.querySelectorAll('button');
    buttons.forEach((btn) => {
        if (btn) {
            btn.addEventListener('click', () => {
                languageBtnIcon.innerHTML = btn.querySelector('span').innerHTML;
                languageContent.innerHTML = btn.dataset.language;
                languageDropdown.classList.toggle('max-h-[500px]');
                cheveron.classList.toggle('rotate-180');
            });
            console.log('btn : ', btn);
        }
    });

    window.addEventListener('click', (e) => {
        if (!languageDropdownBtn.contains(e.target)) {
            languageDropdown.classList.remove('max-h-[500px]');
            cheveron.classList.remove('rotate-180');
        }
    });
}
