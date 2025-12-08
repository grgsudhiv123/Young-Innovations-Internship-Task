import { productCart } from '../components/common/sidebar/sidebar.js';
import navbar from '../components/common/topnavbar/topnavbar.js';
import {
    AddWishlist,
    DeleteWishlistByID,
    getAllWishListProduct,
} from '../utils/fetchApi.js';
import { toastMessage } from '../utils/toast.js';

// let repeatedWishListProduct = false;
export const handleWishList = async (product) => {
    try {
        const wishListProducts = await getAllWishListProduct();
        const repeatedProduct = wishListProducts.find(
            (wishlist) => wishlist.id === product.id,
        );

        if (!repeatedProduct) {
            await AddWishlist(product);
            await navbar();
            toastMessage('Product Added to WishList', 'success');
        } else {
            await DeleteWishlistByID(product.id);
            await navbar();
            toastMessage('Product Removed from WishList', 'success');
        }
    } catch (error) {
        console.log(error);
    }
};
