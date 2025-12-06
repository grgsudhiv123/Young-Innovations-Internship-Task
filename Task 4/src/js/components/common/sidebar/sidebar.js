import { productCartFeatures } from '../../../features/cartFeatures.js';
import { calculateDiscountedPrice } from '../../../utils/discountedPrice.js';
import { FetchCartProducts } from '../../../utils/fetchApi.js';
import { PreventScroll } from '../../../utils/preventScroll.js';
import { ProductCartSidebar } from './productCartSidebar.js';
import { sidebarComp } from './sidebarComponents.js';

export const productCart = async () => {
    try {
        const { deleteCartProduct } = productCartFeatures();
        const cartProducts = await FetchCartProducts();

        // loading the product cart
        await ProductCartSidebar(cartProducts);
        updateCartPrices(cartProducts);

        await cartProducts.map((element) => {
            const removeCartProductBtn = document.getElementById(
                `sidebar-cartproduct-btn-${element.id}`,
            );
            removeCartProductBtn.addEventListener('click', async () => {
                await deleteCartProduct(element.id);

                // loading the product cart
                await ProductCartSidebar(cartProducts);
                await productCart();
            });
            const cartProductCard = document.getElementById(
                `cartProduct-${element.id}`,
            );
            cartProductCard.addEventListener('click', () => {
                window.location.href = `productsdetail.html?id=${element.id}`;
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

function updateCartPrices(cartProducts) {
    const quantity = cartProducts.reduce(
        (acc, curr) => acc + Number(curr.quantity),
        0,
    );

    const navCartCount = document.getElementById('nav-cart-count');
    navCartCount.classList.add('hidden');
    if (quantity) {
        navCartCount.innerText = quantity;
        navCartCount.classList.remove('hidden');
    }

    const cartCount = document.getElementById('cartProductCount');
    cartCount.innerText = quantity;

    const sidebarCartCount = document.getElementById('sidebarCartCount');
    sidebarCartCount.innerText = cartProducts.length;

    const totalPrice = cartProducts.reduce(
        (acc, curr) => acc + priceAfterDiscount(curr),
        0,
    );
    const cartPrice = document.getElementById('cartProductTotal');
    cartPrice.innerText = `$${totalPrice ? totalPrice.toFixed(2) : 0.0}`;

    const navCartTotal = document.getElementById('navCartTotal');
    navCartTotal.innerText = `$${totalPrice ? totalPrice.toFixed(2) : 0.0}`;
}

function priceAfterDiscount(curr) {
    const quantity = Number(curr.quantity);
    const discountPrice = calculateDiscountedPrice(
        curr.baseprice,
        curr.discount,
    );
    return discountPrice * quantity;
}

export const HandleSidebarCart = async () => {
    try {
        const cartBackdrop = document.getElementById('sidebarBackdrop');
        const cartContainer = document.getElementById('cartsidebar-container');

        if (cartContainer) {
            cartContainer.innerHTML = sidebarComp();
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

        document.addEventListener('click', (e) => {
            if (
                !closeCartBtn.contains(e.target) &&
                !sidebarCartBtn.contains(e.target) &&
                !cartContainer.contains(e.target)
            ) {
                cartBackdrop.classList.remove('active');
                cartContainer.classList.remove('active');
                allowScroll();
            }
        });
    } catch (error) {
        console.log('Error :', error);
        return error;
    }
};
