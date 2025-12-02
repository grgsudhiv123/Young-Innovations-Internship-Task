import { productCartFeatures } from '../../../features/cartFeatures.js';
import { FetchCartProducts } from '../../../utils/fetchApi.js';
import { PreventScroll } from '../../../utils/preventScroll.js';

const ProductCartSidebar = async (cartProducts) => {
    const discountedPrice = function (product) {
        const afterDiscountPrice =
            product.baseprice.toFixed(2) -
            (product.discount.replace('%', '') * product.baseprice) / 100;
        return Number(afterDiscountPrice).toFixed(2);
    };
    const cartContainer = document.getElementById('cartProduct-container');
    cartContainer.innerHTML =
        cartProducts.length !== 0
            ? cartProducts
                  .map(
                      (product) => `
        <div class="flex gap-2 items-center">
            <div class="aspect-120/100 max-w-20 md:max-w-[120px] w-full overflow-hidden">
                <img src="${product.imgURL[0]}" alt="Image for product ${product.name} with product id : ${product.id}"  class="w-full h-full object-cover object-center"/>
            </div>
            <div class="flex flex-col gap-0.5 max-w-[190px] w-full">
                <p class="font-normal text-sm leadinhg-[150%]">${product.name}</p>
                <span>
                    <span class="text-sm font-normal leading-[150%]">${product.quantity}kg x</span>
                    <span class="text-sm font-semibold leading-[120%]">
                    ${
                        product.discount
                            ? `
                        <span class="line-through text-gray-600">${Number(product.baseprice).toFixed(2)}</span>
                        <span class="">${discountedPrice(product)}</span>
                        `
                            : `
                        <span class="">${product.baseprice.toFixed(2)}</span>
                        `
                    }
                    </span>
                </span> 
            </div>
            <button id="sidebar-cartproduct-btn-${product.id}" class="size-6 border border-gray-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-in-out">
                <i class="fa-solid fa-x text-[8px] text-gray-600"></i>
            </button>
        </div>
        ${
            product.id === cartProducts[cartProducts.length - 1].id
                ? ''
                : `
        <span class="h-0.5 bg-gray-100 w-full"></span>
        `
        }
      `,
                  )
                  .join('')
            : `<span class="text-base text-gray-400 leading-[150%]">Cart is empty</span>`;
};

export const productCart = async () => {
    try {
        const { deductCartProduct } = productCartFeatures();
        const cartProducts = await FetchCartProducts();
        // loading the product cart
        await ProductCartSidebar(cartProducts);
        const quantity = cartProducts.reduce(
            (acc, curr) => acc + Number(curr.quantity),
            0,
        );

        const navCartCount = document.getElementById('nav-cart-count');
        navCartCount.innerText = quantity;

        const cartCount = document.getElementById('cartProductCount');
        cartCount.innerText = quantity;

        const sidebarCartCount = document.getElementById('sidebarCartCount');
        sidebarCartCount.innerText = cartProducts.length;

        const totalPrice = cartProducts.reduce(
            (acc, curr) => acc + priceAfterDiscount(curr),
            0,
        );
        const cartPrice = document.getElementById('cartProductTotal');
        cartPrice.innerText = `$${totalPrice.toFixed(2)}`;

        await cartProducts.map((element) => {
            const removeCartProductBtn = document.getElementById(
                `sidebar-cartproduct-btn-${element.id}`,
            );
            removeCartProductBtn.addEventListener('click', async () => {
                await deductCartProduct(element);
                // loading the product cart
                await ProductCartSidebar(cartProducts);
                productCart();
            });
        });

        const goToCartBtn = document.getElementById('goToCartBtn');
        if (goToCartBtn) {
            goToCartBtn.addEventListener('click', () => {
                window.location.href = '/public/shoppingcart.html';
            });
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

function priceAfterDiscount(curr) {
    const quantity = Number(curr.quantity);
    const price = Number(curr.baseprice);
    const discount = Number(curr.discount.replace('%', ''));
    const discountPrice = price - price * (discount / 100);
    return discountPrice * quantity;
}

export const HandleSidebarCart = async () => {
    try {
        const cartBackdrop = document.getElementById('cartsidebar-backdrop');
        const cartContainer = document.getElementById('cartsidebar-container');

        if (cartContainer) {
            cartContainer.innerHTML = `
            <div class="w-full h-full relative space-y-3">
            <div class="flex justify-between items-center">
            <h2 class="font-medium leading-[150%] text-base md:text-xl">Shopping Card (<span id="sidebarCartCount"></span>)</h2>
            <button id="close-sidebar-cart" type="button" class="size-11 rounded-full flex justify-center items-center cursor-pointer">
                <i class="fa-solid fa-x text-xs md:text-sm"></i>
            </button>
            </div>
            <div id="cartProduct-container" class="flex flex-col gap-3 max-h-[70%] h-full overflow-scroll overflow-x-hidden"></div>
            </div>
            <div class="absolute bottom-0 left-0 w-full h-auto pb-10 px-10 bg-white">
            <div class="w-full py-6 flex justify-between text-sm md:text-base leading-[120%]">
                <span class="font-medium">
                <span id="cartProductCount"></span> Product</span>
                <span id="cartProductTotal" class="font-semibold "></span>
            </div>
            <div class="flex flex-col gap-3">
                <button class="py-2 md:py-4 px-5 md:px-10 text-white bg-(--light-green) hover:bg-(--success-dark) rounded-full font-semibold text-sm md:text-base leading-[120%] transition-all duration-200 ease-in-out cursor-pointer">Checkout</button>
                <button id="goToCartBtn" class="py-2 md:py-4 px-5 md:px-10 text-(--light-green) rounded-full font-semibold text-sm md:text-base leading-[120%] bg-(--bg-button-green) hover:bg-(--light-green)/50 transition-all duration-200 ease-in-out cursor-pointer hover:text-white">Go To Cart</button>
            </div>
            </div>
            `;
        }
        const { allowScroll, preventScroll } = PreventScroll();

        const sidebarCartBtn = document.getElementById('open-sidebar-cart');
        sidebarCartBtn.addEventListener('click', () => {
            cartBackdrop.classList.add('active');
            cartContainer.classList.add('active');
            preventScroll();
        });

        const closeCartBtn = document.getElementById('close-sidebar-cart');
        closeCartBtn.addEventListener('click', () => {
            cartBackdrop.classList.remove('active');
            cartContainer.classList.remove('active');
            allowScroll();
        });
    } catch (error) {
        console.log('Error :', error);
        return error;
    }
};
