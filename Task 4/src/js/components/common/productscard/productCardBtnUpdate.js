import { getAllCartProducts } from '../../../api/productcart.services.js';
import { getAllWishListProduct } from '../../../api/wishlist.services.js';

export const batchCardBtnsUpdate = async (productData) => {
    try {
        const [cartData, wishlistData] = await Promise.all([
            getAllCartProducts(),
            getAllWishListProduct(),
        ]);
        if (productData) {
            productData.map((product) => {
                const wishlistIcons = document.querySelectorAll(
                    `[id$="wishlisticon-${product.id}"]`,
                );

                const isProductInWishlistCart = wishlistData.find(
                    (wishlistproduct) => wishlistproduct.id === product.id,
                );
                wishlistIcons.forEach((icon) => {
                    if (isProductInWishlistCart && icon) {
                        icon.classList.remove('fa-regular');
                        icon.classList.add('fa-solid');
                    } else {
                        icon.classList.remove('fa-solid');
                        icon.classList.add('fa-regular');
                    }
                });
            });

            productData.map((product) => {
                const isInCart = cartData.find(
                    (item) => item.id === product.id,
                );

                const cartButtons = document.querySelectorAll(
                    `[id$="productAddToCart-${product.id}"]`,
                );
                const cartIcons = document.querySelectorAll(
                    `[id$="carticon-${product.id}"]`,
                );

                cartButtons.forEach((btn) => {
                    if (isInCart && btn) {
                        btn.classList.remove('bg-gray-50');
                        btn.classList.add('bg-(--light-green)');
                    } else {
                        btn.classList.add('bg-gray-50');
                        btn.classList.remove('bg-(--light-green)');
                    }
                });

                cartIcons.forEach((icon) => {
                    if (isInCart && icon) {
                        icon.classList.remove('text-gray-900');
                        icon.classList.add('text-white');
                    } else {
                        icon.classList.add('text-gray-900');
                        icon.classList.remove('text-white');
                    }
                });
            });
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const singleCardButtonUpdate = async (productId) => {
    try {
        const [cartData, wishlistData] = await Promise.all([
            getAllCartProducts(),
            getAllWishListProduct(),
        ]);

        const isProductInWishlistCart = wishlistData.find(
            (wishlistproduct) => wishlistproduct.id === productId,
        );
        const wishlistIcons = document.querySelectorAll(
            `[id$="wishlisticon-${productId}"]`,
        );

        wishlistIcons.forEach((icon) => {
            if (isProductInWishlistCart && icon) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
            }
        });

        // product detail page
        const wishlistIcon = document.querySelector(
            `[id$="productWishlistBtnIcon"]`,
        );
        if (wishlistIcon) {
            if (isProductInWishlistCart) {
                wishlistIcon.classList.remove('fa-regular');
                wishlistIcon.classList.add('fa-solid');
            } else {
                wishlistIcon.classList.remove('fa-solid');
                wishlistIcon.classList.add('fa-regular');
            }
        }

        const isInCart = cartData.find((item) => item.id === productId);

        const cartButtons = document.querySelectorAll(
            `[id$="productAddToCart-${productId}"]`,
        );
        const cartIcons = document.querySelectorAll(
            `[id$="carticon-${productId}"]`,
        );

        cartButtons.forEach((btn) => {
            if (isInCart && btn) {
                btn.classList.remove('bg-gray-50');
                btn.classList.add('bg-(--light-green)');
            } else {
                btn.classList.add('bg-gray-50');
                btn.classList.remove('bg-(--light-green)');
            }
        });

        cartIcons.forEach((icon) => {
            if (isInCart && icon) {
                icon.classList.remove('text-gray-900');
                icon.classList.add('text-white');
            } else {
                icon.classList.add('text-gray-900');
                icon.classList.remove('text-white');
            }
        });
    } catch (error) {
        console.log(error);
        return error;
    }
};
