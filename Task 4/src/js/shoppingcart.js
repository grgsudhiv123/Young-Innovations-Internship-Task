import footerComp from "./components/common/footer.js";
import { footerTemplate } from "./components/common/layoutcommon/footerLayout.js";
import { headerTemplate } from "./components/common/layoutcommon/headerLayout.js";
import { shoppingCartContents } from "./components/pagessection/shoppingcart/shoppingCartContents.js";

window.addEventListener("DOMContentLoaded", async () => {
    document.getElementById('header').innerHTML = headerTemplate();  
    document.getElementById('footer').innerHTML = footerTemplate();
    shoppingCartContents();
    footerComp();
});