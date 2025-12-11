import { getAllWishListProduct } from '../../../api/wishlist.services.js';
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
                        <p class="text-gray-500 capitalize text-base leading-[150%] text-center">No wishlist product found</p>
                    </td>
                </tr>
                `;

            mobileWishlistContainer.innerHTML = `
                <div class="col-span-12">
                    <div class="px-4 lg:px-6 py-4 lg:py-6 ">
                        <p class="text-gray-500 text-center capitalize text-base leading-[150%]">No wishlist product found</p>
                    </div>
                </div>
                `;
        }
    } catch (error) {
        console.error('error while updating the wishlist', error);
        throw error;
    }
};
