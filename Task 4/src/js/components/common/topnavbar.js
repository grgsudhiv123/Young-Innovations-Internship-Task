import { FetchApi } from "../../utils/fetchApi.js";

async function navbar() {
  const navWishlistBtn = document.getElementById("navWishlistBtn");
  const wishlistBtnIcon = document.getElementById("navWishlistBtnIcon");

  const navWishlistCount = document.getElementById("navWishlistCount");
  if(wishlistBtnIcon){
    const wishlistData = await FetchApi("wishlist", "");
    if(wishlistData.length > 0){
      wishlistBtnIcon.classList.remove("fa-regular");
      wishlistBtnIcon.classList.add("fa-solid");
      navWishlistCount.innerText = wishlistData.length;
    }
  }
  if(navWishlistBtn){
    navWishlistBtn.addEventListener("click",()=>{
      window.location.href = "/public/wishlistpage.html";
    })
  }
}

export default navbar;
