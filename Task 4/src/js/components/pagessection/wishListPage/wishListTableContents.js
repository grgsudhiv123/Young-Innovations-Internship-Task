import { productCartFeatures } from "../../../features/cartFeatures.js";
import { DeleteWishlistByID, getAllWishListProduct } from "../../../utils/fetchApi.js";

export const WishListProductTable = async ()=>{
    let wishListData;
    try {
        const wishlistContainer = document.getElementById("wishlistTabel");
        if(!wishlistContainer) return;
        wishListData  = await getAllWishListProduct();

        const {addCartProduct} = productCartFeatures();

        if(wishListData && wishListData.length !== 0){
            const updatedWishList = wishListData.map(wishlist=>wishlistTableRow(wishlist)).join("");
            wishlistContainer.innerHTML = updatedWishList;

            // accessing the remove wishlist button after dom is loaded
            for(const data of wishListData){
                const removeWishlistBtn = document.getElementById(`removeWishListProduct-${data.id}`);
                    removeWishlistBtn.addEventListener("click",()=>{
                        try {
                            DeleteWishlistByID(data.id);
                            alert("Product removed from wishlist");
                        } catch (error) {
                            console.error("error while removing the wishlist",error);
                            alert("Error while removing the wishlist");
                        }
                })

                const addWishlistToCartBtn = document.getElementById(`addWishlistToCart-${data.id}`);
                addWishlistToCartBtn.addEventListener("click",()=>{
                    try {
                        addCartProduct(data);
                    }catch(error){
                        console.error("error while adding the wishlist product to cart",error);
                        alert("Error while adding the wishlist product to cart");
                    }
                })



            }
        } else{
            wishlistContainer.innerHTML =`
                <tr>
                    <td class="px-4 lg:px-6 py-4 lg:py-6 ">
                        <p class="text-gray-500 capitalize text-base leading-[150%]">No wishlist found</p>
                    </td>
                </tr>
                `;
        }
    } catch (error) {
        console.log("error while updating the wishlist",error);
        return error;
    }
}

function wishlistTableRow (wishlist){
    const discountedPrice = wishlist.baseprice - (wishlist.baseprice * (wishlist.discount.replace("%","")/100)).toFixed(2);
    let productAvailable ;
        let stockStatus; 
        let stockColor;
    if(wishlist.stock &&  wishlist.stock>0){
        stockStatus = "In Stock" ;
        stockColor =  "bg-green-100 text-(--success-dark)"  
        productAvailable = true;
    } else{
        stockStatus = "Out of Stock" ;
        stockColor = "bg-red-100 text-red-800";
        productAvailable = false;
    }

    return `
        <tr class="border-b border-gray-200 hover:bg-gray-50 transition">
            <td class="px-4 lg:px-6 py-4 lg:py-6">
                <div class="flex items-center gap-4">
                    <img src="${wishlist.imgURL[0]}" alt="${wishlist.name}" class="size-[100px] aspect-square object-cover bg-gray-50 rounded-lg p-2">
                    <span class="text-gray-800 font-medium">${wishlist.name}</span>
                </div>
            </td>
            <td class="px-4 lg:px-6 py-4 lg:py-6">
                <span class="text-gray-800 font-semibold">$${discountedPrice}</span>
                <span class="text-gray-400 line-through ml-2">$${wishlist.baseprice}</span>
            </td>
            <td class="px-4 lg:px-6 py-4 lg:py-6">
                <span class="inline-block px-3 py-1 text-xs font-medium rounded ${stockColor}">${stockStatus}</span>
            </td>
            <td class="px-4 lg:px-6 py-4 lg:py-6">
                <div class="flex items-center  justify-between gap-3">
                    <button id="addWishlistToCart-${wishlist.id}" class="px-3 lg:px-6 py-2 text-white text-xs whitespace-nowrap lg:text-sm font-medium rounded-full  hover:shadow-lg transition transform hover:-translate-y-0.5 ${productAvailable ? "cursor-pointer bg-(--light-green) hover:bg-green-700" : "cursor-not-allowed bg-gray-400"}">
                        Add to Cart
                    </button>
                    <button id="removeWishListProduct-${wishlist.id}" class="text-gray-400 hover:text-red-500 transition size-6 flex justify-center items-center cursor-pointer border-2 border-gray-200 rounded-full">
                        <i class="fas fa-times text-sm"></i>
                    </button>
                </div>
            </td>
        </tr>    
    `;
}


