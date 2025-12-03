export function calculateDiscountedPrice(baseprice, discount) {
    const discountedPrice =
        baseprice - baseprice * (discount.replace('%', '') / 100);
    return discountedPrice.toFixed(2);
}
