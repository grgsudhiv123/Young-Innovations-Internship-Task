export const headerTemplate = () => {
    return `
      <!-- header nav1 -->
      <div
        id="headernav1"
        aria-label="Top header navigation"
        class="header-1 max-w-[82.43rem] w-full mx-auto h-auto flex justify-between p-3 font-normal text-gray-600 text-[10px] md:text-xs leading-[150%]"
      >
        <a href="/" class="flex flex-row gap-2 items-center" aria-label="Store location link"
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-5 text-gray-600"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          <span>Store Location: Lincoln- 344, Illinois, Chicago, USA</span>
        </a>

        <div class="hidden md:flex flex-row gap-5">
          <div id="languageSelector" class="relative">
            <button type="button" class="flex flex-row gap-1.5 items-center cursor-pointer" aria-label="Change language">
              <span class="font-medium text-sm">Eng</span>
              <i class="fa-solid fa-chevron-down text-[7px] transition-all ease-in-out duration-200 "></i>
            </button>
            <ul class="absolute z-10 w-[50px] hidden h-fit overflow-hidden bg-gray-100 text-xs font-medium">
              <li><button type="button" class="cursor-pointer px-1 py-0.5 hover:bg-gray-50 transition-all ease-in-out duration-200 rounded-md w-full" data-btnValue="ZH" aria-label="Language option">ZH</button></li>
              <li><button type="button" class="cursor-pointer px-1 py-0.5 hover:bg-gray-50 transition-all ease-in-out duration-200 rounded-md w-full" data-btnValue="ES" aria-label="Language option">ES</button></li>
              <li><button type="button" class="cursor-pointer px-1 py-0.5 hover:bg-gray-50 transition-all ease-in-out duration-200 rounded-md w-full" data-btnValue="FR" aria-label="Language option">FR</button></li>
              <li><button type="button" class="cursor-pointer px-1 py-0.5 hover:bg-gray-50 transition-all ease-in-out duration-200 rounded-md w-full" data-btnValue="DE" aria-label="Language option">DE</button></li>
            </ul>
          </div>
          <div id="currencySelector" class="relative">
            <button type="button" class="flex flex-row gap-1.5 items-center cursor-pointer" aria-label="Change currency">
              <span class="font-medium text-sm">USD</span>
              <i class="fa-solid fa-chevron-down text-[7px] transition-all ease-in-out duration-200"></i>
            </button>
            <ul class="absolute z-10 w-[50px] hidden h-fit overflow-hidden bg-gray-100 text-xs font-medium ">
              <li><button type="button" class="cursor-pointer px-1 py-0.5 hover:bg-gray-50 transition-all ease-in-out duration-200 rounded-md w-full" data-btnValue="EUR" aria-label="Currency option">EUR</button></li>
              <li><button type="button" class="cursor-pointer px-1 py-0.5 hover:bg-gray-50 transition-all ease-in-out duration-200 rounded-md w-full" data-btnValue="USD" aria-label="Currency option">USD</button></li>
              <li><button type="button" class="cursor-pointer px-1 py-0.5 hover:bg-gray-50 transition-all ease-in-out duration-200 rounded-md w-full" data-btnValue="CNY" aria-label="Currency option">CNY</button></li>
              <li><button type="button" class="cursor-pointer px-1 py-0.5 hover:bg-gray-50 transition-all ease-in-out duration-200 rounded-md w-full" data-btnValue="AUD" aria-label="Currency option">AUD</button></li>
              <li><button type="button" class="cursor-pointer px-1 py-0.5 hover:bg-gray-50 transition-all ease-in-out duration-200 rounded-md w-full" data-btnValue="INR" aria-label="Currency option">INR</button></li>
            </ul>
          </div>
          <span class="h-full border border-gray-100"></span>
          <a href="/login" aria-label="Sign in or sign up">Sign in / Sign up</a>
        </div>
      </div>
      <div class="w-full h-px bg-[rgb(229,229,229)]"></div>
      <!-- header nav2 -->
      <div id="header-container" class="w-full h-auto">
      <div id="headernav2" class="z-20 w-full bg-white" aria-label="Main header navigation">
      <div
        class="header-2 max-w-[82.43rem] w-full mx-auto h-auto flex justify-between py-4 md:py-7 p-5 md:px-3 border-b md:border-0 border-gray-300 shadow-md md:shadow-none"
      >
        <a
          href="/public/index.html"
          class="font-bold text-base md:text-2xl lg:text-[2rem] flex items-center gap-1 md:gap-2"
          aria-label="Go to Ecobazar homepage"
          ><img
            class="size-4 md:size-6 lg:size-8"
            src="../src/assets/icons/navbar/logo.svg"
            alt="Ecobazar Logo"
          />Ecobazar</a
        >
        <div id="searchContainer" class="relative max-w-90 lg:max-w-125 w-full">
        <form
          name="Search Product Form"
          aria-label="Search Product Form"          
          class="hidden md:flex w-full flex-row rounded-md border border-gray-100 overflow-hidden focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-gray-200"
        >
          <div
            class="w-full flex flex-row items-center gap-2 px-4 lg:px-6 py-2 lg:py-3.5"
          >
          <i class="fa-solid fa-magnifying-glass" class="size-5 text-gray-900 focus-within:text-blue-500"></i>
            <input
              name="navbarSearchField"
              class="w-full outline-0 text-sm leading-[21px] text-gray-900 placeholder:text-gray-500"
              type="text"
              placeholder="Search"
              aria-label="Search products"
            />
          </div>
          </form>
          <div id="navbarSearchResult" class="absolute w-full max-h-60 overflow-y-auto z-20 bg-white -bottom-2 translate-y-full rounded-lg space-y-2 scrollBar hidden">
          </div>
        </div>
        <div class="flex flex-row items-center gap-2 lg:gap-4">
          <button id="navWishlistBtn" type="button" class="relative" aria-label="Open Wishlist">
            <i id="navWishlistBtnIcon" class="fa-regular fa-heart text-2xl cursor-pointer"></i>
            <span id="navWishlistCount" class="absolute -top-1 -right-2.5  bg-(--success-dark) group-hover:bg-(--light-green) size-[18px] border border-white flex items-center justify-center rounded-full text-[10px] leading-2.5 text-white transition-all duration-200 ease-in-out"></span>
          </button> 
          <span class="h-6 border border-gray-100"></span>
          <div
            class="flex flex-row gap-2 lg:gap-3 items-center"
          >
            <button type="button" id="open-sidebar-cart" class="relative cursor-pointer group" aria-label="Open Sidebar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 lg:size-8 group-hover:text-(--success-dark) transition-colors duration-200 ease-in-out"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <span
                id="nav-cart-count"
                class="absolute -top-1 -right-1 bg-(--success-dark) group-hover:bg-(--light-green) size-[18px] border border-white flex items-center justify-center rounded-full text-[10px] leading-2.5 text-white transition-all duration-200 ease-in-out"
              >
              </span>
            </button>
            <div
              class="hidden md:flex flex-col gap-2 font-normal text-[11px] leading-[120%] items-start"
            >
              <span class="text-gray-700">Shopping cart:</span>
              <span id="navCartTotal" class="text-gray-900 text-sm font-medium">$57.00</span>
            </div>
          </div>
        </div>
      </div>
      </div>
      <!-- header nav3 -->
      <div id="headernav3" class=" header-3 bg-gray-800 hidden md:block">
        <div
          class="max-w-[82.43rem] w-full mx-auto h-auto flex justify-between p-4"
        >
          <ul id="navbar-dropdwn" class="text-white flex flex-row gap-8">
          </ul>
          
          <a href="tel:2195550114" class="flex flex-row gap-2 text-white items-center" aria-label="Telephone link">
            <i class="fa-solid fa-phone text-base"></i>
            <span class="font-medium text-sm leading-[150%]"
              >(219) 555-0114</span
            >
          </a>
        </div>
      </div>
      </div>
    `;
};
