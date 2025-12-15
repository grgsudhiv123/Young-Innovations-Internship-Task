import { calculateDiscountedPrice } from '../../../utils/discountedPrice.js';

export function wishlistTableRow(wishlist) {
    const discountedPrice = calculateDiscountedPrice(
        wishlist.baseprice,
        wishlist.discount,
    );
    const stockStyle = getStockInfo(wishlist.stock);
    return `
        <tr tabindex="0" class="border-b border-gray-200 hover:bg-gray-50 transition">
            <td class="px-4 lg:px-6 py-4 lg:py-6">
                <div class="flex items-center gap-4">
                    <img src="${wishlist.imgURL[0]}" alt="${wishlist.name}" class="size-14 md:size-[100px] aspect-square object-cover bg-gray-50 rounded-lg p-2">
                    <span class="text-gray-800 font-medium whitespace-nowrap text-sm md:text-base">${wishlist.name}</span>
                </div>
            </td>
            <td class="px-4 lg:px-6 py-4 lg:py-6 whitespace-nowrap text-sm md:text-base">
                <span class="text-gray-800 font-semibold">$${discountedPrice}</span>
                <span class="text-gray-400 line-through ml-2">$${wishlist.baseprice}</span>
            </td>
            <td class="px-4 lg:px-6 py-4 lg:py-6">
                <span class="inline-block px-3 py-1 text-xs font-medium rounded ${stockStyle.color} whitespace-nowrap">${stockStyle.status}</span>
            </td>
            <td class="px-4 lg:px-6 py-4 lg:py-6">
                <div class="flex items-center  justify-between gap-3">
                    <button id="addWishlistToCart-${wishlist.id}" class="px-3 lg:px-6 py-2 text-white text-xs whitespace-nowrap lg:text-sm font-medium rounded-full  hover:shadow-lg transition transform hover:-translate-y-0.5 ${stockStyle.addBtnStyle}">
                        Add to Cart
                    </button>
                    <button id="removeWishListProduct-${wishlist.id}" class="text-gray-400 hover:text-red-500 transition size-5 md:size-6 flex justify-center items-center cursor-pointer border-2 border-gray-200 rounded-full">
                        <i class="fas fa-times text-xs md:text-sm"></i>
                    </button>
                </div>
            </td>
        </tr>    
    `;
}

export function wishlistMobileCartProduct(wishlist) {
    const discountedPrice = calculateDiscountedPrice(
        wishlist.baseprice,
        wishlist.discount,
    );
    const stockStyle = getStockInfo(wishlist.stock);
    return `
                    <div
                        tabindex="0"
                        class="col-span-12 p-3 border border-gray-200 rounded-lg flex gap-5 relative"
                    >
                        <button
                            id="mobileRemoveCartBtn-${wishlist.id}"
                            type="button"
                            class="absolute top-1 right-1 size-4 rounded-sm border border-gray-200 flex items-center justify-center"
                        >
                            <i
                                class="fa-solid fa-x text-[10px] text-gray-600"
                            ></i>
                        </button>
                        <div
                            class="size-24 flex-1/3 aspect-square overflow-hidden rounded-sm"
                        >
                            <img
                                gap-5
                                src=${wishlist.imgURL[0]}
                                alt="wishlist card image : ${wishlist.name}"
                                class="w-full h-full object-cover object-center"
                            />
                        </div>
                        <div
                            id="infoSection"
                            class="w-fit h-full flex-2/3 flex flex-col justify-between gap-2"
                        >
                            <div class="flex w-full flex-col gap-0.5">
                                <p class="font-medium text-base leading-[150%]">
                                    ${wishlist.name}
                                </p>

                                <div
                                    class="flex w-full justify-between gap-5 items-center"
                                >
                                    <p class="flex gap-1 text-sm">
                                        <span class="font-medium">$${Number(wishlist.baseprice).toFixed(2)}</span>
                                        <span
                                            class="line-through text-gray-500 font-normal"
                                            >$${discountedPrice}</span
                                        >
                                    </p>
                                    <span
                                        class="px-2 py-1 rounded-lg text-sm ${stockStyle.color} font-medium leading-[150%]"
                                    >
                                        ${stockStyle.status}
                                    </span>
                                </div>
                            </div>
                            <button
                                id="mobileWishlistCartBtn-${wishlist.id}"
                                class="w-fit px-4 py-1 text-sm text-white font-semibold rounded-lg ${stockStyle.addBtnStyle}"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
    `;
}

function getStockInfo(stock) {
    const inStock = stock && stock > 0;

    return {
        inStock,
        status: inStock ? 'In Stock' : 'Out of Stock',
        color: inStock
            ? 'bg-green-100 text-(--success-dark)'
            : 'bg-red-100 text-red-800',
        addBtnStyle: inStock
            ? 'cursor-pointer bg-(--light-green) hover:bg-green-700'
            : 'cursor-not-allowed bg-gray-400',
    };
}
