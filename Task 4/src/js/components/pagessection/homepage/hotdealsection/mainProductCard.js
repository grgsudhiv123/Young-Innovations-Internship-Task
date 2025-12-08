import { calculateDiscountedPrice } from '../../../../utils/discountedPrice.js';

export function hottestdealProductCard(hotestDeal) {
    return `
    <div class="aspect-525/460 lg:aspect-525/446 overflow-hidden relative" id="hottest-productCard">
        <img src="${hotestDeal.imgURL[0]}" alt="product-image" class="w-full h-full object-cover object-center z-10"/>
        <div class="absolute top-0 lg:top-6 left-2 lg:left-6 ">
            <span class="bg-(--bg-error) rounded-xs lg:rounded-sm font-normal text-xs lg:text-sm leading-[100%] lg:leading-[150%] text-white py-px lg:py-[3px] px-0.5 lg:px-2 ">Sale ${hotestDeal.discount}</span> 
            <span class="bg-(--light-blue) rounded-xs lg:rounded-sm font-normal text-xs lg:text-sm leading-[100%] lg:leading-[150%] text-white py-px lg:py-[3px] px-0.5 lg:px-2">Biggest Deal</span>
        </div>
        <div class="absolute bottom-4 left-0 right-0 w-full flex flex-row justify-center gap-2 px-4">            
            <button id="hottestProductWishlistBtn" type="button" class="size-5 lg:size-[46px] flex items-center justify-center rounded-full cursor-pointer bg-gray-50 hover:bg-gray-200 transition-all duration-200 ease-in-out" aria-label="Add to wishlist">
                <i class="fa-regular fa-heart text-xs md:text-sm lg:text-xl"></i>
            </button>
            <button id="addHottestProductToCart" type="button" class="max-w-[120px] lg:max-w-[371px] w-full py-1 lg:py-3.5 flex items-center gap-1 lg:gap-3 justify-center rounded-full  group/cart bg-(--light-green) hover:bg-(--success-dark) transition-all duration-200 ease-in-out cursor-pointer" aria-label="Add to cart">
                <span class="text-white text-xs md:text-sm font-semibold leading-[100%] lg:leading-[120%]">Add to cart</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-3 md:size-4 lg:size-5 text-white"
                        >
                            <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                            />
                    </svg>
            </button>
                            
            <button id="hottestproductmodelbtn" type="button" class="size-6 md:size-8 lg:size-[46px] flex items-center justify-center rounded-full cursor-pointer bg-gray-50 hover:bg-gray-200 transition-all duration-200 ease-in-out" aria-label="Open product model">
                <i class="fa-regular fa-eye text-xs md:text-sm lg:text-xl"></i>
            </button>
        </div>
    </div>
    <div>
    </div>
    <div>
        <div class="flex flex-col gap-4 lg:gap-5 p-[5px]">
            <div class="flex flex-col lg:gap-2">
            <p class="text-sm lg:text-lg font-normal md:leading-[120%] text-(--success-dark)  w-fit lg:mx-auto ">${hotestDeal.name}</p>
            <div class="flex flex-row lg:gap-3  w-fit lg:mx-auto">
                  <p class="text-xs md:text-2xl font-normal leading-[150%] ">
                    ${
                        hotestDeal.discount
                            ? `
                            <span class="text-gray-900">$ ${calculateDiscountedPrice(hotestDeal.baseprice, hotestDeal.discount)}</span>  
                               <span class="line-through text-gray-400">$ ${parseFloat(
                                   hotestDeal.baseprice,
                               )}</span> 
                            `
                            : `<span>$ ${parseFloat(hotestDeal.baseprice)}</span> `
                    }
                  </p>
                </div>
                  <div class="flex flex-row items-center gap-2  w-fit lg:mx-auto">
                    <div class="flex flex-row lg:gap-1">
                    ${
                        hotestDeal.rating
                            ? `<i class="fa-solid fa-star text-[8px] md:text-xs text-(--warning-color) hover:scale-105"></i>`.repeat(
                                  Math.floor(hotestDeal.rating),
                              ) +
                              `<i class="fa-solid fa-star text-[8px] md:text-xs text-gray-200"></i>`.repeat(
                                  Math.floor(5 - hotestDeal.rating),
                              )
                            : ` `
                    }
                    </div>
                    <p class="font-normal text-xs lg:text-sm leading-[150%] text-gray-600"><span>(</span>${hotestDeal.reviews.length} Feedbacks <span>)</span></p>
                    </div>
            </div>

                    <div class="w-fit flex flex-col gap-1.5 mx-auto" id="hottestproduct-countdown">
                        <p class="text-xs lg:text-sm font-normal text-center leading-0 lg:leading-[18px] text-gray-400">Hurry up! Offer ends In:</p>
                        <div id="hottestDeal-countdown" class="w-fit flex flex-row gap-2 mx-auto mt-2 text-center">
                            <span class="flex flex-col gap-1">
                                <span class="text-xs lg:text-lg font-medium leading-[100%] lg:leading-[150%]">00</span> <span class="text-gray-400 text-[8px] lg:text-[10px] hottestCountdownText">DAYS</span>
                            </span>
                            <span class="text-md lg:text-2xl text-gray-500">:</span>
                            <span class="flex flex-col gap-1">
                                <span class="text-xs lg:text-lg font-medium leading-[100%] lg:leading-[150%]">02</span> <span class="text-gray-400 text-[8px] lg:text-[10px] hottestCountdownText">HOURS</span>
                            </span>
                            <span class="text-md lg:text-2xl text-gray-500">:</span>
                            <span class="flex flex-col gap-1">
                                <span class="text-xs lg:text-lg font-medium leading-[100%] lg:leading-[150%]">18</span> <span class="text-gray-400 text-[8px] lg:text-[10px] hottestCountdownText">MINS</span>
                            </span>
                            <span class="text-md lg:text-2xl text-gray-500">:</span>
                            <span class="flex flex-col gap-1">
                                <span class="text-xs lg:text-lg font-medium leading-[100%] lg:leading-[150%]">46</span> <span class="text-gray-400 text-[8px] lg:text-[10px] hottestCountdownText">SECS</span>
                            </span>
                        </div>
                    </div>
        </div>
    </div>
    `;
}
