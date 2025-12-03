import { getAllWishListProduct } from '../../../utils/fetchApi.js';
import {
    wishlistMobileCartProduct,
    wishlistTableRow,
} from './renderwishlistItems.js';

import { wishListCartFeatures } from './wishlistfeatures.js';

export const WishListProductTable = async () => {
    let wishListData;
    try {
        const wishlistContainer = document.getElementById('wishlistTabel');
        const mobileWishlistContainer = document.getElementById(
            'mobileWishlistContainer',
        );
        if (!wishlistContainer) return;
        wishListData = await getAllWishListProduct();

        if (wishListData && wishListData.length !== 0) {
            const updatedWishList = wishListData
                .map((wishlist) => wishlistTableRow(wishlist))
                .join('');

            const updatedMobileWishlist = wishListData
                .map((wishlist) => wishlistMobileCartProduct(wishlist))
                .join('');

            wishlistContainer.innerHTML = updatedWishList;
            mobileWishlistContainer.innerHTML = updatedMobileWishlist;

            // accessing the remove wishlist button after dom is loaded
            wishListCartFeatures(wishListData);
        } else {
            wishlistContainer.innerHTML = `
                <tr>
                    <td class="px-4 lg:px-6 py-4 lg:py-6 ">
                        <p class="text-gray-500 capitalize text-base leading-[150%]">No wishlist found</p>
                    </td>
                </tr>
                `;
        }
    } catch (error) {
        console.log('error while updating the wishlist', error);
        return error;
    }
};
