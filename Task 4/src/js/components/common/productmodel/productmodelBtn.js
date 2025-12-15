import { handleWishList } from '../../../features/wishListFeatures.js';
import { toastMessage } from '../../../utils/toast.js';
import { HandleSidebarCart, productCart } from '../sidebar/sidebar.js';
import {
    addProductToCart,
    getAllCartProducts,
    updateCartProduct,
} from '../../../api/productcart.services.js';
import { getAllWishListProduct } from '../../../api/wishlist.services.js';

export const productDetailButtons = async (productDetail) => {
    const cartProducts = await getAllCartProducts();
    const isProductInCart = cartProducts.find(
        (cartproduct) => cartproduct.id === productDetail.id,
    );

    let quantity = isProductInCart ? isProductInCart.quantity : 1;
    const deductQuantityBtn = document.getElementById('modelProductDeductbtn');
    const addQuantityBtn = document.getElementById('modelProductAddbtn');
    const productQuantity = document.getElementById('modelProductQuantity');

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

    const addToCartBtn = document.getElementById('modelAddtoCartBtn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', async () => {
            if (isProductInCart) {
                await updateCartProduct(
                    {
                        id: productDetail.id,
                        quantity: quantity,
                        updatedAt: new Date().toISOString(),
                    },
                    productDetail.id,
                );
            } else {
                await addProductToCart({
                    ...productDetail,
                    quantity: quantity,
                    addedAt: new Date().toISOString(),
                });
            }

            // reload cart for fresh data
            productCart();
            toastMessage('Product added to cart', 'success');
        });
    }

    // product wishlist btn
    initialWishlistbtnUpdate(productDetail.id);

    const productWishlistBtn = document.getElementById('modelWishlistBtn');
    productWishlistBtn.addEventListener('click', async () => {
        await handleWishList(productDetail);
        HandleSidebarCart();
        await productCart();
        await singleWishlistBtnUpdate(productDetail.id);
    });
};

const initialWishlistbtnUpdate = async (id) => {
    const productWishlistBtn = document.getElementById('modelWishlistBtn');
    const productwishlistBtnIcon = document.getElementById('modelWishlistIcon');
    if (productWishlistBtn) {
        const wishlistData = await getAllWishListProduct();
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
    }
};

const singleWishlistBtnUpdate = async (id) => {
    const wishlistData = await getAllWishListProduct();
    const isProductInCart = wishlistData.find(
        (wishlistproduct) => wishlistproduct.id === id,
    );
    const wishlistModelIcon = document.querySelector(
        `[id$="modelWishlistIcon"]`,
    );

    // update productmodel wishlist btn
    if (isProductInCart) {
        wishlistModelIcon.classList.remove('fa-regular');
        wishlistModelIcon.classList.add('fa-solid');
    } else {
        wishlistModelIcon.classList.remove('fa-solid');
        wishlistModelIcon.classList.add('fa-regular');
    }

    const productdetailwishlistIcon = document.querySelector(
        `[id$="productWishlistBtnIcon"]`,
    );
    if (productdetailwishlistIcon) {
        if (isProductInCart) {
            productdetailwishlistIcon.classList.remove('fa-regular');
            productdetailwishlistIcon.classList.add('fa-solid');
        } else {
            productdetailwishlistIcon.classList.remove('fa-solid');
            productdetailwishlistIcon.classList.add('fa-regular');
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
