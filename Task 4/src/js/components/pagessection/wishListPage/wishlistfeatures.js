import { deleteWishlistProductById } from '../../../api/wishlist.services.js';
import { productCartFeatures } from '../../../features/cartFeatures.js';
import { toastMessage } from '../../../utils/toast.js';
import { productCart } from '../../common/sidebar/sidebar.js';
import navbar from '../../common/topnavbar/topnavbar.js';

import { WishListProductTable } from './wishListTableContents.js';

export const wishListCartFeatures = (wishListData) => {
    try {
        if (!wishListData) return;

        for (const data of wishListData) {
            const removeWishlist = document.getElementById(
                `removeWishListProduct-${data.id}`,
            );

            const mobileRemoveWishlist = document.getElementById(
                `mobileRemoveCartBtn-${data.id}`,
            );

            const addWishList = document.getElementById(
                `addWishlistToCart-${data.id}`,
            );

            const mobileAddWishList = document.getElementById(
                `mobileWishlistCartBtn-${data.id}`,
            );

            // handles cart button events
            handleCartEvents(
                removeWishlist,
                mobileRemoveWishlist,
                addWishList,
                mobileAddWishList,
                data,
            );
        }
    } catch (error) {}
};

const handleCartEvents = (
    removeWishlist,
    mobileRemoveWishlist,
    addWishList,
    mobileAddWishList,
    data,
) => {
    if (
        !addWishList ||
        !removeWishlist ||
        !mobileAddWishList ||
        !mobileRemoveWishlist
    ) {
        console.log('Element not found');
        return;
    }

    const { addCartProduct } = productCartFeatures();

    [addWishList, mobileAddWishList].forEach((el) => {
        el.addEventListener('click', async () => {
            try {
                await addCartProduct(data);
                productCart();
                toastMessage('Product added to cart', 'success');
            } catch (error) {
                console.error(
                    'error while adding the wishlist product to cart',
                    error,
                );
                toastMessage(
                    'Error while adding the wishlist product to cart',
                    'error',
                );
            }
        });
    });

    [removeWishlist, mobileRemoveWishlist].forEach((el) => {
        el.addEventListener('click', async () => {
            try {
                await deleteWishlistProductById(data.id);
                navbar();
                WishListProductTable();
                toastMessage('Removed product successfully', 'success');
            } catch (error) {
                console.error('error while removing the wishlist', error);
                toastMessage('Error while removing the wishlist', 'error');
            }
        });
    });
};
