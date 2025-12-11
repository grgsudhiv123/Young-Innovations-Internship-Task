'use strict';

import { CompanyLogo } from './components/pagessection/homepage/companylogo.js';
import { FeaturedProducts } from './components/pagessection/homepage/featuredproducts.js';
import { FollowUsSection } from './components/pagessection/homepage/followussection.js';
import featured from './components/pagessection/homepage/heropage/featuredcomp.js';
import { HotDealsSection } from './components/pagessection/homepage/hotdealsection/hotdeals.js';
import { LatestNewsSection } from './components/pagessection/homepage/latestnewssection.js';
import PopularCategory from './components/pagessection/homepage/popularCategory.js';
import PopularProducts from './components/pagessection/homepage/popularProducts.js';

import { TestimonialSection } from './components/pagessection/homepage/testimonialsection.js';
import { CountdownFeat } from './utils/countdown.js';

window.addEventListener('DOMContentLoaded', async () => {
    featured();
    PopularCategory();
    PopularProducts();
    HotDealsSection();
    FeaturedProducts();
    LatestNewsSection();
    TestimonialSection();
    CompanyLogo();
    FollowUsSection();
    CountdownFeat();
});
