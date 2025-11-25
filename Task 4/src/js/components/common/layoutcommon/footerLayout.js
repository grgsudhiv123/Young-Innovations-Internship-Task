export const footerTemplate = () => {
    return `
     <!-- footer subscribe -->
      <div class="w-full py-10 px-10 md:px-4 bg-(--bg-base-color)">
        <div
          class="max-w-330 mx-auto w-full flex flex-col sm:flex-row justify-between items-center gap-5 md:gap-20"
        >
          <div class="max-w-full sm:max-w-xs xl:max-w-md w-full">
            <h4
              class="font-semibold text-lg md:text-xl lg:text-2xl leading-[150%] text-gray-900"
            >
              Subcribe our Newsletter
            </h4>
            <p
              class="font-normal text-xs md:text-sm leading-[150%] text-gray-400"
            >
              Pellentesque eu nibh eget mauris congue mattis mattis nec tellus.
              Phasellus imperdiet elit eu magna.
            </p>
          </div>
          <div
            class="flex flex-col lg:flex-row items-start lg:items-center gap-5 w-full justify-end"
          >
            <div
              class="sm:max-w-[350px] md:max-w-full xl:max-w-[536px] w-full rounded-[43px] flex overflow-hidden border border-gray-300 focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-gray-200"
            >
              <input
                type="text"
                placeholder="Your email address"
                class="py-2 xl:py-3.5 px-4 xl:px-6 w-full outline-none font-normal text-base leading-[150%] placeholder:text-gray-500 text-gray-800"
              />
              <button
                type="button"
                class="px-6 xl:px-10 py-2 xl:py-4 rounded-[43px] bg-(--light-green) font-semibold text-base leading-5 text-white hover:bg-(--success-dark) transition-all duration-300 cursor-pointer"
              >
                subscribe
              </button>
            </div>
            <div class="flex flex-row gap-2">
              <a
                href="/"
                class="footer-a-link group"
              >
                <i
                  class="fa-brands fa-facebook-f footer-a-link-icon"
                ></i>
              </a>
              <a
                href="/"
                class="footer-a-link group"
              >
                <i
                  class="fa-brands fa-twitter footer-a-link-icon"
                ></i>
              </a>
              <a
                href="/"
                class="footer-a-link group"
              >
                <i
                  class="fa-brands fa-pinterest-p footer-a-link-icon"
                ></i>
              </a>
              <a
                href="/"
                class="footer-a-link group"
              >
                <i
                  class="fa-brands fa-instagram footer-a-link-icon"
                ></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- footer links -->
      <div class="w-full bg-gray-900 pt-15 space-y-16 px-10 xl:px-0 pb-20">
        <div
          class="max-w-330 mx-auto w-full flex flex-col lg:flex-row gap-10 lg:gap-28 px-4"
        >
          <div class="max-w-full lg:max-w-84 w-full flex flex-col gap-4">
            <a
              href="/"
              class="font-medium text-base md:text-2xl lg:text-[2rem] flex items-center gap-1 md:gap-2 text-white"
              ><img
                class="size-4 md:size-6 lg:size-8"
                src="../src/assets/icons/navbar/logo.svg"
              />Ecobazar</a
            >
            <p class="font-normal text-sm leading-[150%] text-gray-500">
              Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis
              dui, eget bibendum magna congue nec.
            </p>
            <div class="flex flex-row gap-4 text-sm leading-[150%] text-white">
              <span class="w-fit group">
                <a href="/" class="font-medium">(219) 555-0114</a>
                <span
                  class="block max-w-0 h-px bg-(--light-green) group-hover:max-w-full w-full transition-all duration-300"
                ></span>
              </span>
              <span class="text-gray-500">or</span>

              <span class="w-fit group">
                <a href="/" class="font-medium">Proxy@gmail.com</a>
                <span
                  class="block max-w-0 h-px bg-(--light-green) group-hover:max-w-full w-full transition-all duration-300"
                ></span>
              </span>
            </div>
          </div>
          <div
            id="footer-items-container"
            class="w-full grid grid-cols-2 sm:grid-cols-4 gap-10 sm:gap-5"
          ></div>
        </div>
        <div
          class="max-w-330 mx-auto w-full px-4 flex flex-col-reverse sm:flex-row items-center sm:justify-between py-6 border-t-2 border-gray-600 gap-5"
        >
          <p
            class="text-xs sm:text-sm text-gray-500 font-normal leading-[150%]"
          >
            Ecobazar eCommerce © 2021. All Rights Reserved
          </p>

          <ul class="flex flex-row gap-2">
            <li
              class="w-[45px] h-8 flex items-center justify-center border border-gray-800 rounded-md"
            >
              <a href="/"
                ><img src="../src/assets/icons/footer/ApplePay.svg"
              /></a>
            </li>
            <li
              class="w-[45px] h-8 flex items-center justify-center border border-gray-800 rounded-md"
            >
              <a href="/"
                ><img src="../src/assets/icons/footer/visa-logo.svg"
              /></a>
            </li>
            <li
              class="w-[45px] h-8 flex items-end justify-end border border-gray-800 rounded-md"
            >
              <a href="/"
                ><img src="../src/assets/icons/footer/Discover.svg"
              /></a>
            </li>
            <li
              class="w-[45px] h-8 flex items-center justify-center border border-gray-800 rounded-md"
            >
              <a href="/"
                ><img src="../src/assets/icons/footer/Mastercard.svg"
              /></a>
            </li>
            <li class="border border-gray-800 rounded-md">
              <a
                href="/"
                class="w-[65px] h-8 flex flex-col justify-center items-center"
              >
                <span class="flex flex-row gap-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-[11px] text-white"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                  <span
                    class="text-white font-normal text-[11px] leading-[100%]"
                    >Secure</span
                  >
                </span>
                <span class="font-semibold text-xs text-white leading-[100%]"
                  >Payment</span
                >
              </a>
            </li>
          </ul>
        </div>
      </div>
    `
}