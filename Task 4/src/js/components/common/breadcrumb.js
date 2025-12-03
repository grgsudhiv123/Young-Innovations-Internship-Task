export const renderBreadCrumb = (mainpath) => {
    const breadCrumb = document.getElementById('breadcrumb');
    breadCrumb.innerHTML = `
        <div
            class="relative h-20 sm:h-40 md:h-[120px] overflow-hidden"
        >
            <img src="../src/assets/images/breadcrumb/breadcrumbimg.jpg" class="w-full h-full object-cover rotate-180 scale-150 md:scale-100 object-[-50px_0px] md:object-center "/>
            <div class="absolute section-layout-width -translate-x-[50%] left-[50%] top-[50%] -translate-y-[50%]"> 
            <div
                id="breadcrumbLink"
                class="flex items-center gap-2 text-white text-sm"
            >
                <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                </svg>
                <span class="opacity-60"><i class="fa-solid fa-chevron-right"></i></span>
                <a href="/public/shoppingcart.html" class="text-green-400">${mainpath}</a>
            </div>
            </div>
        </div>
    `;
};

function breadcrumbLinks() {}

function linkPerPage(path) {
    switch (path) {
        case 'Shopping Cart':
            return '/public/shoppingcart.html';
            break;
        case 'Wishlist':
            return '/public/wishlistpage.html';
            break;
        case 'All Products':
            return '/public/allproducts.html';
            break;
        default:
            break;
    }
}
