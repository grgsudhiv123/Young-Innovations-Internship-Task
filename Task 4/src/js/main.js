'use strict';

import footerComp from "./components/common/footer.js";
import { footerTemplate } from "./components/common/layoutcommon/footerLayout.js";
import { headerTemplate } from "./components/common/layoutcommon/headerLayout.js";
import navbar from "./components/common/topnavbar.js";
import { CompanyLogo } from "./components/pagessection/homepage/companylogo.js";
import { FeaturedProducts } from "./components/pagessection/homepage/featuredproducts.js";
import { FollowUsSection } from "./components/pagessection/homepage/followussection.js";
import featured from "./components/pagessection/homepage/heropage/featuredcomp.js";
import { HotDealsSection } from "./components/pagessection/homepage/hotdeals.js";
import { LatestNewsSection } from "./components/pagessection/homepage/latestnewssection.js";
import PopularCategory from "./components/pagessection/homepage/popularCategory.js";
import PopularProducts from "./components/pagessection/homepage/popularProducts.js";
import { HandleSidebarCart, productCart } from "./components/pagessection/homepage/productCartSidebar.js";
import { TestimonialSection } from "./components/pagessection/homepage/testimonialsection.js";

window.addEventListener("DOMContentLoaded", async () => {
  document.getElementById('header').innerHTML = headerTemplate();  
  document.getElementById('footer').innerHTML = footerTemplate();
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
