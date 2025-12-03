import { productCart } from '../homepage/productCartSidebar.js';
import { calculateDiscountedPrice } from './shoppingCartContents.js';

export function shoppingCartTableRow(cartProduct) {
    const discountedPrice = calculateDiscountedPrice(
        cartProduct.baseprice,
        cartProduct.discount,
    );
    return `
        <tr class="border-b border-gray-200 hover:bg-gray-50 transition">
            <td class="px-2 lg:px-4 xl:px-6 py-2 lg:py-4 xl:py-6">
                <div class="flex items-center gap-4">
                    <img src="${cartProduct.imgURL[0]}" alt="${cartProduct.name}" class="size-[70px] md:size-[100px] aspect-square object-cover bg-gray-50 rounded-lg p-2">
                    <span class="font-normal text-sm md:text-base leading-[150%]">${cartProduct.name}</span>
                </div>
            </td>
            <td class="px-2 lg:px-4 xl:px-6 py-2 lg:py-4 xl:py-6">
                <span class="text-gray-800 font-normal text-sm md:text-base leading-[150%]">$${discountedPrice}</span>
            </td>
            <td class="px-2 lg:px-4 xl:px-6 py-2 lg:py-4 xl:py-6">
                <div class="p-1 md:p-2 rounded-full border border-gray-200 flex flex-row gap-1.5 md:gap-3 items-center w-fit">
                    <button id="deductProductFromCart-${cartProduct.id}" class="shoppingcart-quantitybtn group">
                        <i class="fa-solid fa-minus text-xs md:text-base text-gray-600 group-hover:text-gray-50"></i>
                    </button>
                    <span id="quantity-${cartProduct.id}" class="text-sm md:text-base font-normal leading-[150%]"></span>
                    <button id="addProductToCart-${cartProduct.id}" class="shoppingcart-quantitybtn group">
                        <i class="fa-solid fa-plus text-xs md:text-base group-hover:text-gray-200"></i>
                    </button>
                </div>
            </td>
            <td class="px-2 lg:px-4 xl:px-6 py-2 lg:py-4 xl:py-6">
                <div class="flex items-center  justify-between gap-3">
                    <span  class="ml-2 font-medium text-sm md:text-base leading-[150%]">$<span id="subtotal-${cartProduct.id}" class="subtotalRow"></span></span>
                    <button id="removeCartProduct-${cartProduct.id}" class="text-gray-400 hover:text-red-500 transition size-6 flex justify-center items-center cursor-pointer border-2 border-gray-200 rounded-full">
                        <i class="fas fa-times text-sm"></i>
                    </button>
                </div>
            </td>
        </tr>   
    `;
}

export function shoppingMobileCartProduct(cartProduct) {
    const discountedPrice = calculateDiscountedPrice(
        cartProduct.baseprice,
        cartProduct.discount,
    );
    return `
                            <div
                                id="cartProductCard-${cartProduct.id}"
                                tabindex="0"
                                class="col-span-12 sm:col-span-6 p-3 border border-gray-200 rounded-lg flex gap-5 relative"
                            >
                                <button
                                    id="mobileRemoveCartProduct-${cartProduct.id}"
                                    type="button"
                                    class="absolute top-1 right-1 size-5 rounded-sm border border-gray-200 flex items-center justify-center"
                                >
                                    <i
                                        class="fa-solid fa-x text-sm text-gray-600"
                                    ></i>
                                </button>
                                <div
                                    class="flex-2/5 aspect-square overflow-hidden rounded-sm"
                                >
                                    <img
                                        gap-5
                                        src=${cartProduct.imgURL[0]}
                                        alt="wishlist card image for : ${cartProduct.name} ${cartProduct.imgURL[0]}"
                                        class="w-full h-full object-cover object-center"
                                    />
                                </div>
                                <div
                                    id="infoSection-${cartProduct.id}"
                                    class="w-fit h-full flex-3/5 flex flex-col justify-between gap-2"
                                >
                                    <div class="flex w-full flex-col gap-0.5">
                                        <p
                                            class="font-medium text-base leading-[150%]"
                                        >
                                             ${cartProduct.name}
                                        </p>

                                        <div
                                            class="flex w-full justify-between gap-5 items-center"
                                        >
                                            <p
                                                class="font-medium text-sm text-gray-500"
                                            >
                                                <span
                                                    class="font-medium text-(--light-green)"
                                                >
                                                $${discountedPrice}
                                                </span
                                                >
                                                <span
                                                    class="line-through text-gray-500 font-normal"
                                                    >$${Number(cartProduct.baseprice).toFixed(2)}</span
                                                >
                                            </p>
                                        </div>
                                        <p class="text-sm flex flex-row gap-1">
                                            <span class="font-normal"
                                                >Subtotal :
                                            </span>

                                            <span
                                                class="font-medium text-(--light-green)"
                                            >
                                                $
                                                <span
                                                    id="mobilesubtotal-${cartProduct.id}"
                                                >
                                            </span>
                                            
                                            </span>
                                        </p>
                                    </div>
                                    <div class="space-x-1">
                                        <button
                                            id="mobileDeductProductFromCart-${cartProduct.id}"
                                            class="w-fit px-3 py-1 text-red-700 border border-red-500 font-semibold rounded-lg bg-red-100"
                                        >
                                            <i
                                                class="fa-solid fa-minus text-xs"
                                            ></i>
                                        </button>
                                        <span id="mobileQuantity-${cartProduct.id}">5</span>
                                        <button
                                            id="mobileAddProductToCart-${cartProduct.id}"
                                            class="w-fit px-3 py-1 text-green-700 border border-green-500 font-semibold rounded-lg bg-green-100"
                                        >
                                            <i
                                                class="fa-solid fa-plus text-xs"
                                            ></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
`;
}
