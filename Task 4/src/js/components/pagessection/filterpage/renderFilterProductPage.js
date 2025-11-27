import { FetchApi } from "../../../utils/fetchApi.js";
import ProductCard from "../../common/productCard.js";

export const renderfilterProductsPage = async () => {
    try {

        // for categories filter
        const categoryData = await FetchApi("categories","");
        const categoryContainer = document.getElementById("filterCategoryContainer");
        if(categoryData.length > 0){
            const categoryList = categoryData.map((category=>CategoryList(category))).join("");
            if(categoryList){
                categoryContainer.innerHTML = categoryList;
            }
            // update category quantity
            updateCategoryQuantity(categoryData);
        }


        // for price range filter
        updatePriceRange();

        // for rating filter
        const ratingContainer = document.getElementById("filterRatingContainer");
        if(ratingContainer){
            const ratingList = Array.from({length:5},(_,index) => ratingStars(index+1)).reverse().join("");
            ratingContainer.innerHTML = ratingList;
        }


        // for tags filter
        const tagsData = await FetchApi("tags","");
        const tagsContainer = document.getElementById("filterTagsContainer");
        if(tagsData.length > 0){
            const tagsList = tagsData.map((tags)=>filterTagChips(tags)).join("");
            if(tagsList){
                tagsContainer.innerHTML = tagsList;
            }
        }


        renderProductCards("");
    } catch (error) {
        console.log("Error while rendering data : ",error);
    }
}



// render product cards 
const renderProductCards = async (filter) => {
    try {
        const productData = await FetchApi("products",filter);
        const productContainer = document.getElementById("filteredProductContainer");
        if(productData.length > 0){
            const productList = productData.map((product)=>ProductCard(product)).join("");
            productContainer.innerHTML = productList;
        }

    } catch(error){
        console.log("Error while fetching the data : ",error);
        return error;
    }
}








function CategoryList(category){
    return `
        <li class="flex items-center gap-2 py-2.5">
            <input type="checkbox" id="${category.name}-${category.id}" class="w-4 h-4 accent-green-800 cursor-pointer">
            <label for="${category.name}-${category.id}" class="text-sm font-medium leading-[150%]">
                <span id="category-name-${category.id}" class="capitalize">${category.name}</span>
                <span class="text-gray-500">(<span id="category-quantity-${category.id}"></span>)</span>
            </label>
        </li>
    `;
}




const updateCategoryQuantity = async (categoryData) => {
    if(categoryData.length > 0){
        const quantityPromises =  await Promise.all(
            categoryData.map(async category=>{
            try {
                const categoryData = await FetchApi("products",`category=${category.id}`);
                return {quantity : categoryData.length, id : category.id};
            } catch (error) {
                console.log(`Error while fetching category data of id ${category.id} : `,error);
            }
        })
        )
        quantityPromises.forEach((quantity) => {
            const categoryQuantityEl = document.getElementById(`category-quantity-${quantity.id}`);
            if(categoryQuantityEl){
                categoryQuantityEl.textContent = quantity.quantity;
            }
        })
    }
}



// price range

function updatePriceRange(){
    const rangeInputs = document.querySelectorAll(".range-input input");
        console.log("rangeInputs : ",rangeInputs);
        const progress = document.getElementById("priceRangeProgressBar");
        const rangeGap = 50;
        let minRange = Number(rangeInputs[0].value);
        let maxRange = Number(rangeInputs[1].value);
        progress.style.left = ((minRange/rangeInputs[0].max)*100)+"%";
        progress.style.right = 100 - ((maxRange/rangeInputs[0].max)*100)+"%";

        const minPriceRange = document.getElementById("rangeForMinPrice");
        const maxPriceRange = document.getElementById("rangeForMaxPrice");
        minPriceRange.textContent = `$${minRange}`;
        maxPriceRange.textContent = `$${maxRange}`;


        rangeInputs.forEach((input) => {
            input.addEventListener("input", (e)=>{
                minRange = Number(rangeInputs[0].value);
                maxRange = Number(rangeInputs[1].value);

                if(maxRange - minRange < rangeGap){
                    if(input.classList.contains("range-min")){
                        minRange = maxRange - rangeGap;
                        rangeInputs[0].value = minRange;
                    } else{
                        maxRange = minRange + rangeGap;
                        rangeInputs[1].value = maxRange;
                    }
                }

                progress.style.left = ((minRange/rangeInputs[0].max)*100)+"%";
                progress.style.right = 100 - ((maxRange/rangeInputs[0].max)*100)+"%";

                minPriceRange.textContent = `$${minRange}`;
                maxPriceRange.textContent = `$${maxRange}`;
            })
        })
}

// rating
function ratingStars (rating) {
    function stars(ratingCount) {
        const star = ratingCount 
                    &&`<i class="fa-solid fa-star text-sm text-(--warning-color)"></i>`.repeat(Math.floor(ratingCount)) 
                    + `<i class="fa-solid fa-star text-sm text-gray-200"></i>`.repeat(5-Math.floor(ratingCount));
        return star;
    }
    return `
        <li class="flex items-center gap-2 py-2.5">
            <input type="checkbox" id="rating-${rating}" class="w-4 h-4 accent-green-800 cursor-pointer">
            <label for="rating-${rating}" class="text-sm font-medium leading-[150%]">
                <span id="rating-${rating.id}" class="">${stars(rating)}</span>
                <span class="text-gray-500">${Math.floor(rating)} ${Math.floor(rating) !== 5 ? "& up" : "" }</span>
            </label>
        </li>
    `
}



function filterTagChips(tagsData) {
    return `
    <button type="button" id="tagsBtn-${tagsData.id}" class="w-fit px-4 py-1.5 rounded-full bg-gray-50 hover:bg-gray-200 cursor-pointer transition-all duration-200 ease-in-out">
         <p class="text-sm font-normal leading-[150%] capitalize">${tagsData.name}</p>
    </button>
    `
}