import { BASE_URL } from "../../constants.js";

export function ProductModel(productData) {
  
  const getCategory = async(id) =>{
     const response = await fetch(`${BASE_URL}/categories`);
    const categoriesdata = await response.json();

    return categoriesdata.filter((category)=>category.id === id)[0].name;
  }

  const modelContainer = document.getElementById("model-container");

function handleSocialLinks(platform) {
  const icons = {
    facebook: "fa-facebook-f",
    instagram: "fa-instagram",
    twitter: "fa-twitter",
    pinterest: "fa-pinterest-p"
  };

  const iconClass = icons[platform] || "fa-link";
  return `<i class="fa-brands ${iconClass} footer-a-link-icon"></i>`;
}


  function getTagsName(id) {
    return productData.tags
  }


  modelContainer.innerHTML = `
    <div class="max-w-[1320px] w-full bg-white p-10 h-auto flex flex-row gap-6 relative">
    <button class="absolute p-4 -top-12 -right-4 ">
      <i class="fa-solid fa-x text-xl text-white"></i>
    </button>
      <div class="flex flex-row gap-3 h-full">
      <div class=" flex flex-col justify-between items-center">
        <button type="button">
          <i class="fa-solid fa-chevron-up"></i>
        </button>
        <div class="flex flex-col gap-3">
          ${
            productData &&
            productData.imgURL
              .map(
                (url) => `
              <div class="aspect-80/90 max-w-20 w-full max-h-[90px] h-full overflow-hidden">
                <img src=${url} class="w-full h-full object-cover object-center" />
              </div>
            `
              )
              .join("")
          }
          </div>
          <button type="button">
            <i class="fa-solid fa-chevron-down"></i>
          </button>
      </div>
          <div class="size-[556px] aspect-square overflow-hidden">
            <img src=${
              productData.imgURL[0]
            } class="w-full h-full object-cover object-center"/>
          </div>
      </div>

      <div class="w-[568px] space-y-6">
        <div class="flex flex-col gap-5 pb-5 border-b border-gray-300">
            <div class="flex flex-col gap-3">
              <div class="flex flex-row gap-2 w-fit items-center">
                <h2 class="text-4xl font-semibold leading-[120%]">${productData.name}</h2>
                ${
                  productData.stock
                    ? `
                  <span class="bg-green-500/20 px-2 py-1 rounded-sm text-(--success-dark) leading-[150%] text-sm h-fit">In Stock</span>
                  `
                    : `<span class="bg-red-500/20 px-2 py-1 rounded-sm text-red-800 leading-[150%] text-sm h-fit">Out Of Stock</span>
                  `
                }
              </div>

              <div class="flex flex-row items-center gap-3">
                 <div class="flex flex-row items-center gap-2">
                    <div>
                    ${
                      productData.rating
                        ? `<i class="fa-solid fa-star text-[8px] md:text-xs text-(--warning-color) hover:scale-105"></i>`.repeat(
                            Math.floor(productData.rating)
                          ) +
                          `<i class="fa-solid fa-star text-[8px] md:text-xs text-gray-200"></i>`.repeat(
                            Math.floor(5 - productData.rating)
                          )
                        : ` `
                    }
                    </div>
                    <p class="font-normal text-sm leading-[150%] text-gray-600">${productData.reviews.length} Reviews</p>
                    </div>
                    <span class="size-1 border-2 border-gray-300  bg-gray-300 rounded-full"></span>
                    <p class="font-medium text-sm leading-[150%]">
                      <span class="text-gray-800">SKU:<span> <span class="text-gray-600">${productData.SKU}</span>
                    </p>
                </div>


                </div>
                <div class="flex flex-row gap-3">
                  <p class="text-xs md:text-xl font-normal leading-[150%]">
                    ${
                      productData.discount
                      ? ` 
                            <span class="line-through text-gray-400">$ ${parseFloat(
                              productData.baseprice
                            )}</span> 
                            <span class="text-(--success-dark)">$ ${parseFloat(
                      productData.baseprice -
                                  (productData.baseprice *
                                    productData.discount.replace("%", "")) /
                                    100
                              ).toFixed(2)}</span>  
                            `
                            : `<span>$ ${parseFloat(productData.baseprice)}</span> `
                        }
                  </p>
                  ${
                      productData.discount.replace("%", "")
                        ? `<span class="px-px md:px-2 py-px md:py-[3px] rounded-full bg-(--bg-error)/20 text-red-800 text-[8px] md:text-sm leading-[150%] font-medium">${productData.discount} Off</span>`
                        : ""
                    }
                </div>
      </div>
        <div class="flex flex-col w-full gap-4">
            <div class="flex flex-row w-full justify-between">
                    <div class="flex flex-row items-center gap-2">
                      <span class="text-sm font-normal leading-[150%]">${productData.brand}: </span>
                      <span class="w-[56px] h-[56px] overflow-hidden flex shrink-0 aspect-square rounded-sm border border-gray-100">
                        <img src=${productData.brandLogo} class="w-full h-full object-cover object-center"/>
                      </span>
                    </div>
                    <div class="flex flex-row gap-2.5 items-center ">
                      <span class="text-sm font-normal leading-[150%]">Share Items:</span>
                      <div class="flex flex-row gap-[5px]">
                      ${
                        productData.socialLinks.map((link)=>`
                        <a href=${link.link} target="_blank" class="footer-a-link group">
                        ${handleSocialLinks(`${link.name}`)}
                        </a>
                        `).join("")
                      }
                      </div>
                    </div>
            </div>
              <p class="text-sm text-gray-500 font-normal leading-[150%]">${productData.desc}</p>
        </div>

        <div class="py-4.5 flex w-full justify-between gap-2">
           <div class="p-2 rounded-full flex flex-row gap-1 border border-gray-100">
            <buton class="size-8 rounded-full ">
              <i class="fa-solid fa-plus"></i>
            </button>
            <p>5</p>
             <buton class="size-8 rounded-full">
              <i class="fa-solid fa-minus"></i>
            </button>
          </div>
          <button class="max-w-[368px]">
            <span>Add To Cart</span>
            <i class="fa-solid fa-cart-shopping"></i>
          </button>
          <button>
            <i class="fa-regular fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  `;


}
