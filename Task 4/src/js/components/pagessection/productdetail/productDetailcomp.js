import { BASE_URL } from "../../../utils/constants.js";
import { getProductInfoTabs } from "./productInfoTabs.js";

export const productDetailComp = async (productDetail) => {
    // slider img
    const productSlideImgContainer = document.getElementById("product-slideimg-container");
    productDetail.imgURL.forEach(img => {
        const slideImgDiv = document.createElement("div");
        slideImgDiv.id = `sliderImg-${productDetail.id}-${img}`
        slideImgDiv.classList.add('product-img-div');
        const slideImg = document.createElement("img");
        slideImg.classList.add("img-styling");
        slideImg.src = img;
        slideImg.alt = productDetail.name + img ;
        slideImgDiv.appendChild(slideImg);
        productSlideImgContainer.appendChild(slideImgDiv);
    });





     // hero img
    const productMainImgContainer = document.getElementById("product-mainimg-container");
    const productMainImg = document.createElement("img");
    console.log("productMainImgContainer :",productMainImgContainer);
    productMainImg.classList.add("img-styling");
    productMainImg.src = productDetail.imgURL[0];
    productMainImg.alt = productDetail.name + productDetail.imgURL[0];
    productMainImgContainer.appendChild(productMainImg);
    
    
    // handle slider img btn 
    const slidePrevBtn = document.getElementById("sliderimg-btn-prev");
    const slideNextBtn = document.getElementById("sliderimg-btn-next");
    var imgCount = 0;
    slidePrevBtn.addEventListener("click", () => {
        if(imgCount>0){
            imgCount = imgCount - 1;
            console.log("imgCount :" ,imgCount );
        }
        productMainImg.src = productDetail.imgURL[imgCount];
        productMainImg.alt = productDetail.name + productDetail.imgURL[imgCount];
    });
    slideNextBtn.addEventListener("click", () => {
        if(imgCount < productDetail.imgURL.length-1){
            imgCount = imgCount + 1;
            console.log("imgCount :" ,imgCount );
        }
        productMainImg.src = productDetail.imgURL[imgCount];
        productMainImg.alt = productDetail.name + productDetail.imgURL[imgCount];
    });


    // product detail
    const productName = document.getElementById("productname");
    productName.innerText = productDetail.name;


    const productStock = document.getElementById("product-stock");
    if(productDetail.stock == 0){
        productStock.innerText = "Out Of Stock";
        productStock.classList.add("product-outofstock");
    }else{
        productStock.innerText = "In Stock";
        productStock.classList.add("product-instock");
    }



    const productRating = document.getElementById("product-rating");
    productRating.innerHTML = `
                    ${
                      productDetail.rating
                        ? `<i class="fa-solid fa-star text-[8px] md:text-xs text-(--warning-color) hover:scale-105"></i>`.repeat(
                            Math.floor(productDetail.rating)
                          ) +
                          `<i class="fa-solid fa-star text-[8px] md:text-xs text-gray-200"></i>`.repeat(
                            Math.floor(5 - productDetail.rating)
                          )
                        : ` `
                    }
                `;


    const productSKU = document.getElementById("product-sku");
    productSKU.innerText = productDetail.SKU;


    const productDiscount = document.getElementById("product-discount");
    productDiscount.innerHTML = `
                    ${
                      productDetail.discount
                        ?`<span class="line-through text-gray-400">$${parseFloat(productDetail.baseprice)}</span> 
                        <span class="text-(--success-dark)">$${parseFloat(productDetail.baseprice - (productDetail.baseprice * productDetail.discount.replace("%", "")) / 100).toFixed(2)}</span> `
                        :`<span>$${parseFloat(productDetail.baseprice)}</span> `
                    }`;


    const brandName = document.getElementById("product-brand");
    brandName.innerText = productDetail.brand;
    const brandImgDiv = document.getElementById("product-brandImg");
    const brandImg = document.createElement("img");
    brandImg.classList.add("img-styling");
    brandImg.src = productDetail.brandLogo;
    brandImg.alt = productDetail.brand + productDetail.brandLogo;
    brandImgDiv.appendChild(brandImg);



    const socialLinks = document.getElementById("socialLink-container");  
    function handleSocialLinks(platform) {
        const icons = {
            facebook: "fa-facebook-f",
            instagram: "fa-instagram",
            twitter: "fa-twitter",
            pinterest: "fa-pinterest-p"
        };

        const iconClass = icons[platform] || "fa-link";
        return `<i class="fa-brands ${iconClass} footer-a-link-icon"></i>`;
    }          
    socialLinks.innerHTML = `
                    ${
                        productDetail.socialLinks.map((link)=>`
                        <a href=${link.link} target="_blank" class="footer-a-link group">
                        ${handleSocialLinks(`${link.name}`)}
                        </a>
                        `).join("")
                      }`; 



    const productDescription = document.getElementById("product-desc");
    productDescription.innerText = productDetail.desc;


     const getCategory = async(id) =>{
        const response = await fetch(`${BASE_URL}/categories/${id}`);
        const categoriesdata = await response.json();
        return categoriesdata.name;
    }
    const categoryName = await getCategory(productDetail.category);
    const productCategory = document.getElementById("product-category");
    productCategory.innerText = categoryName;






    const getTags = async() =>{
        const response = await fetch(`${BASE_URL}/tags`);
        const tagsdata = await response.json();
        return tagsdata;
    }

    const tagDatas = await getTags(); 
    const tagNames = productDetail.tags.map((tags)=>tagDatas.find(data=> data.id === tags).name);

    const productTags = document.getElementById("product-tags");
    productTags.innerHTML = `
        ${
          tagNames.map((tag)=> `<span>${tag}</span>`).join(", ")
        }`;



    // product info tabs
    // default
    getProductInfoTabs(productDetail, 1); 

    [1, 2, 3].forEach(el => {
        document.getElementById(`tab-btn-${el}`).addEventListener("click", () => {
            getProductInfoTabs(productDetail, el);
        });
    });

}