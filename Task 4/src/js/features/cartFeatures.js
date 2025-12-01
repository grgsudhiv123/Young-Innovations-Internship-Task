import { AddProducts, DeleteCartProduct, FetchCartProducts, updateCartProducts } from "../utils/fetchApi.js";

export const productCartFeatures = ()=>{
    let cartProduct = [];
    let repeatedCartProduct = false;
    
    const addCartProduct = async (product)=>{
        cartProduct = await FetchCartProducts();
        const repeatedProduct  = cartProduct.find(cartProduct=>cartProduct.id === product.id);
        if(!repeatedProduct){
          repeatedCartProduct = false;
          await AddProducts({
            ...product, 
            quantity : 1,
            addedAt:new Date().toISOString()
          });
          alert("Product added to cart");
        }else{
          repeatedCartProduct = false;
          await updateCartProducts({
            ...product,
            quantity : repeatedProduct.quantity+1,
            updatedAt:new Date().toISOString()
          },repeatedProduct.id);
          alert("Product added to cart");
        }
        window.location.reload();
      }

    const deductCartProduct = async (product)=>{
        cartProduct = await FetchCartProducts();
        const repeatedProduct  = await cartProduct.find(cartProduct=>cartProduct.id === product.id);
        if(repeatedProduct && repeatedProduct.quantity > 1){
            await updateCartProducts({
                ...product,
                quantity : repeatedProduct.quantity-1,
                updatedAt:new Date().toISOString()
              },repeatedProduct.id);
              alert("Product removed from cart");
        } else{
            await DeleteCartProduct(product.id);
            alert("Product removed from cart");
        }
    }

    const deleteCartProduct = async (id) => {
        try {
            await DeleteCartProduct(id);
        } catch (error) {
            console.error("error while removing the cart product",error);
            alert("Error while removing the cart product");
        }
    }


    
      return{
        addCartProduct,
        deductCartProduct,
        deleteCartProduct
      }
}


