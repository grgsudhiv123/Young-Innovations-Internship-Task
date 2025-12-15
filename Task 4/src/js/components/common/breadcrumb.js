export const renderBreadCrumb = (mainpath, product = null, category = null) => {
    const breadCrumb = document.getElementById('breadcrumb');

    const breadcrumbLinks = generateBreadcrumbLinks(
        mainpath,
        product,
        category,
    );

    breadCrumb.innerHTML = `
        <div class="relative h-20 sm:h-40 md:h-[120px] overflow-hidden">
            <img src="../src/assets/images/breadcrumb/breadcrumbimg.jpg" 
                 class="w-full h-full object-cover rotate-180 scale-150 md:scale-100 object-[-50px_0px] md:object-center"/>
            <div class="absolute section-layout-width -translate-x-[50%] left-[50%] top-[50%] -translate-y-[50%]"> 
                <div id="breadcrumbLink" class="flex items-center gap-2 text-white text-sm flex-wrap">
                    ${breadcrumbLinks}
                </div>
            </div>
        </div>
    `;
};

function generateBreadcrumbLinks(mainpath, product, category) {
    let links = [];

    links.push(`
        <a href="/" class="hover:text-green-400 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
                </path>
            </svg>
        </a>
    `);

    if (product && category) {
        links.push(
            `<span class="opacity-60"><i class="fa-solid fa-chevron-right"></i></span>`,
        );

        links.push(`
            <a href="${getLinkByPath('All Products')}" class="hover:text-green-400 transition-colors opacity-80">
                All Products
            </a>
        `);

        links.push(
            `<span class="opacity-60"><i class="fa-solid fa-chevron-right"></i></span>`,
        );

        links.push(`
            <a href="/" class="hover:text-green-400 transition-colors opacity-80">
                ${category}
            </a>
        `);

        links.push(
            `<span class="opacity-60"><i class="fa-solid fa-chevron-right"></i></span>`,
        );

        links.push(`<span class="text-green-400">${product}</span>`);
    } else {
        links.push(
            `<span class="opacity-60"><i class="fa-solid fa-chevron-right"></i></span>`,
        );

        links.push(
            `<a href="${getLinkByPath(mainpath)}" class="text-green-400">${mainpath}</a>`,
        );
    }

    return links.join('');
}

function getLinkByPath(path) {
    const routes = {
        'Shopping Cart': '/public/shoppingcart.html',
        Wishlist: '/public/wishlistpage.html',
        'All Products': '/public/allproducts.html',
        Checkout: '/public/checkout.html',
        About: '/public/about.html',
        Contact: '/public/contact.html',
    };

    return routes[path] || '#';
}
