import footerComp from "./components/common/footer.js";
import navbar from "./components/common/topnavbar.js";
import { FeaturedProducts } from "./components/featuredproducts.js";
import featured from "./components/heropage/featuredcomp.js";
import { HotDealsSection } from "./components/hotdeals.js";
import PopularCategory from "./components/popularCategory.js";
import PopularProducts from "./components/popularProducts.js";

window.addEventListener("DOMContentLoaded", async () => {
  navbar();
  featured();
  PopularCategory();
  PopularProducts();
  HotDealsSection();
  FeaturedProducts();
  footerComp();
});
