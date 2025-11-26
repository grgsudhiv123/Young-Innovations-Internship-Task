import { AddWishlist, DeleteWishlistByID, getAllWishListProduct } from "../utils/fetchApi.js";


// let repeatedWishListProduct = false;
export const handleWishList  =  async (product) => {
    const wishListProducts = await getAllWishListProduct();
      console.log("wishlist products",wishListProducts);
    try {
      const repeatedProduct  = wishListProducts.find(wishlist => wishlist.id === product.id);
      if(!repeatedProduct){
        AddWishlist(product);
      } else { 
        DeleteWishlistByID(product.id);
      }
    } catch (error) {
      console.log(error);
    }
  }

