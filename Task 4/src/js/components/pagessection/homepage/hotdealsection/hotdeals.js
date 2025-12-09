import { Countdown } from '../../../../utils/countdown.js';
import { FetchAllProducts } from '../../../../utils/fetchApi.js';
import { ProductBtns } from '../../../common/productscard/productCardFeatures.js';
import ProductCard from '../../../common/productscard/prooductCardcomponent.js';
import { buttonFeatures } from './hotdealBtnFeatures.js';
import { hottestdealProductCard } from './mainProductCard.js';

export async function HotDealsSection() {
    const HotDealscardContainer = document.getElementById('hotdeals-container');
    async function hotdealData() {
        try {
            const productdata = await FetchAllProducts('products', '');
            let filteredData = productdata.filter(
                (product) => product.discount.replace('%', '') > 5,
            );

            const hotestDeal = filteredData.reduce((max, obj) =>
                Number(obj.discount.replace('%', '')) >
                Number(max.discount.replace('%', ''))
                    ? obj
                    : max,
            );
            const remainingData = filteredData.filter(
                (product) => product.id !== hotestDeal.id,
            );
            return { hotestDeal, remainingData };
        } catch (error) {
            console.log('Error while fetching products data.');
        }
    }
    const { hotestDeal, remainingData } = await hotdealData();

    const hotdealproductcard = document.getElementById('hotdealproduct');
    if (hotdealproductcard) {
        hotdealproductcard.innerHTML = hottestdealProductCard(hotestDeal);
        await buttonFeatures(hotestDeal);
    }

    if (hotdealproductcard) {
        hotdealproductcard.addEventListener('click', () => {
            window.location.href = `productsdetail.html?id=${hotestDeal.id}`;
        });
    }

    // ProductCard returns a string of HTML code, so we need to create a temporary div to hold it
    await remainingData.forEach((product) => {
        const tempDev = document.createElement('div');
        const productCardString = ProductCard(product, 'hotdeals');
        tempDev.innerHTML = productCardString;
        HotDealscardContainer.appendChild(tempDev.firstElementChild);
    });

    await ProductBtns(remainingData, 'hotdeals');
    const hotdealCountdownContainer = document.getElementById(
        'hottestDeal-countdown',
    );
    Countdown(hotdealCountdownContainer);
}
