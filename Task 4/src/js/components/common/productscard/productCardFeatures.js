import { productCartFeatures } from '../../../features/cartFeatures.js';
import { handleWishList } from '../../../features/wishListFeatures.js';
import {
    FetchCartProducts,
    getAllWishListProduct,
} from '../../../utils/fetchApi.js';
import { PreventScroll } from '../../../utils/preventScroll.js';
import { ProductDetailModel } from '../productModel.js';

// product buttons handles all the product card buttons functionalities
// i.e. add to card, add to wishlish, view product model

export const ProductBtns = async (productData, prefix) => {
    const { preventScroll } = PreventScroll();
    const modelContainer = document.getElementById('model-container');
    const modelBackdrop = document.getElementById('modelBackdrop');

    productCardBtnsState(productData);

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
            }

            // handle product wishlist
            const wishlistBtn = e.target.closest(
                `#productAddToWishlist-${product.id}`,
            );
            if (wishlistBtn) {
                await handleWishList(product);
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

const productCardBtnsState = async (productData) => {
    try {
        const cartData = await FetchCartProducts();
        const wishlistData = await getAllWishListProduct();
        if (productData) {
            productData.map((product) => {
                const wishlistIcon = document.getElementById(
                    `wishlisticon-${product.id}`,
                );
                const isProductInCart = wishlistData.find(
                    (wishlistproduct) => wishlistproduct.id === product.id,
                );
                if (isProductInCart && wishlistIcon) {
                    wishlistIcon.classList.remove('fa-regular');
                    wishlistIcon.classList.add('fa-solid');
                } else {
                    wishlistIcon.classList.remove('fa-solid');
                    wishlistIcon.classList.add('fa-regular');
                }
            });

            productData.map((product) => {
                const isProductInCart = cartData.find(
                    (cartproduct) => cartproduct.id === product.id,
                );
                const cartIcon = document.getElementById(
                    `carticon-${product.id}`,
                );
                const addToCartBtn = document.getElementById(
                    `productAddToCart-${product.id}`,
                );
                if (isProductInCart && addToCartBtn && cartIcon) {
                    cartIcon.classList.remove('text-gray-900');
                    cartIcon.classList.add('text-white');
                    addToCartBtn.classList.remove('bg-gray-50');
                    addToCartBtn.classList.add('bg-(--light-green)');
                } else {
                    cartIcon.classList.add('text-gray-900');
                    cartIcon.classList.remove('text-white');
                    addToCartBtn.classList.add('bg-gray-50');
                    addToCartBtn.classList.remove('bg-(--light-green)');
                }
            });
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};
