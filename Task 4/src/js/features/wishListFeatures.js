import navbar from '../components/common/topnavbar/topnavbar.js';
import { toastMessage } from '../utils/toast.js';
import {
    addProductToWishlist,
    deleteWishlistProductById,
    getAllWishListProduct,
} from '../api/wishlist.services.js';

// let repeatedWishListProduct = false;
export const handleWishList = async (product) => {
    try {
        const wishListProducts = await getAllWishListProduct();
        const repeatedProduct = wishListProducts.find(
            (wishlist) => wishlist.id === product.id,
        );

        if (!repeatedProduct) {
            await addProductToWishlist(product);
            await navbar();
            toastMessage('Product Added to WishList', 'success');
        } else {
            await deleteWishlistProductById(product.id);
            await navbar();
            toastMessage('Product Removed from WishList', 'success');
        }
    } catch (error) {
        console.error('Error at handleWishList', error.message);
        throw error;
    }
};
