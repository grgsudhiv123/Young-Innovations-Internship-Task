import footerComp from "./components/common/footer.js";
import { headerTemplate } from "./components/common/layoutcommon/headerLayout.js";
import navbar from "./components/common/topnavbar.js";
import { CompanyLogo } from "./components/companylogo.js";
import { FeaturedProducts } from "./components/featuredproducts.js";
import { FollowUsSection } from "./components/followussection.js";
import featured from "./components/heropage/featuredcomp.js";
import { HotDealsSection } from "./components/hotdeals.js";
import { LatestNewsSection } from "./components/latestnewssection.js";
import PopularCategory from "./components/popularCategory.js";
import PopularProducts from "./components/popularProducts.js";
import { HandleSidebarCart, productCart } from "./components/productCartSidebar.js";
import { TestimonialSection } from "./components/testimonialsection.js";

window.addEventListener("DOMContentLoaded", async () => {
  // document.getElementById('footer').innerHTML = loadFooter();
  document.getElementById('header').innerHTML = headerTemplate();
  
  navbar();
  HandleSidebarCart();
  productCart();
  featured();
  PopularCategory();
  PopularProducts();
  HotDealsSection();
  FeaturedProducts();
  LatestNewsSection();
  TestimonialSection();
  CompanyLogo();
  FollowUsSection();
  
  footerComp();
});
