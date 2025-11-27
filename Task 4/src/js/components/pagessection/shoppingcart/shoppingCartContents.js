import { productCartFeatures } from "../../../features/cartFeatures.js";
import { FetchCartProducts } from "../../../utils/fetchApi.js"

function calculateDiscountedPrice (baseprice, discount){
    const discountedPrice = baseprice - (baseprice*(discount.replace("%","")/100));
    return discountedPrice.toFixed(2);
}


function calculateSubTotal(product, quantity) {
    const subtotal  = calculateDiscountedPrice(product.baseprice, product.discount) * quantity;
    return subtotal.toFixed(2);
}

export const shoppingCartContents = async () => {
    try {
        let cartProducts = []
        cartProducts = await FetchCartProducts();
        const shoppingCartContainer = document.getElementById("shoppingCartTabel");
        const {deleteCartProduct} = productCartFeatures();
        if(cartProducts){
            const shoppingCartRow = cartProducts ? cartProducts.map(row=>shoppingCartTableRow(row)).join("") : `
            <tr>
                <td colspan="4" class="text-center py-12 text-red-500">
                    <i class="fas fa-exclamation-circle text-4xl mb-4"></i>
                    <p>Failed to load cart. Please refresh the page.</p>
                </td>
            </tr>
            `;

            shoppingCartContainer.innerHTML = shoppingCartRow;

            for(const product of cartProducts){
                let updatedQuantity = product.quantity;
                let updatedSubTotal = calculateSubTotal(product, updatedQuantity);
                
                // get elements
                const deductBtn = document.getElementById(`deductProductFromCart-${product.id}`);
                const addBtn = document.getElementById(`addProductToCart-${product.id}`);
                const removeBtn = document.getElementById(`removeWishListProduct-${product.id}`);
                const quantityEl = document.getElementById(`quantity-${product.id}`);
                const subTotalEl = document.getElementById(`subtotal-${product.id}`);

                // check if elements exist
                if(!deductBtn || !addBtn || !quantityEl || !subTotalEl){
                    console.error(`Missing elements for product ${product.id}`);
                    return;
                }

                // initialize quantity
                quantityEl.innerText = updatedQuantity;
                subTotalEl.innerText = updatedSubTotal;
                
                // update quantity and subtotal
                function updateProductQuantity(newQuantity){
                    quantityEl.innerText = newQuantity;
                    const newSubtotal = calculateSubTotal(product, newQuantity);;
                    subTotalEl.innerText = newSubtotal;
                }

                deductBtn.addEventListener("click", ()=>{
                    if(updatedQuantity > 1){
                        updatedQuantity--;
                        updateProductQuantity(updatedQuantity);
                    }
                });

                addBtn.addEventListener("click", ()=>{
                    updatedQuantity++;
                    updateProductQuantity(updatedQuantity);
                });

                removeBtn.addEventListener("click", async ()=>{
                    await deleteCartProduct(product.id);
                    await shoppingCartContents();
                })
            }
        }
    } catch (error) {
        console.log("error in fetching cart product", error);
        return error;
    }
}

function shoppingCartTableRow (cartProduct){
    const discountedPrice = calculateDiscountedPrice(cartProduct.baseprice, cartProduct.discount);
    return `
        <tr class="border-b border-gray-200 hover:bg-gray-50 transition">
            <td class="px-2 lg:px-4 xl:px-6 py-2 lg:py-4 xl:py-6">
                <div class="flex items-center gap-4">
                    <img src="${cartProduct.imgURL[0]}" alt="${cartProduct.name}" class="size-[100px] aspect-square object-cover bg-gray-50 rounded-lg p-2">
                    <span class="font-normal text-base leading-[150%]">${cartProduct.name}</span>
                </div>
            </td>
            <td class="px-2 lg:px-4 xl:px-6 py-2 lg:py-4 xl:py-6">
                <span class="text-gray-800 font-normal text-base leading-[150%]">$${discountedPrice}</span>
            </td>
            <td class="px-2 lg:px-4 xl:px-6 py-2 lg:py-4 xl:py-6">
                <div class="p-2 rounded-full border border-gray-200 flex flex-row gap-3 items-center w-fit">
                    <button id="deductProductFromCart-${cartProduct.id}" class="shoppingcart-quantitybtn group">
                        <i class="fa-solid fa-minus text-gray-600 group-hover:text-gray-50"></i>
                    </button>
                    <span id="quantity-${cartProduct.id}" class="text-base font-normal leading-[150%]"></span>
                    <button id="addProductToCart-${cartProduct.id}" class="shoppingcart-quantitybtn group">
                        <i class="fa-solid fa-plus group-hover:text-gray-200"></i>
                    </button>
                </div>
            </td>
            <td class="px-2 lg:px-4 xl:px-6 py-2 lg:py-4 xl:py-6">
                <div class="flex items-center  justify-between gap-3">
                    <span  class="ml-2 font-medium text-base leading-[150%]">$<span id="subtotal-${cartProduct.id}"></span></span>
                    <button id="removeWishListProduct-${cartProduct.id}" class="text-gray-400 hover:text-red-500 transition size-6 flex justify-center items-center cursor-pointer border-2 border-gray-200 rounded-full">
                        <i class="fas fa-times text-sm"></i>
                    </button>
                </div>
            </td>
        </tr>   
    `
}