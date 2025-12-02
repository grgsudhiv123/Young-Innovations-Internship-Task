import { productCartFeatures } from "../../features/cartFeatures.js";
import { handleWishList } from "../../features/wishListFeatures.js";
import { FetchAllProducts, FetchCartProducts, getAllWishListProduct } from "../../utils/fetchApi.js";
import { PreventScroll } from "../../utils/preventScroll.js";
import { ProductDetailModel } from "./productModel.js";



const ProductCard = (product, prefix) => {
  return `
        <div id="${prefix}-productCard-${product.id}" class="col-span-6 sm:col-span-4 lg:col-span-2 border cursor-pointer border-gray-200 hover:border-(--success-dark) products-card-shadow group productCardId h-fit">
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
                <div class="absolute top-4 right-4 flex flex-col gap-1 md:gap-1.5 transform translate-x-0 md:translate-x-[100px] opacity-100 md:opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-in-out">
                    <button id="productAddToWishlist-${product.id}" type="button" class="m-0 p-0 size-8 md:size-10 rounded-full border border-gray-50 bg-white cursor-pointer hover:bg-gray-300 hover:border-white transition-all duration-200 ease-in-out">
                        <i id="wishlisticon-${product.id}" class="fa-regular fa-heart text-sm md:text-xl"></i>
                    <button>
                    <button id="productmodelbtn" type="button" class="m-0 p-0 size-8 md:size-10 rounded-full border border-gray-50 bg-white cursor-pointer hover:bg-gray-300 hover:border-white transition-all duration-200 ease-in-out">
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
                    <button type="button" id="productAddToCart-${product.id}" class="size-6 md:size-10 flex items-center justify-center rounded-full transition-all duration-200 ease-in-out cursor-pointer bg-gray-50 group/cart hover:bg-(--light-green)"> 
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            id="carticon-${product.id}"
                            class="size-4 lg:size-5 text-gray-900 group-hover/cart:text-white transition-all duration-200 ease-in-out"
                        >
                            <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                            />
                    </svg>
                </button>
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

export default ProductCard;






// product buttons handles all the product card buttons functionalities
// i.e. add to card, add to wishlish, view product model

export  const ProductBtns = async (productData,prefix) => {
  const {preventScroll} = PreventScroll();
  const modelContainer = document.getElementById("model-container");
  const modelBackdrop = document.getElementById("model-backdrop");

  productCardBtnsState(productData);

  const {addCartProduct} = productCartFeatures();

  // handel product model
  productData.map((product) => {
    const productcard = document.getElementById(`${prefix}-productCard-${product.id}`);
    if(!productcard){
      console.warn(`Product card with id ${prefix}-productCard-${product.id} not found`);
      return;
    }


    productcard.addEventListener("click", async (e) => {  

      // handle product model view
      const modelViewBtn = e.target.closest("#productmodelbtn");
      if (modelViewBtn) {
        ProductDetailModel(product);
        const modelcont = modelContainer.classList.contains(
          "model-containerstyle"
        );

        const modelbackdrop = modelBackdrop.classList.contains(
          "model-backdropstyle"
        );

        if (modelcont && modelbackdrop) {
          modelContainer.classList.add("active");
          modelBackdrop.classList.add("active");
          preventScroll();
        }
      }

      // handle add to cart
      const addToCartBtn = e.target.closest(`#productAddToCart-${product.id}`);
      if (addToCartBtn) {
       await addCartProduct(product);
      } 

      // handle product wishlist
      const wishlistBtn = e.target.closest(`#productAddToWishlist-${product.id}`);
      if(wishlistBtn){
        await handleWishList(product);       
      }

      // redirect to product detail page
      if(!modelViewBtn && !addToCartBtn && !wishlistBtn && productcard){
        window.location.href =`productsdetail.html?id=${product.id}`;
      }
    });
  });
};




const productCardBtnsState = async (productData)=> {
  try {
    const cartData = await FetchCartProducts();
    const wishlistData = await getAllWishListProduct();
    if(productData){
      productData.map(product => {
        const wishlistIcon = document.getElementById(`wishlisticon-${product.id}`);
        const isProductInCart = wishlistData.find((wishlistproduct)=> wishlistproduct.id === product.id );
        if(isProductInCart && wishlistIcon){
              wishlistIcon.classList.remove("fa-regular");
              wishlistIcon.classList.add("fa-solid");
        } else{
              wishlistIcon.classList.remove("fa-solid");
              wishlistIcon.classList.add("fa-regular");
        }
      })

      productData.map(product => {
        const isProductInCart = cartData.find((cartproduct)=> cartproduct.id === product.id );
        const cartIcon = document.getElementById(`carticon-${product.id}`);
        const addToCartBtn = document.getElementById(`productAddToCart-${product.id}`);
        if(isProductInCart && addToCartBtn && cartIcon){
          cartIcon.classList.remove("text-gray-900");
          cartIcon.classList.add("text-white");
          addToCartBtn.classList.remove("bg-gray-50");
          addToCartBtn.classList.add("bg-(--light-green)");
        } else{
          cartIcon.classList.add("text-gray-900");
          cartIcon.classList.remove("text-white");
          addToCartBtn.classList.add("bg-gray-50");
          addToCartBtn.classList.remove("bg-(--light-green)");
        }
      })
    } 
  } catch(error) {
    console.log(error);
    return error;
  }
} 