export const productModelComp = (productData, tagNames, categoryName) => {
    function handleSocialLinks(platform) {
        const icons = {
            facebook: 'fa-facebook-f',
            instagram: 'fa-instagram',
            twitter: 'fa-twitter',
            pinterest: 'fa-pinterest-p',
        };

        const iconClass = icons[platform] || 'fa-link';
        return `<i class="fa-brands ${iconClass} footer-a-link-icon"></i>`;
    }
    return `
 <div class="max-w-[350px] sm:max-w-[650px] md:max-w-[720px] lg:max-w-[950px] xl:max-w-[1200px] 2xl:max-w-[1320px] mx-auto w-full bg-white p-5 xl:p-10 h-[70vh] sm:h-auto flex lg:items-center flex-col sm:flex-row gap-6 relative overflow-y-scroll sm:overflow-y-auto overflow-x-hidden rounded-lg">
    <button tabindex="0" id="model-close-btn" class="fixed p-4 top-0 right-0 cursor-pointer">
      <i class="fa-solid fa-x text-sm lg:text-xl text-gray-500 hover:text-gray-700"></i>
    </button>
      <div class="flex flex-col-reverse justify-end lg:justify-start lg:flex-row gap-3 h-full">
      <div class=" flex flex-row lg:flex-col w-full lg:w-fit justify-between items-center">
        <button id="model-slideimgbtn-prev" type="button">
          <i class="fa-solid fa-chevron-up -rotate-90 lg:rotate-0"></i>
        </button>
        <div id="model-sliderimg-container" class="flex flex-row lg:flex-col gap-3">
          </div>
          <button id="model-slideimgbtn-next" type="button">
            <i class="fa-solid fa-chevron-down -rotate-90 lg:rotate-0"></i>
          </button>
      </div>
          <div id="model-mainimg-container" class="xs:size-[100px] sm:size-[200px] lg:size-[400px] xl:size-[556px] aspect-556/556 overflow-hidden">
          </div>
      </div>

      <div class="w-[300px] md:w-[568px] space-y-3 xl:space-y-6">
        <div class="flex flex-col gap-3 xl:gap-5 pb-5 border-b border-gray-300">
            <div class="flex flex-col gap-3">
              <div class="flex flex-row gap-2 w-fit items-center">
                <h2 class="text-lg sm:text-2xl xl:text-4xl font-semibold leading-[120%]">${productData.name}</h2>
                ${
                    productData.stock
                        ? `
                  <span class="bg-green-500/20 px-1 xl:px-2 py-0.5 xl:py-1 rounded-sm text-(--success-dark) leading-[150%] text-xs xl:text-sm h-fit">In Stock</span>
                  `
                        : `<span class="bg-red-500/20 px-1 xl:px-2 py-0.5 xl:py-1 rounded-sm text-red-800 leading-[150%] text-xs xl:text-sm h-fit">Out Of Stock</span>
                  `
                }
              </div>

              <div class="flex flex-row items-center gap-3">
                 <div class="flex flex-row items-center gap-2">
                    <div>
                    ${
                        productData.rating
                            ? `<i class="fa-solid fa-star text-[8px] md:text-xs text-(--warning-color) hover:scale-105"></i>`.repeat(
                                  Math.floor(productData.rating),
                              ) +
                              `<i class="fa-solid fa-star text-[8px] md:text-xs text-gray-200"></i>`.repeat(
                                  Math.floor(5 - productData.rating),
                              )
                            : ` `
                    }
                    </div>
                    <p class="font-normal text-xs xl:text-sm leading-[150%] text-gray-600">${productData.reviews.length} Reviews</p>
                    </div>
                    <span class="size-1 border-2 border-gray-300  bg-gray-300 rounded-full"></span>
                    <p class="font-medium text-xs xl:text-sm leading-[150%]">
                      <span class="text-gray-800">SKU:<span> <span class="text-gray-600">${productData.SKU}</span>
                    </p>
                </div>


                </div>
                <div class="flex flex-row gap-3">
                  <p class="text-xs md:text-base xl:text-xl font-normal leading-[150%]">
                    ${
                        productData.discount
                            ? ` 
                            <span class="line-through text-gray-400">$${parseFloat(
                                productData.baseprice,
                            )}</span> 
                            <span class="text-(--success-dark)">$${parseFloat(
                                productData.baseprice -
                                    (productData.baseprice *
                                        productData.discount.replace('%', '')) /
                                        100,
                            ).toFixed(2)}</span>  
                            `
                            : `<span>$${parseFloat(productData.baseprice)}</span> `
                    }
                  </p>
                  ${
                      productData.discount.replace('%', '')
                          ? `<span class="px-px md:px-2 py-px md:py-[3px] rounded-full bg-(--bg-error)/20 text-red-800 text-[8px] md:text-[10px] xl:text-sm leading-[150%] font-medium">${productData.discount} Off</span>`
                          : ''
                  }
                </div>
      </div>
        <div class="flex flex-col w-full gap-4">
            <div class="flex flex-col md:flex-row w-full gap-2 justify-between">
                    <div class="flex flex-row items-center gap-2">
                      <span class="text-xs lg:text-sm font-normal leading-[150%]">${productData.brand}: </span>
                      <span class="w-10 xl:w-14 h-10 xl:h-14 overflow-hidden flex shrink-0 aspect-square rounded-sm border border-gray-100">
                        <img src=${productData.brandLogo} class="w-full h-full object-cover object-center"/>
                      </span>
                    </div>
                    <div class="flex flex-row gap-2.5 items-center ">
                      <span class="text-xs lg:text-sm font-normal leading-[150%]">Share Items:</span>
                      <div class="flex flex-row gap-[5px]">
                      ${productData.socialLinks
                          .map(
                              (link) => `
                        <a href=${link.link} target="_blank" class="footer-a-link group">
                        ${handleSocialLinks(`${link.name}`)}
                        </a>
                        `,
                          )
                          .join('')}
                      </div>
                    </div>
            </div>
              <p class="text-xs lg:text-sm text-gray-500 font-normal leading-[150%]">${productData.desc}</p>
        </div>

        <div class="w-full flex justify-between py-[18px] gap-3 border-y-px border-gray-100">
          <div class="w-fit flex flex-row gap-2 md:gap-4 p-1 lg:p-2 items-center border border-gray-100 rounded-full">
          <button id="modelProductDeductbtn" type="button" class="size-6 lg:size-[34px] rounded-full text-xs flex justify-center items-center bg-gray-50 cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-in-out"><i class="fa-solid fa-minus text-sm"></i></button>
          <span id="modelProductQuantity" class="font-medium text-xs lg:text-base leading-[150%]"></span>
          <button id="modelProductAddbtn" type="button" class="size-6 lg:size-[34px] rounded-full text-xs flex justify-center items-center bg-gray-50 cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-in-out"><i class="fa-solid fa-plus text-sm"></i></button>
          </div>  
          <button id="modelAddtoCartBtn" class=" md:max-w-[250px] lg:max-w-[300px] w-fit md:w-full flex gap-1 md:gap-4 justify-center items-center rounded-full bg-(--light-green) hover:bg-(--success-dark) transition-all duration-200 ease-in-out cursor-pointer px-3">
            <span class="font-semibold text-xs lg:text-base leading-[120%] text-white">Add to cart</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none"  class="size-4 md:size-5">
              <path d="M35.9801 34.6678L33.6783 8.72697C33.6369 8.21362 33.2063 7.82447 32.6847 7.82447H27.8327C27.8244 3.51066 24.3138 0 20 0C15.6862 0 12.1755 3.51066 12.1672 7.82447H7.31522C6.80187 7.82447 6.37132 8.21362 6.32164 8.72697L4.01984 34.6678C4.01984 34.7009 4.01984 34.7257 4.01984 34.7589C4.01984 37.6485 6.67767 40 9.93994 40H30.06C33.3223 40 35.9801 37.6485 35.9801 34.7589C35.9801 34.7257 35.9801 34.7009 35.9801 34.6678ZM20 1.98717C23.2208 1.98717 25.8373 4.6036 25.8455 7.82447H14.1544C14.1627 4.6036 16.7791 1.98717 20 1.98717ZM30.06 38.0046H9.93994C7.78717 38.0046 6.03184 36.5721 6.007 34.792L8.22601 9.81163H12.1672V13.2975C12.1672 13.8439 12.6143 14.291 13.1608 14.291C13.7073 14.291 14.1544 13.8439 14.1544 13.2975V9.81163H25.8455V13.2975C25.8455 13.8439 26.2927 14.291 26.8391 14.291C27.3856 14.291 27.8327 13.8439 27.8327 13.2975V9.81163H31.7739L33.9929 34.8002C33.9681 36.5721 32.2128 38.0046 30.06 38.0046Z" fill="#ffffff"/>
              <path d="M24.1316 20.6831L18.2694 26.5453L15.8766 24.1524C15.4874 23.7632 14.8581 23.7632 14.469 24.1524C14.0798 24.5415 14.0798 25.1708 14.469 25.56L17.5657 28.6566C17.7561 28.8471 18.0128 28.9464 18.2694 28.9464C18.5261 28.9464 18.7745 28.8471 18.9732 28.6566L25.5391 22.0907C25.9283 21.7015 25.9283 21.0723 25.5391 20.6831C25.15 20.3022 24.5207 20.3022 24.1316 20.6831Z" fill="#ffffff"/>
            </svg>
          </button>
          <button id="modelWishlistBtn" class="size-9 md:size-10 lg:size-[52px] rounded-full flex justify-center items-center bg-(--bg-button-green) hover:bg-(--light-green)/50 transition-all duration-200 ease-in-out cursor-pointer group">
            <i id="modelWishlistIcon" class="fa-regular fa-heart text-base lg:text-xl text-(--success-dark) group-hover:text-white"></i>
          </button>
        </div>

        <div class="flex flex-col gap-3 text-xs lg:text-sm">
          <div class="flex gap-1.5 font-semibold leading-[150%] capitalize">
            <p>Category: </p> 
            <span class="text-gray-500">${categoryName}</span>
          </div>
          <div class="flex gap-1.5 font-semibold leading-[150%] capitalize">
            <p>Tags : </p> 
            ${tagNames
                .map((tag) => `<span class="text-gray-500">${tag}</span>`)
                .join('')}
          </div>
        </div>
      </div>
    </div>
    `;
};
