import { handleWishList } from '../../../features/wishListFeatures.js';
import {
    AddProducts,
    FetchCartProducts,
    getAllWishListProduct,
    updateCartProducts,
} from '../../../utils/fetchApi.js';
import { HandleSidebarCart, productCart } from '../sidebar/sidebar.js';

export const productDetailButtons = async (productDetail) => {
    const cartProducts = await FetchCartProducts();
    const isProductInCart = cartProducts.find(
        (cartproduct) => cartproduct.id === productDetail.id,
    );

    let quantity = isProductInCart ? isProductInCart.quantity : 1;
    const deductQuantityBtn = document.getElementById('modelProductDeductbtn');
    const addQuantityBtn = document.getElementById('modelProductAddbtn');
    const productQuantity = document.getElementById('modelProductQuantity');

    productQuantity.innerText = quantity;

    deductQuantityBtn.addEventListener('click', () => {
        if (quantity > 1) {
            quantity = quantity - 1;
            productQuantity.innerText = quantity;
        }
    });

    addQuantityBtn.addEventListener('click', () => {
        if (quantity < productDetail.stock) {
            quantity = quantity + 1;
            productQuantity.innerText = quantity;
        }
    });

    const addToCartBtn = document.getElementById('modelAddtoCartBtn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', async () => {
            if (isProductInCart) {
                await updateCartProducts(
                    {
                        id: productDetail.id,
                        quantity: quantity,
                        updatedAt: new Date().toISOString(),
                    },
                    productDetail.id,
                );
            } else {
                await AddProducts({
                    ...productDetail,
                    quantity: quantity,
                    addedAt: new Date().toISOString(),
                });
            }

            alert('Product added to cart');
            // reload cart for fresh data
            HandleSidebarCart();
            productCart();
        });
    }

    // product wishlist btn
    const productWishlistBtn = document.getElementById('modelWishlistBtn');
    const productwishlistBtnIcon = document.getElementById('modelWishlistIcon');
    if (productWishlistBtn) {
        const wishlistData = await getAllWishListProduct();
        const isProductInCart = wishlistData.find(
            (wishlistproduct) => wishlistproduct.id === productDetail.id,
        );
        if (isProductInCart) {
            productwishlistBtnIcon.classList.remove('fa-regular');
            productwishlistBtnIcon.classList.add('fa-solid');
        } else {
            productwishlistBtnIcon.classList.remove('fa-solid');
            productwishlistBtnIcon.classList.add('fa-regular');
        }

        productWishlistBtn.addEventListener('click', async () => {
            handleWishList(productDetail);
            HandleSidebarCart();
            productCart();
        });
    }
};
