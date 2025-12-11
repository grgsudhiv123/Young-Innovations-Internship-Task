import { debounce } from '../../utils/debounce.js';
import { getAllProducts } from '../../api/products.services.js';

export const searchProducts = async (inputField, onResultChange) => {
    try {
        if (!inputField) {
            throw new Error('Error input element not found.');
        }
        let productData = await getAllProducts();
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
        console.error('Error in searchProducts', error.message);
        throw error;
    }
};
