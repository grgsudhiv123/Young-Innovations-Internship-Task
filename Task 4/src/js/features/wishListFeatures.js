import { AddWishlist, DeleteWishlistByID, getAllWishListProduct } from "../utils/fetchApi.js";


// let repeatedWishListProduct = false;
export const handleWishList  =  async (product) => {
  try {
      const wishListProducts = await getAllWishListProduct();
      const repeatedProduct  = wishListProducts.find(wishlist => wishlist.id === product.id);

      if(!repeatedProduct){
        AddWishlist(product);
        alert("Product Added to WishList");
      } else { 
        DeleteWishlistByID(product.id);
        alert("Product Removed from WishList");
      }
        window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

