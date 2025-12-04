import { debounce } from '../../utils/debounce.js';
import { FetchAllProducts } from '../../utils/fetchApi.js';

export const searchProducts = async (inputField, onResultChange) => {
    try {
        if (!inputField) {
            console.log('Error input element not found.');
            return;
        }
        let productData = await FetchAllProducts('');
        if (productData) {
            const debouncedSearch = debounce((searchValue) => {
                if (searchValue.length === 0) {
                    onResultChange([]);
                    return;
                }
                let filteredData = productData.filter(
                    (product) =>
                        product?.name.toLowerCase().includes(searchValue) ||
                        product?.desc.toLowerCase().includes(searchValue) ||
                        product?.brand.toLowerCase().includes(searchValue),
                );
                onResultChange(filteredData);
            }, 500);

            inputField.addEventListener('input', (e) => {
                const searchValue = e.target.value.toLowerCase().trim();
                debouncedSearch(searchValue);
            });
        }
    } catch {
        console.log('Error while searching products.');
    }
};
