import { box, bus, headphone, shoppingBag } from "./icons.js";
export const BASE_URL = "http://localhost:8000";

export const navbarConstants = [
  {
    header: "Home",
    contents: [
      { item: "Overview", link: "/overview" },
      { item: "Featured", link: "/featured" },
      { item: "New Arrivals", link: "/new-arrivals" },
      { item: "Popular Categories", link: "/popular-categories" },
    ],
  },
  {
    header: "Shop",
    contents: [
      {
        item: "Men",
        link: "/shop/men",
      },
      {
        item: "Women",
        link: "/shop/women",
      },
      {
        item: "Electronics",
        link: "/shop/electronics",
      },
      {
        item: "Accessories",
        link: "/shop/accessories",
      },
      {
        item: "Sale",
        link: "/shop/sale",
      },
    ],
  },
  {
    header: "Pages",
    contents: [
      { item: "About Us", link: "/about-us" },
      { item: "FAQs", link: "/faqs" },
      { item: "Pricing", link: "/pricing" },
      { item: "Services", link: "/services" },
      { item: "Portfolio", link: "/portfolio" },
      { item: "Terms & Conditions", link: "/terms" },
      { item: "Privacy Policy", link: "/privacy" },
    ],
  },
  {
    header: "Blog",
    contents: [
      { item: "Latest Posts", link: "/blog/latest" },
      { item: "Popular Posts", link: "/blog/popular" },
      { item: "Tutorials", link: "/blog/tutorials" },
      { item: "Tips & Guides", link: "/blog/guides" },
      { item: "News & Updates", link: "/blog/news" },
    ],
  },
  {
    header: "About Us",
    link: "/about-us",
  },
  {
    header: "Contact Us",
    link: "/contact-us",
  },
];

// featured conastants

export const featuredConstants = [
  {
    header: "Free shipping",
    desc: "Free shipping on all your order",
    icon: bus,
  },
  {
    header: "Customer Support 24/7",
    desc: "Instant access to Support",
    icon: headphone,
  },
  {
    header: "100% Secure Payment",
    desc: "We ensure your money is save",
    icon: shoppingBag,
  },
  {
    header: "Money-Back Guarantee",
    desc: "30 Days Money-Back Guarantee",
    icon: box,
  },
];

// footer constants

export const footerConstant = [
  {
    header: "My Account",
    contents: [
      {
        item1: "My Account",
        link: "/myaccount",
      },
      {
        item1: "Order History",
        link: "/orderhistory",
      },
      {
        item1: "Shopping Cart",
        link: "/shoppingcart",
      },
      {
        item1: "Wishlist",
        link: "/wishlist",
      },
    ],
  },
  {
    header: "Helps",
    contents: [
      {
        item1: "Contact",
        link: "/contact",
      },
      {
        item1: "Faqs",
        link: "/faqs",
      },
      {
        item1: "Terms & Condition",
        link: "/terms&condition",
      },
      {
        item1: "Privacy Policy",
        link: "/privacypolicy",
      },
    ],
  },
  {
    header: "Proxy",
    contents: [
      {
        item1: "About",
        link: "/about",
      },
      {
        item1: "Shop",
        link: "/shop",
      },
      {
        item1: "Product",
        link: "/product",
      },
      {
        item1: "Track Order",
        link: "/trackorder",
      },
    ],
  },
  {
    header: "Categories",
    contents: [
      {
        item1: "Fruits & Vegetables",
        link: "/fruits&vegetables",
      },
      {
        item1: "Meat & Fish",
        link: "/meat&fish",
      },
      {
        item1: "Bread & Bakery",
        link: "/bread&bakery",
      },
      {
        item1: "Beauty & Health",
        link: "/beauty&health",
      },
    ],
  },
];
