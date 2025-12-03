export const headerTemplate = () => {
    return `
      <!-- header nav1 -->
      <div
        id="headernav1"
        class="header-1 max-w-[82.43rem] w-full mx-auto h-auto flex justify-between p-3 font-normal text-gray-600 text-[10px] md:text-xs leading-[150%]"
      >
        <a href="/" class="flex flex-row gap-2 items-center"
          ><svg
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
          <div class="flex flex-row gap-1.5 items-center">
            <span>Eng</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-label="chevron down arrow"
              class="size-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
          <div class="flex flex-row gap-1.5 items-center">
            <span>USD</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-label="chevron down arrow"
              class="size-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
          <span class="h-full border border-gray-100"></span>
          <a href="/login"> Sign in / Sign up </a>
        </div>
      </div>
      <div class="w-full h-px bg-[rgb(229,229,229)]"></div>
      <!-- header nav2 -->
      <div id="headernav2" class="z-20 w-full bg-white">
      <div
        class="header-2 max-w-[82.43rem] w-full mx-auto h-auto flex justify-between py-4 md:py-7 p-5 md:px-3 border-b md:border-0 border-gray-300 shadow-md md:shadow-none"
      >
        <a
          href="/public/index.html"
          class="font-bold text-base md:text-2xl lg:text-[2rem] flex items-center gap-1 md:gap-2"
          ><img
            class="size-4 md:size-6 lg:size-8"
            src="../src/assets/icons/navbar/logo.svg"
          />Ecobazar</a
        >
        <form
          method="post"
          class="hidden md:flex max-w-90 lg:max-w-125 w-full flex-row rounded-md border border-gray-100 overflow-hidden focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-gray-200"
        >
          <div
            class="w-full flex flex-row items-center gap-2 px-4 lg:px-6 py-2 lg:py-3.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5 text-gray-900 focus-within:text-blue-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              class="w-full outline-0 text-sm leading-[21px] text-gray-900 placeholder:text-gray-500"
              type="text"
              placeholder="Search"
            />
          </div>
          <button
            class="px-4 lg:px-6 py-2 lg:py-3.5 cursor-pointer bg-(--light-green) text-white font-semibold text-xs lg:text-sm leading-[120%] hover:bg-(--success-dark) transition-colors duration-200 ease-in-out"
            type="submit"
          >
            Search
          </button>
        </form>
        <div class="flex flex-row items-center gap-2 lg:gap-4">
          <button id="navWishlistBtn" type="button" class="relative" >
            <i id="navWishlistBtnIcon" class="fa-regular fa-heart text-2xl cursor-pointer"></i>
            <span id="navWishlistCount" class="absolute -top-1 -right-2.5  bg-(--success-dark) group-hover:bg-(--light-green) size-[18px] border border-white flex items-center justify-center rounded-full text-[10px] leading-2.5 text-white transition-all duration-200 ease-in-out"></span>
          </button> 
          <span class="h-6 border border-gray-100"></span>
          <button
            type="button"
            class="flex flex-row gap-2 lg:gap-3 items-center"
          >
            <button type="button" id="open-sidebar-cart" class="relative cursor-pointer group">
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
              <span class="text-gray-900">$57.00</span>
            </div>
          </button>
        </div>
      </div>
      </div>
      <!-- header nav3 -->
      <div id="headernav3" class="sticky top-20 header-3 bg-gray-800 hidden md:block">
        <div
          class="max-w-[82.43rem] w-full mx-auto h-auto flex justify-between p-4"
        >
          <ul id="navbar-dropdwn" class="text-white flex flex-row gap-8">
            <li>
              <button
                type="button"
                class="flex flex-row gap-1 items-center cursor-pointer"
              >
                <span class="font-medium text-sm leading-[150%]"> Home </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-label="chevron down arrow"
                  class="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
            </li>
            <li>
              <button
                type="button"
                class="flex flex-row gap-1 items-center cursor-pointer"
              >
                <span class="font-medium text-sm leading-[150%]"> Shop </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-label="chevron down arrow"
                  class="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
            </li>
            <li>
              <button
                type="button"
                class="flex flex-row gap-1 items-center cursor-pointer"
              >
                <span class="font-medium text-sm leading-[150%]"> Pages </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-label="chevron down arrow"
                  class="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
            </li>
            <li>
              <button
                type="button"
                class="flex flex-row gap-1 items-center cursor-pointer"
              >
                <span class="font-medium text-sm leading-[150%]"> Blog </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-label="chevron down arrow"
                  class="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
            </li>
            <li>
              <a href="/" class="font-medium text-sm leading-[150%]">
                About Us
              </a>
            </li>
            <li>
              <a href="/" class="font-medium text-sm leading-[150%]">
                Contact Us
              </a>
            </li>
          </ul>
          <a href="/" class="flex flex-row gap-2 text-white items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5"
              aria-label="telephone icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"
              />
            </svg>

            <span class="font-medium text-sm leading-[150%]"
              >(219) 555-0114</span
            >
          </a>
        </div>
      </div>
    `;
};
