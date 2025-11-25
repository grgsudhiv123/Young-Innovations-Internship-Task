import { DeleteCartProduct, FetchCartProducts } from "../../../utils/fetchApi.js";
import { PreventScroll } from "../../../utils/preventScroll.js";

const ProductCartSidebar = async (cartProducts) => {
    const cartContainer = document.getElementById("cartProduct-container");
      cartContainer.innerHTML = cartProducts.length !== 0 
      ?
      cartProducts.map((product)=>`
        <div class="flex gap-2 items-center">
            <div class="aspect-120/100 max-w-[120px] w-full overflow-hidden">
                <img src="${product.imgURL[0]}" alt="Image for product ${product.name} with product id : ${product.id}"  class="w-full h-full object-cover object-center"/>
            </div>
            <div class="flex flex-col gap-[2px] max-w-[190px] w-full">
                <p class="font-normal text-sm leadinhg-[150%]">${product.name}</p>
                <span>
                    <span class="text-sm font-normal leading-[150%]">${product.quantity}kg x</span>
                    <span class="text-sm font-semibold leading-[120%]">
                    ${
                        product.discount ? `
                        <span class="line-through text-gray-600">${product.baseprice}</span>
                        <span class="">${product.baseprice -( product.discount.replace("%","")*product.baseprice/100).toFixed(2 )}</span>
                        ` : `
                        <span class="">${product.baseprice}</span>
                        `
                    }
                    </span>
                </span> 
            </div>
            <button id="sidebar-cartproduct-btn-${product.id}" class="size-6 border border-gray-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-in-out">
                <i class="fa-solid fa-x text-[8px] text-gray-600"></i>
            </button>
        </div>
        ${
        product.id === cartProducts[cartProducts.length-1].id ? "" : `
        <span class="h-0.5 bg-gray-100 w-full"></span>
        `
      }
      `).join("") 
      : 
      `<span class="text-base text-gray-400 leading-[150%]">Cart is empty</span>`;
        console.log("cartProducts : ",cartProducts);
}





export const productCart = async () => {
    try {
        const cartProducts =  await FetchCartProducts();
        // loading the product cart
        await ProductCartSidebar(cartProducts);
        const quantity = cartProducts.reduce((acc,curr)=>acc+Number(curr.quantity),0);

        const navCartCount = document.getElementById("nav-cart-count");
        navCartCount.innerText = quantity;

        const cartCount = document.getElementById("cartProductCount");
        cartCount.innerText = quantity;

        const sidebarCartCount = document.getElementById("sidebarCartCount");
        sidebarCartCount.innerText = cartProducts.length;

        const totalPrice = cartProducts.reduce((acc,curr)=>acc+(priceAfterDiscount(curr)),0);   
        const cartPrice = document.getElementById("cartProductTotal");
        cartPrice.innerText = `$${totalPrice.toFixed(2)}`;  

        await cartProducts.map((element) => {
        const removeCartProductBtn = document.getElementById(`sidebar-cartproduct-btn-${element.id}`);
        removeCartProductBtn.addEventListener("click", async ()=>{
            console.log("removed Cart Product :",element.name );
            await DeleteCartProduct(element.id);
            localStorage.setItem("productAdded","false");
            });
        });

    } catch (error) {
        console.log(error);
        return error;
    }
}


 function priceAfterDiscount(curr){
    const quantity = Number(curr.quantity);
    const price = Number(curr.baseprice.replace("$",""));
    const discount = Number(curr.discount.replace("%",""));
    const discountPrice = price - (price * (discount/100));
    return discountPrice * quantity;
}



export const HandleSidebarCart = async () =>{
    try {
        const cartBackdrop = document.getElementById("cartsidebar-backdrop");
        const cartContainer = document.getElementById("cartsidebar-container");

        const {allowScroll, preventScroll} = PreventScroll();

        const sidebarCartBtn = document.getElementById("open-sidebar-cart");
        sidebarCartBtn.addEventListener("click",()=>{
            console.log("sidebarCartBtn");
            cartBackdrop.classList.add("active");
            cartContainer.classList.add("active");
            preventScroll();
        })
        console.log("sidebarCartBtn : ",sidebarCartBtn);

        const closeCartBtn = document.getElementById("close-sidebar-cart");
        closeCartBtn.addEventListener("click",()=>{
            cartBackdrop.classList.remove("active");
            cartContainer.classList.remove("active");
            allowScroll();
        })
    } catch (error) {
        console.log("Error :",error);
        return error;
    }
}


