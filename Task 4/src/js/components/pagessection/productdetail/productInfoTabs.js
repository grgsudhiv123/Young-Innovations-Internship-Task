import { FetchApi, FetchApiById } from "../../../utils/fetchApi.js";

export function getProductInfoTabs(productData,exp) {
    const tab1comp = document.getElementById("product-info-tab1");
    const tab2comp = document.getElementById("product-info-tab2");
    const tab3comp = document.getElementById("product-info-tab3");


    // on each tab change resets the tab contents 
    tab1comp.style.display = "none";
    tab2comp.style.display = "none";
    tab3comp.style.display = "none";

    // tab button styling
    [1,2,3].forEach((tab) => {
        const tabBtn = document.getElementById(`tab-btn-${tab}`);
        tabBtn.classList.remove("border-b-2","border-b-(--light-green)","text-gray-600");
    });

    // and reset the new tab button styling
    const tabBtn = document.getElementById(`tab-btn-${exp}`);
    tabBtn.classList.add("border-b-2" ,"border-b-(--light-green)","text-gray-600");



    function Tab1(Description){
        tab1comp.style.display = "block";
        const productDescription = document.getElementById("tab1-desc");
        productDescription.innerText = Description;
        tab1comp.style.display = "flex";
    }

    async function Tab2(AddInfo){
        const productAddInfo = document.getElementById("tab2-info");
        const categoryName =  await FetchApiById("categories",AddInfo.category).then(res=>res.name);
        const TagsResponse = await FetchApi("tags","");
        const tagsNames = await AddInfo.tags.map((tag)=>{
            const tagName = TagsResponse.find((tagData)=>tagData.id==tag).name;
            return tagName;
        });

        productAddInfo.innerHTML = `
            <ul class="w-full space-y-3 text-sm font-normal leading-[150%] capitalize">
                <li class="flex max-w-[70%] w-full justify-between"><span>Wt : </span><span class="text-gray-600">${AddInfo.wt}</span></li>
                <li class="flex max-w-[70%] w-full justify-between"><span>SKU : </span><span class="text-gray-600">${AddInfo.SKU}</span></li>
                <li class="flex max-w-[70%] w-full justify-between"><span>Category : </span><span class="text-gray-600">${categoryName}</span></li>
                <li class="flex max-w-[70%] w-full justify-between"><span>Brand : </span><span class="text-gray-600">${AddInfo.brand}</span></li>
                <li class="flex max-w-[70%] w-full justify-between"><span>Availability : </span><span class="text-gray-600">${AddInfo.stock ? "Available" : "Out of stock"} (${AddInfo.stock})</span></li>
                <li class="flex max-w-[70%] w-full justify-between"><span>Shipping : </span><span class="text-gray-600">${AddInfo.color}</span></li>
                <li class="flex max-w-[70%] w-full justify-between"><span>Tags : </span><span class="text-gray-600">${tagsNames && tagsNames.map(tags => `<span>${tags}</span>`).join(", ")}</span> </li>
            </ul>
        `;
        tab2comp.style.display = "flex";
    }

    function Tab3(CustomerReviews){
        const reviewContainer = document.getElementById("tab3-reviews");
        reviewContainer.innerHTML = CustomerReviews.map((review,index)=>`
            <div class="w-full space-y-3">
                <div class="w-full flex flex-row gap-3 justify-between items-center">
                    <div class="w-fit flex flex-row gap-3">
                        <div class="size-[41px] aspect-square overflow-hidden rounded-full">
                            <img src=${review.profileURL} alt="${review.customer_name} img: ${review.profileURL}" class="w-full h-full object-cover object-center"/>
                        </div>
                        <div>
                            <p class="font-medium text-sm leading-[150%]">${review.customer_name}</p>
                            <div class="flex flex-row">
                            ${
                            review.rating
                                ? `<i class="fa-solid fa-star text-[8px] md:text-xs text-(--warning-color) hover:scale-105"></i>`.repeat(
                                    Math.floor(review.rating)
                                ) +
                                `<i class="fa-solid fa-star text-[8px] md:text-xs text-gray-200"></i>`.repeat(
                                    Math.floor(5 - review.rating)
                                )
                                : ` `
                            }
                            </div>
                        </div>
                    </div>
                    <p class="font-normal text-sm leading-[150%] text-gray-400">${review.dateandtime}</p>
                </div>
                <p class="font-normal text-sm leading-[150%] text-gray-500">${review.comment}</p>
            </div>
            ${index != CustomerReviews.length-1 ? `<span class="w-full h-px bg-gray-100 my-5"></span>` : ""}
        `).join("");
        tab3comp.style.display = "flex";
    }

    // switch case
    switch (exp) {
        case 1:
            Tab1(productData.desc);
            break;
        
         case 2:
            Tab2(productData);
            break;

         case 3:
            Tab3(productData.reviews);
            break;

        default:
            break;
    }
}