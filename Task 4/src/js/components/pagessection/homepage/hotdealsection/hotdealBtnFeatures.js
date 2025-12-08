import { productCartFeatures } from '../../../../features/cartFeatures.js';
import { handleWishList } from '../../../../features/wishListFeatures.js';
import { getAllWishListProduct } from '../../../../utils/fetchApi.js';
import { PreventScroll } from '../../../../utils/preventScroll.js';
import { ProductDetailModel } from '../../../common/productmodel/productModel.js';

export const buttonFeatures = async (hotestDeal) => {
    if (!hotestDeal) {
        console.log('Error hottest deal data is not found.');
        return;
    }
    const modelContainer = document.getElementById('model-container');
    const modelBackdrop = document.getElementById('modelBackdrop');
    const hottestProductCard = document.getElementById('hottest-productCard');
    hottestProductBtnState(hotestDeal);

    const { addCartProduct } = productCartFeatures();
    const { preventScroll } = PreventScroll();

    hottestProductCard.addEventListener('click', async (e) => {
        const addToWishListBtn = e.target.closest('#hottestProductWishlistBtn');
        const addToCart = e.target.closest('#addHottestProductToCart');
        const modelOpenBtn = e.target.closest('#hottestproductmodelbtn');

        if (addToWishListBtn || addToCart || modelOpenBtn) {
            e.stopPropagation();
        }

        if (modelOpenBtn) {
            ProductDetailModel(hotestDeal);
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

        if (addToCart) {
            await addCartProduct(hotestDeal);
        }
        if (addToWishListBtn) {
            await handleWishList(hotestDeal);
        }
    });
};

const hottestProductBtnState = async (hottestdeal) => {
    try {
        const wishlistData = await getAllWishListProduct();
        if (hottestdeal) {
            const wishlistIcon = document
                .getElementById('hottestProductWishlistBtn')
                .querySelector('i');

            const isProductInCart = wishlistData.find(
                (wishlistproduct) => wishlistproduct.id === hottestdeal.id,
            );
            if (isProductInCart && wishlistIcon) {
                wishlistIcon.classList.remove('fa-regular');
                wishlistIcon.classList.add('fa-solid');
            } else {
                wishlistIcon.classList.remove('fa-solid');
                wishlistIcon.classList.add('fa-regular');
            }
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};
