const productCard = (product) => {
  return `
        <div class="col-span-6 sm:col-span-4 lg:col-span-2 border cursor-pointer border-gray-200 hover:border-(--success-dark) products-card-shadow transition-all duration-200 ease-in-out group">
            <div class="p-[5px] w-full h-fit relative overflow-hidden">
                <div class="aspect-254/230 overflow-hidden">
                    <img src=${
                      product.imgURL[0]
                    } class="w-full h-full object-cover object-center" alt="Product ${
    product.id
  } i.e ${product.name} image."/>
                </div>
                <div class="absolute top-0 md:top-4 left-2 md:left-4">
                    ${
                      product.discount.replace("%", "") > 20
                        ? `<span class="px-px md:px-2 py-px md:py-[3px] rounded-sm bg-(--bg-error) text-white text-[8px] md:text-sm leading-0">Sale ${product.discount}</span>`
                        : ""
                    }
                </div>
                <div class="absolute top-4 right-4 flex flex-col gap-1 md:gap-1.5 transform translate-x-[100px] opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-in-out">
                    <button type="button" class="m-0 p-0 size-8 md:size-10 rounded-full border border-gray-50 bg-white cursor-pointer hover:bg-gray-300 hover:border-white transition-all duration-200 ease-in-out">
                        <i class="fa-regular fa-heart text-sm md:text-xl"></i>
                    <button>
                    <button type="button" class="m-0 p-0 size-8 md:size-10 rounded-full border border-gray-50 bg-white cursor-pointer hover:bg-gray-300 hover:border-white transition-all duration-200 ease-in-out">
                        <i class="fa-solid fa-eye text-sm md:text-xl"></i>
                    <button>
                </div>
            </div>
            <div class="p-1 md:p-3">
                <div class="flex w-full justify-between items-center ">
                    <div>
                        <p class="text-gray-700 leading-[150%] text-sm font-normal line-clamp-1 group-hover:text-(--success-dark)">
                        ${product.name}
                        </p>
                        <p class="text-xs md:text-base font-medium leading-[150%]">
                        ${
                          product.discount
                            ? `<span>$ ${parseFloat(
                                product.baseprice -
                                  (product.baseprice *
                                    product.discount.replace("%", "")) /
                                    100
                              ).toFixed(2)}</span>    
                            <span class="line-through text-gray-400">$ ${parseFloat(
                              product.baseprice
                            )}</span> `
                            : `<span>$ ${parseFloat(product.baseprice)}</span> `
                        }
                        </p>
                    </div>
                    <span class="size-6 md:size-10 flex items-center justify-center rounded-full bg-gray-50 group/cart hover:bg-(--light-green) transition-all duration-200 ease-in-out"> 
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-4 lg:size-5 text-gray-900 group-hover/cart:text-white transition-all duration-200 ease-in-out"
                        >
                            <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                            />
                    </svg>
                </span>
                </div>
                <div>
                    ${
                      product.rating
                        ? `<i class="fa-solid fa-star text-[8px] md:text-xs text-(--warning-color) hover:scale-105"></i>`.repeat(
                            Math.floor(product.rating)
                          ) +
                          `<i class="fa-solid fa-star text-[8px] md:text-xs text-gray-200"></i>`.repeat(
                            Math.floor(5 - product.rating)
                          )
                        : ` `
                    }
                </div>
              
            </div>
        </div>
    `;
};

export default productCard;
