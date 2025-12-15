import { calculateDiscountedPrice } from '../../../utils/discountedPrice.js';

export function sidebarComp() {
    return `
        <div class="w-full h-full relative space-y-3">
            <div class="flex justify-between items-center">
            <h2 class="font-medium leading-[150%] text-base md:text-xl">Shopping Card (<span id="sidebarCartCount"></span>)</h2>
            <button id="close-sidebar-cart" type="button" class="size-11 rounded-full flex justify-center items-center cursor-pointer" aria-label="Close sidebar">
                <i class="fa-solid fa-x text-xs md:text-sm"></i>
            </button>
            </div>
            <div id="cartProduct-container" class="flex flex-col gap-3 max-h-[70%] h-full overflow-scroll overflow-x-hidden scrollBar"></div>
            </div>
            <div class="absolute bottom-0 left-0 w-full h-auto pb-10 px-10 bg-white">
            <div class="w-full py-6 flex justify-between text-sm md:text-base leading-[120%]">
                <span class="font-medium">
                <span id="cartProductCount"></span> Products</span>
                <span id="cartProductTotal" class="font-semibold "></span>
            </div>
            <div class="flex flex-col gap-3">
                <button class="py-2 md:py-4 px-5 md:px-10 text-white bg-(--light-green) hover:bg-(--success-dark) rounded-full font-semibold text-sm md:text-base leading-[120%] transition-all duration-200 ease-in-out cursor-pointer" aria-label="Checkout product">Checkout</button>
                <button id="goToCartBtn" class="py-2 md:py-4 px-5 md:px-10 text-(--light-green) rounded-full font-semibold text-sm md:text-base leading-[120%] bg-(--bg-button-green) hover:bg-(--light-green)/50 transition-all duration-200 ease-in-out cursor-pointer hover:text-white" aria-label="Go to cart">Go To Cart</button>
            </div>
        </div>
    `;
}

export function sidebarCard(product, cartProducts) {
    return `
            <div tabindex="0" id="cartProduct-${product.id}" class="flex gap-2 items-center bg-white cursor-pointer hover:bg-gray-50 p-2 transform-all duration-200 ease-in-out justify-between">
                <div class="aspect-120/100 max-w-20 md:max-w-[120px] w-full overflow-hidden">
                    <img src="${product.imgURL[0]}" alt="Image for product ${product.name} with product id : ${product.id}"  class="w-full h-full object-cover object-center"/>
                </div>
                <div class="flex flex-col gap-0.5 max-w-[170px] w-full">
                    <p class="font-normal text-sm leadinhg-[150%]">${product.name}</p>
                    <span>
                        <span class="text-sm font-normal leading-[150%]">${product.quantity}kg x</span>
                        <span class="text-sm font-semibold leading-[120%]">
                        ${
                            product.discount
                                ? `
                            <span class="line-through text-gray-600">${Number(product.baseprice).toFixed(2)}</span>
                            <span class="">${calculateDiscountedPrice(product.baseprice, product.discount)}</span>
                            `
                                : `
                            <span class="">${product.baseprice.toFixed(2)}</span>
                            `
                        }
                        </span>
                    </span> 
                </div>
                <button id="sidebar-cartproduct-btn-${product.id}" class="size-6 border border-gray-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-in-out float-end" aria-label="Delete product">
                    <i class="fa-solid fa-x text-[8px] text-gray-600"></i>
                </button>
            </div>
            ${
                product.id === cartProducts[cartProducts.length - 1].id
                    ? ''
                    : `<hr class="border-t border-gray-300 my-1" aria-label="Seperator" />`
            }
    `;
}
