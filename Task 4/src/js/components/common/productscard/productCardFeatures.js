import { productCartFeatures } from '../../../features/cartFeatures.js';
import { handleWishList } from '../../../features/wishListFeatures.js';
import {
    FetchCartProducts,
    getAllWishListProduct,
} from '../../../utils/fetchApi.js';
import { PreventScroll } from '../../../utils/preventScroll.js';
import { ProductDetailModel } from '../productmodel/productModel.js';
import { productCart } from '../sidebar/sidebar.js';
import navbar from '../topnavbar/topnavbar.js';

export const ProductBtns = async (productData, prefix) => {
    const { preventScroll } = PreventScroll();
    const modelContainer = document.getElementById('model-container');
    const modelBackdrop = document.getElementById('modelBackdrop');

    productCardBtnsBatchUpdate(productData);

    const { addCartProduct } = productCartFeatures();

    // handel product model
    productData.map((product) => {
        const productcard = document.getElementById(
            `${prefix}-productCard-${product.id}`,
        );
        if (!productcard) {
            console.warn(
                `Product card with id ${prefix}-productCard-${product.id} not found`,
            );
            return;
        }

        productcard.addEventListener('click', async (e) => {
            // handle product model view
            const modelViewBtn = e.target.closest('#productmodelbtn');
            if (modelViewBtn) {
                e.stopPropagation();

                ProductDetailModel(product);
                const modelcont = modelContainer.classList.contains(
                    'model-containerstyle',
                );

                const modelbackdrop =
                    modelBackdrop.classList.contains('backdropstyle');

                if (modelcont && modelbackdrop) {
                    modelContainer.classList.add('active');
                    modelBackdrop.classList.add('active');
                    preventScroll();
                }
            }

            // handle add to cart
            const addToCartBtn = e.target.closest(
                `#productAddToCart-${product.id}`,
            );
            if (addToCartBtn) {
                await addCartProduct(product);
                singleCardButtonUpdate(product.id);
                productCart();
            }

            // handle product wishlist
            const wishlistBtn = e.target.closest(
                `#productAddToWishlist-${product.id}`,
            );
            if (wishlistBtn) {
                await handleWishList(product);
                singleCardButtonUpdate(product.id);
                navbar();
            }

            // redirect to product detail page
            if (!modelViewBtn && !addToCartBtn && !wishlistBtn && productcard) {
                window.location.href = `productsdetail.html?id=${product.id}`;
            }
        });

        productcard.addEventListener('keydown', async (e) => {
            if (e.key === 'Enter') {
                window.location.href = `productsdetail.html?id=${product.id}`;
            }
        });
    });
};

const productCardBtnsBatchUpdate = async (productData) => {
    try {
        const cartData = await FetchCartProducts();
        const wishlistData = await getAllWishListProduct();
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

const singleCardButtonUpdate = async (productId) => {
    try {
        const [cartData, wishlistData] = await Promise.all([
            FetchCartProducts(),
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

export { singleCardButtonUpdate };
