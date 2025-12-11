import { productCartFeatures } from '../../../features/cartFeatures.js';
import { handleWishList } from '../../../features/wishListFeatures.js';

import { PreventScroll } from '../../../utils/preventScroll.js';
import { ProductDetailModel } from '../productmodel/productModel.js';
import { productCart } from '../sidebar/sidebar.js';
import navbar from '../topnavbar/topnavbar.js';
import {
    batchCardBtnsUpdate,
    singleCardButtonUpdate,
} from './productCardBtnUpdate.js';

export const ProductBtns = async (productData, prefix) => {
    const modelContainer = document.getElementById('model-container');
    const modelBackdrop = document.getElementById('modelBackdrop');

    await batchCardBtnsUpdate(productData);

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
                    PreventScroll.preventScroll();
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
