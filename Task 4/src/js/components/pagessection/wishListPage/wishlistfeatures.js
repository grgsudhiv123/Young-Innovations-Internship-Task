import { productCartFeatures } from '../../../features/cartFeatures.js';
import { DeleteWishlistByID } from '../../../utils/fetchApi.js';
import navbar from '../../common/topnavbar.js';
import {
    HandleSidebarCart,
    productCart,
} from '../homepage/productCartSidebar.js';
import { WishListProductTable } from './wishListTableContents.js';

export const wishListCartFeatures = (wishListData) => {
    try {
        if (!wishListData) return;

        for (const data of wishListData) {
            const removeWishlist = document.getElementById(
                `removeWishListProduct-${data.id}`,
            );

            console.log('removeWishlist : ', removeWishlist);

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
            } catch (error) {
                console.error(
                    'error while adding the wishlist product to cart',
                    error,
                );
                alert('Error while adding the wishlist product to cart');
            }
        });
    });

    [removeWishlist, mobileRemoveWishlist].forEach((el) => {
        el.addEventListener('click', async () => {
            try {
                await DeleteWishlistByID(data.id);
                alert('Product removed from wishlist');
                navbar();
                WishListProductTable();
                HandleSidebarCart();
                productCart();
            } catch (error) {
                console.error('error while removing the wishlist', error);
                alert('Error while removing the wishlist');
            }
        });
    });
};
