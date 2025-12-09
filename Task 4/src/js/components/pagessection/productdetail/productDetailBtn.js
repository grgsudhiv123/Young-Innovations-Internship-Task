import { handleWishList } from '../../../features/wishListFeatures.js';
import {
    AddProducts,
    FetchCartProducts,
    getAllWishListProduct,
    updateCartProducts,
} from '../../../utils/fetchApi.js';
import { toastMessage } from '../../../utils/toast.js';
import { productCart } from '../../common/sidebar/sidebar.js';
import { relatedProducts } from './relatedProducts.js';

export const productDetailButtons = async (productDetail) => {
    const cartProducts = await FetchCartProducts();
    const isProductInCart = cartProducts.find(
        (cartproduct) => cartproduct.id === productDetail.id,
    );

    let quantity = isProductInCart ? isProductInCart.quantity : 1;
    const deductQuantityBtn = document.getElementById('deductQuantityBtn');
    const addQuantityBtn = document.getElementById('addQuantityBtn');
    const productQuantity = document.getElementById('productQuantity');

    productQuantity.innerText = quantity;

    deductQuantityBtn.addEventListener('click', () => {
        if (quantity > 1) {
            quantity = quantity - 1;
            productQuantity.innerText = quantity;
        }
    });

    addQuantityBtn.addEventListener('click', () => {
        if (quantity < productDetail.stock) {
            quantity = quantity + 1;
            productQuantity.innerText = quantity;
        }
    });

    const addToCartBtn = document.getElementById('addProductToCart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', async () => {
            if (isProductInCart) {
                await updateCartProducts(
                    {
                        id: productDetail.id,
                        quantity: quantity,
                        updatedAt: new Date().toISOString(),
                    },
                    productDetail.id,
                );
            } else {
                await AddProducts({
                    ...productDetail,
                    quantity: quantity,
                    addedAt: new Date().toISOString(),
                });
            }

            toastMessage('Product added to cart', 'success');
            // reload cart for fresh data
            await relatedProducts(productDetail.category);
            await productCart();
        });
    }

    // product wishlist btn

    initialWishlistbtnUpdate(productDetail.id);
    const productWishlistBtn = document.getElementById('productWishlistBtn');

    if (productWishlistBtn) {
        productWishlistBtn.addEventListener('click', async () => {
            await handleWishList(productDetail);
            await productCart();
            await wishlistBtnupdate(productDetail.id);
        });
    }
};

const initialWishlistbtnUpdate = async (id) => {
    const wishlistData = await getAllWishListProduct();
    const productwishlistBtnIcon = document.getElementById(
        'productWishlistBtnIcon',
    );
    const isProductInCart = wishlistData.find(
        (wishlistproduct) => wishlistproduct.id === id,
    );
    if (isProductInCart) {
        productwishlistBtnIcon.classList.remove('fa-regular');
        productwishlistBtnIcon.classList.add('fa-solid');
    } else {
        productwishlistBtnIcon.classList.remove('fa-solid');
        productwishlistBtnIcon.classList.add('fa-regular');
    }
};

const wishlistBtnupdate = async (id) => {
    const wishlistData = await getAllWishListProduct();
    const isProductInCart = wishlistData.find(
        (wishlistproduct) => wishlistproduct.id === id,
    );

    // product detail
    const wishlistIcon = document.querySelector(
        `[id$="productWishlistBtnIcon"]`,
    );
    if (wishlistIcon) {
        if (isProductInCart) {
            wishlistIcon.classList.remove('fa-regular');
            wishlistIcon.classList.add('fa-solid');
        } else {
            wishlistIcon.classList.remove('fa-solid');
            wishlistIcon.classList.add('fa-regular');
        }
    }

    // restof the icons in product card

    const wishlistIcons = document.querySelectorAll(
        `[id$="wishlisticon-${id}"]`,
    );

    wishlistIcons.forEach((icon) => {
        if (isProductInCart && icon) {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
        } else {
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');
        }
    });
};
