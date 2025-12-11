import { FetchApi, FetchApiById } from '../../../utils/fetchApi.js';
import { PreventScroll } from '../../../utils/preventScroll.js';
import { handleImage } from './handleImage.js';
import { productDetailButtons } from './productmodelBtn.js';
import { productModelComp } from './productmodelcomp.js';

export const ProductDetailModel = async (productData) => {
    try {
        await ProductModel(productData);

        // handle image
        handleImage(productData);

        // handle product model btns
        productDetailButtons(productData);
    } catch (error) {
        console.log(error);
        return error;
    }
};

export async function ProductModel(productData) {
    const getCategory = async (id) => {
        const categoriesdata = await FetchApiById('categories', id);
        return categoriesdata[0].name;
    };

    const categoryName = await getCategory(productData.category);

    const getTags = async () => {
        const tagsdata = await FetchApi('tags', '');
        return tagsdata;
    };

    const tagDatas = await getTags();
    const tagNames = productData.tags.map(
        (tags) =>
            tagDatas.find((data) => Number(data.id) === Number(tags)).name,
    );
    const modelContainer = document.getElementById('model-container');

    modelContainer.innerHTML = productModelComp(
        productData,
        tagNames,
        categoryName,
    );

    const modelCloseBtn = document.getElementById('model-close-btn');
    modelCloseBtn.focus();
    const modelBackdrop = document.getElementById('modelBackdrop');
    modelCloseBtn.addEventListener('click', () => {
        if (modelContainer && modelBackdrop) {
            modelContainer.classList.remove('active');
            modelBackdrop.classList.remove('active');
            PreventScroll.allowScroll();
        }
    });

    document.addEventListener('click', (e) => {
        if (
            modelBackdrop.contains(e.target) ||
            modelCloseBtn.contains(e.target)
        ) {
            modelContainer.classList.remove('active');
            modelBackdrop.classList.remove('active');
            PreventScroll.allowScroll();
        }
    });
}
